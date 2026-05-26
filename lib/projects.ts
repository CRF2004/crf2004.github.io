export interface ProjectLinks {
  demo?: string;
  repo?: string;
  docs?: string;
}

export interface Project {
  slug: string;
  title: { en: string; zh: string };
  description: { en: string; zh: string };
  tags: string[];
  featured: boolean;
  links?: ProjectLinks;
}

export const projects: Project[] = [
  {
    slug: "myocardial-kg",
    title: {
      en: "Myocardial Ischemia Knowledge Graph",
      zh: "心肌缺血知识图谱",
    },
    description: {
      en: "SRP research project: built a domain knowledge graph for myocardial ischemia with collaborative ontology management, XGBoost-based implicit reasoning, and graph-mapped interpretability analysis.",
      zh: "SRP学生科研项目：搭建心肌缺血领域知识图谱，包含协作式本体管理、基于XGBoost的隐式推理与图谱映射可解释性分析。",
    },
    tags: ["Knowledge Graph", "XGBoost", "Neo4j", "Interpretability"],
    featured: true,
    links: {
      repo: "https://github.com/CRF2004/Myocardial-Ischemia-Knowledge-graph",
    },
  },
  {
    slug: "kg-patient-qa",
    title: {
      en: "KG-Based Standardized Patient Q&A",
      zh: "基于知识图谱的标准化病人问答",
    },
    description: {
      en: "Processed 8,000 cardiovascular case PDFs, built LLM-based knowledge extraction pipeline (NER + RE + entity disambiguation), stored in Neo4j, and designed hybrid RAG for LLM-driven patient-doctor interaction.",
      zh: "处理8000份心血管病例PDF，构建基于LLM的知识抽取流水线（NER+RE+实体消歧），Neo4j存储，设计混合RAG框架引导LLM按时间线扮演病人。",
    },
    tags: ["RAG", "Neo4j", "NER", "LLM", "Healthcare"],
    featured: true,
    links: {
      repo: "https://github.com/CRF2004/KGconsturct_Patientsimulation",
    },
  },
  {
    slug: "viora",
    title: { en: "Viora — AI Health Companion", zh: "Viora — AI健康搭子" },
    description: {
      en: "A proactive AI health companion that initiates friendly check-ins, learns user rhythms through conversation, and weaves health data into narrative stories — built with Flask + D3.js.",
      zh: "主动式AI身体搭子，通过朋友式聊天主动关心用户，从对话中学习用户节奏，将健康数据编织成身体故事 — Flask + D3.js构建。",
    },
    tags: ["Flask", "D3.js", "Health AI", "Conversational AI"],
    featured: true,
    links: {
      demo: "https://viora.filegear-sg.me/",
    },
  },
  {
    slug: "portraiture",
    title: {
      en: "Portraiture — Digital Twin from Chat Logs",
      zh: "Portraiture — 聊天记录数字分身",
    },
    description: {
      en: "Research prototype for building evidence-backed persona graphs from GPT chat logs, with 5-agent architecture (Archivist, Profiler, State Tracker, Simulator, Critic) and discrepancy-driven refinement.",
      zh: "从GPT聊天记录构建证据支持的画像图研究原型，5-agent架构（档案官、画像官、状态官、分身官、审稿官），基于误差驱动的画像修正。",
    },
    tags: ["LLM Agents", "Persona Modeling", "Python", "Research"],
    featured: false,
  },
  {
    slug: "contextos",
    title: {
      en: "ContextOS — LLM Context Operating System",
      zh: "ContextOS — LLM上下文操作系统",
    },
    description: {
      en: "A transparent proxy layer for the Claude API providing token observability, session management, context trimming, and session fork capabilities with a React-based dashboard.",
      zh: "Claude API透明代理层，提供Token可观测性、会话管理、上下文裁剪、会话分支功能，包含React可视化仪表盘。",
    },
    tags: ["Python", "React", "API Proxy", "Token Management"],
    featured: false,
    links: {
      repo: "https://github.com/CRF2004/ContextOS",
    },
  },
  {
    slug: "a2a-hub",
    title: {
      en: "A2A Knowledge Hub",
      zh: "A2A知识共享中心",
    },
    description: {
      en: "Distributed knowledge sharing platform for multi-terminal AI workflows using SSH + rsync, with MCP integration, static site generation, and agent management.",
      zh: "基于SSH+rsync的分布式知识共享平台，支持多终端AI工作流，集成MCP、静态网站生成与Agent管理。",
    },
    tags: ["Python", "SSH", "MCP", "Knowledge Management"],
    featured: false,
    links: {
      demo: "http://8.134.135.36:8080/",
      repo: "https://github.com/CRF2004/a2a-knowledge-hub",
    },
  },
  {
    slug: "ihd-trajectory",
    title: {
      en: "IHD Trajectory Similarity Retrieval",
      zh: "IHD患者轨迹相似检索系统",
    },
    description: {
      en: "Clinical decision support system for IHD patient trajectory similarity retrieval on MIMIC-IV, featuring cutoff-based time-window retrieval, post-cutoff validation, and 24-48h trend analysis with precomputed k-NN similarity graphs.",
      zh: "基于MIMIC-IV数据库的IHD患者轨迹相似检索系统，支持截断时间窗检索、截断后轨迹验证、跨截断点一致性分析与24-48h趋势预测，结合预计算k-NN相似图加速在线查询。",
    },
    tags: ["Streamlit", "DuckDB", "MIMIC-IV", "Clinical AI", "Similarity Retrieval"],
    featured: false,
    links: {
      repo: "https://github.com/CRF2004/IHD_Trajectory_System",
    },
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}
