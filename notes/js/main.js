(function () {
  // ============================================================
  // CONFIG — fill in GITHUB_TOKEN with a fine-grained personal
  // access token scoped ONLY to this repo, "Contents: Read and
  // write" permission, nothing else. Generate at:
  // https://github.com/settings/personal-access-tokens/new
  // ============================================================
  var CONFIG = {
    owner: "abuchiha3174",
    repo: "my-website",
    path: "notes/data/notes.json",
    branch: "main",
    GITHUB_TOKEN: "PASTE_YOUR_FINE_GRAINED_TOKEN_HERE"
  };

  var API_BASE = "https://api.github.com/repos/" + CONFIG.owner + "/" + CONFIG.repo + "/contents/" + CONFIG.path;

  var statusEl = document.getElementById("status");
  var listEl = document.getElementById("list");
  var emptyEl = document.getElementById("empty");
  var newNoteEl = document.getElementById("new-note");
  var saveNewBtn = document.getElementById("save-new");

  var notes = [];
  var currentSha = null;
  var busy = false;

  function setStatus(text, kind) {
    statusEl.textContent = text;
    statusEl.className = "status" + (kind ? " " + kind : "");
  }

  function tokenConfigured() {
    return CONFIG.GITHUB_TOKEN && CONFIG.GITHUB_TOKEN.indexOf("PASTE_YOUR") !== 0;
  }

  // ---- UTF-8 safe base64 helpers ----
  function utf8ToB64(str) {
    return btoa(unescape(encodeURIComponent(str)));
  }
  function b64ToUtf8(b64) {
    return decodeURIComponent(escape(atob(b64.replace(/\n/g, ""))));
  }

  function ghHeaders() {
    var h = { "Accept": "application/vnd.github+json" };
    if (tokenConfigured()) h["Authorization"] = "Bearer " + CONFIG.GITHUB_TOKEN;
    return h;
  }

  function setBusy(v) {
    busy = v;
    saveNewBtn.disabled = v;
  }

  // ---- Load notes from GitHub ----
  function loadNotes() {
    setStatus("loading…");
    fetch(API_BASE + "?ref=" + CONFIG.branch, { headers: ghHeaders() })
      .then(function (res) {
        if (res.status === 404) {
          // file doesn't exist yet
          currentSha = null;
          notes = [];
          render();
          setStatus("");
          return null;
        }
        if (!res.ok) throw new Error("GitHub GET failed: " + res.status);
        return res.json();
      })
      .then(function (data) {
        if (!data) return;
        currentSha = data.sha;
        try {
          notes = JSON.parse(b64ToUtf8(data.content));
        } catch (e) {
          notes = [];
        }
        render();
        setStatus("");
      })
      .catch(function (err) {
        console.error(err);
        setStatus("couldn't load — check token/connection", "error");
      });
  }

  // ---- Persist notes back to GitHub ----
  function persist(commitMessage, onSuccess) {
    if (!tokenConfigured()) {
      setStatus("no token configured — see js/main.js CONFIG", "error");
      return;
    }
    setBusy(true);
    setStatus("saving…");
    var body = {
      message: commitMessage,
      content: utf8ToB64(JSON.stringify(notes, null, 2)),
      branch: CONFIG.branch
    };
    if (currentSha) body.sha = currentSha;

    fetch(API_BASE, {
      method: "PUT",
      headers: Object.assign({ "Content-Type": "application/json" }, ghHeaders()),
      body: JSON.stringify(body)
    })
      .then(function (res) {
        if (res.status === 409) {
          throw new Error("CONFLICT");
        }
        if (!res.ok) throw new Error("GitHub PUT failed: " + res.status);
        return res.json();
      })
      .then(function (data) {
        currentSha = data.content.sha;
        setBusy(false);
        setStatus("saved", "ok");
        setTimeout(function () { if (statusEl.textContent === "saved") setStatus(""); }, 1800);
        if (onSuccess) onSuccess();
      })
      .catch(function (err) {
        setBusy(false);
        if (err.message === "CONFLICT") {
          setStatus("changed elsewhere — reloading…", "error");
          loadNotes();
        } else {
          console.error(err);
          setStatus("save failed — see console", "error");
        }
      });
  }

  function uid() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  }

  // ---- Mutations ----
  function addNote(text) {
    if (!text.trim()) return;
    notes.unshift({ id: uid(), text: text.trim(), createdAt: new Date().toISOString(), updatedAt: null });
    render();
    persist("Add note");
  }

  function updateNote(id, text) {
    var n = notes.find(function (x) { return x.id === id; });
    if (!n) return;
    n.text = text.trim();
    n.updatedAt = new Date().toISOString();
    render();
    persist("Update note");
  }

  function deleteNote(id) {
    notes = notes.filter(function (x) { return x.id !== id; });
    render();
    persist("Delete note");
  }

  // ---- Rendering ----
  function fmtTime(iso) {
    var d = new Date(iso);
    return d.toLocaleDateString(undefined, { month: "short", day: "numeric" }) + " · " +
      d.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
  }

  function render() {
    listEl.innerHTML = "";
    emptyEl.hidden = notes.length > 0;
    notes.forEach(function (note) {
      var card = document.createElement("div");
      card.className = "note";

      var textEl = document.createElement("p");
      textEl.className = "note-text";
      textEl.textContent = note.text;

      var meta = document.createElement("div");
      meta.className = "note-meta";
      var time = document.createElement("span");
      time.className = "note-time";
      time.textContent = fmtTime(note.updatedAt || note.createdAt) + (note.updatedAt ? " (edited)" : "");
      var actions = document.createElement("div");
      actions.className = "note-actions";

      var editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
      editBtn.addEventListener("click", function () { enterEditMode(card, note); });

      var delBtn = document.createElement("button");
      delBtn.textContent = "Delete";
      delBtn.className = "delete";
      delBtn.addEventListener("click", function () {
        if (confirm("Delete this note?")) deleteNote(note.id);
      });

      actions.appendChild(editBtn);
      actions.appendChild(delBtn);
      meta.appendChild(time);
      meta.appendChild(actions);
      card.appendChild(textEl);
      card.appendChild(meta);
      listEl.appendChild(card);
    });
  }

  function enterEditMode(card, note) {
    card.innerHTML = "";
    var wrap = document.createElement("div");
    wrap.className = "note-edit";
    var ta = document.createElement("textarea");
    ta.value = note.text;
    ta.rows = Math.max(3, Math.ceil(note.text.length / 40));
    var row = document.createElement("div");
    row.className = "row";
    var cancelBtn = document.createElement("button");
    cancelBtn.textContent = "Cancel";
    cancelBtn.className = "btn btn-ghost";
    cancelBtn.addEventListener("click", render);
    var saveBtn = document.createElement("button");
    saveBtn.textContent = "Save";
    saveBtn.className = "btn";
    saveBtn.addEventListener("click", function () { updateNote(note.id, ta.value); });

    row.appendChild(cancelBtn);
    row.appendChild(saveBtn);
    wrap.appendChild(ta);
    wrap.appendChild(row);
    card.appendChild(wrap);
    ta.focus();
  }

  saveNewBtn.addEventListener("click", function () {
    addNote(newNoteEl.value);
    newNoteEl.value = "";
  });
  newNoteEl.addEventListener("keydown", function (e) {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      addNote(newNoteEl.value);
      newNoteEl.value = "";
    }
  });

  if (!tokenConfigured()) {
    setStatus("no token configured — see js/main.js CONFIG", "error");
  }
  loadNotes();
})();
