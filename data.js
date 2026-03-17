/**
 * ============================================================
 *  PORTFOLIO DATA CONFIG — Edit everything here!
 *  All sections: personal info, roles, projects, skills, etc.
 * ============================================================
 */

const PORTFOLIO_DATA = {

    // ── PERSONAL INFO ─────────────────────────────────────────
    personal: {
        name: "Abhishek Singh",
        tagline: "MS Data Science @ RIT · GPA 3.9 · Published Researcher",
        location: "Rochester, NY (Ready for relocation)",
        email: "abhishek.x.singh95@gmail.com",
        phone: "585-957-5864",
        linkedin: "https://www.linkedin.com/in/absingh95/",
        github: "https://github.com/absingh95", // ← update if different
        avatar: "assets/images/avatar.jpg", // ← replace with your photo
        bio: "I'm a Data Science graduate student at RIT with hands-on experience spanning AI engineering, ML research, and data analytics. I've shipped production LLM systems, first-authored a peer-reviewed publication at EvoStar 2026, and led experiments on a 2,304-core HPC cluster. I tailor my skills across five professional tracks — find the one that fits your team.",
        resumeFiles: {
            "AI Engineer": "samples/Abs_AI_Engineer_Resume.pdf",
            "ML Engineer": "samples/ml_resume_finetune.pdf",
            "Applied ML Engineer": "samples/ML_resume.pdf",
            "Research Engineer": "samples/research_engineer.pdf",
            "Data Analyst": "samples/data_analyst.pdf",
        }
    },

    // ── EDUCATION ─────────────────────────────────────────────
    education: [{
        school: "Rochester Institute of Technology (RIT)",
        degree: "Master of Science in Data Science",
        period: "Aug 2023 – May 2026",
        gpa: "3.9 / 4.0",
        location: "Rochester, NY",
        courses: ["Neural Networks", "NLP", "Applied Statistics", "Foundations of Data Science & Analytics", "Database Design", "Software Engineering for Data Science"]
    }],

    // ── EXPERIENCE ────────────────────────────────────────────
    experience: [{
            company: "RIT Evolutionary Computing & ML Lab",
            role: "Student Graduate Research Engineer",
            period: "Jan 2025 – Present",
            location: "Rochester, NY",
            bullets: [
                "Orchestrated 50+ parallel ablation jobs on a Slurm-managed 2,304-core HPC cluster to isolate the effect of SWEET selection vs. Harada pruning on neural architecture search.",
                "Refactored C++ SpeciationStrategy classes to track genomes across MPI worker nodes, resolving async bottlenecks.",
                "Applied Mann-Whitney U tests (p < 0.05) across 4 time-series datasets to validate significance of dual-objective compression and accuracy gains.",
                "First-authored peer-reviewed paper accepted at EvoStar 2026 achieving 23% model compression (p = 0.0019) without MSE degradation."
            ]
        },
        {
            company: "Morningstar",
            role: "Associate Software Engineer",
            period: "May 2021 – May 2023",
            location: "Mumbai, India",
            bullets: [
                "Built and enhanced portfolio analytics tools in Vue.js, improving report clarity for 100k+ users.",
                "Designed CMS-driven FAQ system using Contentstack APIs enabling non-technical stakeholders to manage documentation independently.",
                "Increased automated test coverage across production components; maintained high-availability deployments."
            ]
        }
    ],

    // ── PUBLICATION ───────────────────────────────────────────
    publication: {
        title: "Biologically-Inspired Homeostasis for Neuroevolution: Alternating Growth and Pruning Phases",
        authors: "Singh, A., Lyu, Z., Desell, T.",
        venue: "EvoStar 2026",
        status: "Accepted",
        summary: "Reduced evolved neural model size by 23% (103.1 → 79.0 parameters, p = 0.0019) without degrading validation MSE using phase-controlled grow–prune schedules in distributed neuroevolution for time-series forecasting.",
        pdfLink: "samples/2026_evostar_grow_shrink.pdf"
    },

    // ── ROLES (5 tracks) ──────────────────────────────────────
    roles: [{
            id: "ai-engineer",
            label: "AI Engineer",
            icon: "🤖",
            color: "#1a56db",
            tagline: "Building production LLM systems, agentic pipelines & LLMOps infrastructure",
            skills: ["LangChain", "LangGraph", "LLMOps", "RAG", "Azure OpenAI", "GCP", "Kubernetes", "Docker", "FastAPI", "ELK", "LangSmith"],
            projects: [{
                    title: "AI Travel Itinerary Planner",
                    tags: ["LangChain", "Kubernetes", "GCP", "ELK"],
                    description: "Built a LangChain-based real-time itinerary orchestration system with containerized microservices on GCP Kubernetes enabling high-availability LLM inference and autoscaling. Implemented an ELK-driven telemetry and LLMOps pipeline to monitor token usage, query latency, and model performance.",
                    github: "", // ← add your repo URL
                    demo: "", // ← add live demo URL if any
                    image: "assets/images/proj_travel.png", // ← add screenshot
                    highlights: ["Agentic Orchestration", "LLMOps observability", "Production autoscaling"]
                },
                {
                    title: "Generative AI Video Compliance System",
                    tags: ["LangGraph", "Azure Video Indexer", "Azure AI Search", "LangSmith"],
                    description: "Built a multi-modal compliance system combining OCR/transcripts with regulatory retrieval using Azure AI Search and LangGraph orchestration. Integrated LangSmith tracing and Azure Monitor telemetry for prompt evaluation and latency optimization.",
                    github: "",
                    demo: "",
                    image: "assets/images/proj_compliance.png",
                    highlights: ["Agentic RAG pipeline", "Multi-modal", "LangSmith tracing"]
                },
                {
                    title: "Multi-Agent Quantitative Analysis System",
                    tags: ["CrewAI", "OpenAI API", "FastAPI", "Azure"],
                    description: "Engineered a multi-agent system for market scraping, trend analysis, and automated report generation. Developed an async FastAPI backend with Azure PostgreSQL and Blob Storage for structured and unstructured financial data.",
                    github: "",
                    demo: "",
                    image: "assets/images/proj_quant.png",
                    highlights: ["Autonomous agents", "Async FastAPI backend", "Financial data pipelines"]
                }
            ]
        },

        {
            id: "ml-engineer",
            label: "ML Engineer",
            icon: "🧠",
            color: "#0e9f6e",
            tagline: "Fine-tuning LLMs, distributed training, and scalable ML pipelines",
            skills: ["PyTorch", "HuggingFace Transformers", "PEFT/LoRA", "TensorFlow", "Scikit-learn", "XGBoost", "MPI", "Slurm", "HPC", "Airflow"],
            projects: [{
                    title: "Transformer Fine-Tuning for Text Summarization",
                    tags: ["PyTorch", "HuggingFace", "PEGASUS", "BART", "T5"],
                    description: "Fine-tuned PEGASUS, BART, and T5 on the SAMSum dialogue dataset using HuggingFace PEFT ecosystem. Built a production-style modular pipeline covering data ingestion, tokenization, training with checkpoint management, and evaluation.",
                    github: "",
                    demo: "",
                    image: "assets/images/proj_finetune.png",
                    highlights: ["PEFT / LoRA fine-tuning", "Modular NLP pipeline", "Checkpoint management"]
                },
                {
                    title: "Biologically-Inspired Neuroevolution (EvoStar 2026)",
                    tags: ["C++", "MPI", "Slurm", "HPC", "EXAMM"],
                    description: "Implemented alternating grow–prune mutation schedules inside the EXAMM neuroevolution algorithm on a 2,304-core HPC cluster. Achieved 23% model size reduction (p = 0.0019) on multivariate time-series without MSE degradation.",
                    github: "",
                    demo: "",
                    image: "assets/images/proj_neuroevo.png",
                    highlights: ["Published research", "23% compression", "Distributed HPC at scale"]
                },
                {
                    title: "Generative AI Video Compliance System",
                    tags: ["LangGraph", "Azure AI Search", "LangSmith", "LLMOps"],
                    description: "Leveraged LLMs to detect policy violations and assess content quality across video and text modalities. Integrated LangSmith tracing and Azure Monitor for iterative model quality improvement in production.",
                    github: "",
                    demo: "",
                    image: "assets/images/proj_compliance.png",
                    highlights: ["LLM-based content QA", "LLMOps evaluation", "Production monitoring"]
                }
            ]
        },

        {
            id: "applied-ml",
            label: "Applied ML Engineer",
            icon: "⚙️",
            color: "#7e3af2",
            tagline: "End-to-end ML systems: recommendation, ranking, and deployed inference",
            skills: ["Collaborative Filtering", "Nearest Neighbors", "Docker", "Streamlit", "FastAPI", "Scikit-learn", "PostgreSQL", "Pinecone", "Pandas", "NumPy"],
            projects: [{
                    title: "End-to-End Collaborative Filtering Recommendation System",
                    tags: ["Python", "Scikit-learn", "Pandas", "Streamlit", "Docker"],
                    description: "Implemented user-based and item-based collaborative filtering via Nearest Neighbors for real-time recommendation retrieval and ranking. Built a modular ingestion-to-training pipeline; containerized with Docker and deployed a Streamlit inference interface.",
                    github: "",
                    demo: "",
                    image: "assets/images/proj_recsys.png",
                    highlights: ["Candidate retrieval & ranking", "End-to-end ownership", "Dockerized deployment"]
                },
                {
                    title: "Generative AI Video Compliance & Brand Safety",
                    tags: ["LangGraph", "Azure Video Indexer", "LLMs"],
                    description: "Built multi-modal compliance system to detect behavioral anomalies identifying when content deviates from policy constraints analogous to risk modeling for AI agent identity verification.",
                    github: "",
                    demo: "",
                    image: "assets/images/proj_compliance.png",
                    highlights: ["Policy anomaly detection", "Multi-modal AI", "Risk modeling analogy"]
                }
            ]
        },

        {
            id: "research-engineer",
            label: "Research Engineer",
            icon: "🔬",
            color: "#e3a008",
            tagline: "Distributed neuroevolution, neural architecture search, and HPC systems",
            skills: ["C++", "MPI", "Slurm", "HPC", "Neural Architecture Search", "Neuroevolution", "EXAMM", "Python", "Mann-Whitney U", "PyTorch"],
            projects: [{
                    title: "Dual-Objective Neural Architecture Search Ablation Study",
                    tags: ["C++", "MPI", "Slurm", "HPC", "EXAMM"],
                    description: "Refactored C++ SpeciationStrategy classes to track evaluating genomes across MPI worker nodes, resolving async bottlenecks. Orchestrated 50+ parallel ablation jobs on a 2,304-core HPC cluster isolating effects of SWEET selection vs. Harada pruning.",
                    github: "",
                    demo: "",
                    image: "assets/images/proj_nas.png",
                    highlights: ["2,304-core HPC cluster", "Async MPI bottleneck fix", "Statistical ablation study"]
                },
                {
                    title: "Biologically-Inspired Homeostasis for Neuroevolution (EvoStar 2026)",
                    tags: ["Neuroevolution", "C++", "MPI", "Time-Series Forecasting"],
                    description: "First integration of alternating growth and pruning phases in a neuroevolution algorithm. Reduced evolved model size by 23% (p=0.0019) on wind turbine dataset without sacrificing predictive accuracy across aviation and renewable-energy datasets.",
                    github: "",
                    demo: "samples/2026_evostar_grow_shrink.pdf",
                    image: "assets/images/proj_neuroevo.png",
                    highlights: ["Peer-reviewed EvoStar 2026", "23% model compression", "Bio-inspired design"]
                }
            ]
        },

        {
            id: "data-analyst",
            label: "Data Analyst",
            icon: "📊",
            color: "#e02424",
            tagline: "Transforming raw data into actionable insights via dashboards, SQL & statistical analysis",
            skills: ["Power BI", "DAX", "Power Query", "Tableau", "MySQL", "SQL Server", "ETL", "Excel", "Pandas", "NumPy", "Matplotlib", "Seaborn"],
            projects: [{
                    title: "Solar Energy Data Analysis & Reporting",
                    tags: ["MySQL", "Power BI", "DAX"],
                    description: "Developed an end-to-end pipeline to integrate engineering data from MySQL to Power BI. Designed interactive dashboards visualizing performance metrics and ROI, providing stakeholders with data-driven insights for sustainable energy investment.",
                    github: "",
                    demo: "",
                    image: "assets/images/proj_solar.png",
                    highlights: ["End-to-end data pipeline", "Interactive Power BI dashboards", "ROI visualization"]
                },
                {
                    title: "End-to-End Sales Data Modeling & Analytics",
                    tags: ["SQL Server", "Power BI", "ETL"],
                    description: "Engineered a robust data model using SQL Server, performing complex ETL transformations to clean and structure raw data for multi-dimensional performance analysis. Created interactive Power BI reports tracking KPIs and trend variances.",
                    github: "",
                    demo: "",
                    image: "assets/images/proj_sales.png",
                    highlights: ["Complex ETL pipeline", "KPI dashboards", "Trend variance analysis"]
                },
                {
                    title: "Regional Project Performance Visualization",
                    tags: ["Power BI", "Excel", "DAX"],
                    description: "Designed dynamic dashboards visualizing project timelines and metrics, reducing manual reporting time. Leveraged advanced DAX calculations to identify budget-to-actual variances and potential project risks.",
                    github: "",
                    demo: "",
                    image: "assets/images/proj_regional.png",
                    highlights: ["Cross-functional requirements", "DAX budget variance", "Risk identification"]
                },
                {
                    title: "Large-Scale Experimental Analysis (5,000+ Simulations)",
                    tags: ["Python", "Pandas", "Matplotlib", "Statistical Testing"],
                    description: "Orchestrated a data initiative involving 5,000+ experimental simulations (500 unique configs × 10 repeats) to identify performance trends. Engineered automated pipelines to aggregate and visualize multi-variate metrics.",
                    github: "",
                    demo: "",
                    image: "assets/images/proj_stats.png",
                    highlights: ["5,000+ simulation runs", "Mann-Whitney U testing", "Automated reporting"]
                }
            ]
        }
    ],

    // ── WORK SAMPLES (PDFs / images / links) ──────────────────
    workSamples: [{
            title: "EvoStar 2026 Published Paper",
            type: "pdf",
            description: "Peer-reviewed publication on biologically-inspired neuroevolution — grow-prune phases for neural architecture compression.",
            file: "samples/2026_evostar_grow_shrink.pdf",
            thumb: "assets/images/sample_paper.png"
        },
        {
            title: "Pairwise Mann-Whitney U Test — Stocks Dataset",
            type: "image",
            description: "Heatmap of pairwise statistical significance (enabled weights) across all 25 grow-shrink configurations on the Stocks time-series dataset.",
            file: "samples/heatmap_Stocks_p_value_enabled_weight.png"
        },
        {
            title: "MSE Convergence — Coal Dataset (10,000 Genomes)",
            type: "image",
            description: "Validation MSE convergence curves across all 25 grow-shrink configurations vs. baseline on the Coal dataset over 10,000 generated genomes.",
            file: "samples/mse_plot_ALL_EXPERIMENTS__Coal_10000.png"
        },
        {
            title: "Enabled Weight Comparison — Coal Dataset (Grow 25 / Shrink 200)",
            type: "image",
            description: "Scatter plot comparing model parameter counts between baseline and the best-performing Grow 25 Shrink 200 configuration on the Coal dataset.",
            file: "samples/Enabled_Weight_Comparison_Plot_Coal_Dataset_10000_Grow_25_Shrink_200_new.png"
        },
    ],

    // ── CONTACT ───────────────────────────────────────────────
    contact: {
        formspreeId: "YOUR_FORMSPREE_ID", // ← sign up free at formspree.io, paste ID here
        availability: "Open to full-time roles starting Summer/Fall 2026",
        preferredRoles: ["AI Engineer", "ML Engineer", "Research Engineer", "Data Analyst"]
    }
};