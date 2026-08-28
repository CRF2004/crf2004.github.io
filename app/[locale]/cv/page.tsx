import { use } from "react";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { ArrowRight, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "CV",
};

const coauthoredPapers = [
  { key: "coauth_2" },
  { key: "coauth_1", doi: "https://doi.org/10.1016/j.isci.2026.115073" },
] as const;

export default function CVPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("cv");
  const isChinese = locale === "zh";

  const copy = isChinese
    ? {
        subtitle:
          "研究方向涵盖医疗 AI 证据审计、跨数据集泛化与 ECG–文本表征学习，并延伸到真实临床数据和系统开发。完整履历见 PDF。",
        researchFocus: "研究主线",
        education: "教育背景",
        educationDetail: "华南理工大学 · 大数据管理与应用 · 管理学学士（2023–2027）",
        currentResearch: "当前研究",
        currentResearchIntro:
          "我的近期工作围绕一个连续问题展开：医疗 AI 模型是否使用了正确证据，这种证据依赖能否跨数据集保持，以及如何把这种约束带入多模态表征学习。",
        manuscripts: "论文与手稿",
        manuscriptsNote: "完整成果记录见 Publications 页面与 ORCID。",
        clinicalSystems: "从研究到临床系统",
        clinicalSystemsIntro:
          "除方法研究外，我也持续参与医院场景中的数据处理、知识表示、检索与临床工作流开发，用来理解模型在真实系统中的约束。",
        capabilities: "研究能力",
        capabilitiesIntro:
          "常用研究能力包括模型构建、LLM 与知识系统、评估与数据构建，以及可运行系统实现。",
        courses: "相关课程",
        selectedRecognition: "精选荣誉与知识产权",
        languages: "语言",
        explore: "继续了解",
        exploreExperience: "研究与实践经历",
        explorePublications: "论文与研究",
        exploreProjects: "项目细节",
        orcidLabel: "ORCID",
        focusItems: [
          {
            title: "可信医疗 AI",
            desc: "结合预测性能与证据使用审计，判断模型是否依赖临床相关证据。",
          },
          {
            title: "ECG 泛化与证据结构",
            desc: "研究模型行为为何随数据集变化，以及这种变化能否由证据结构解释。",
          },
          {
            title: "ECG–文本表征学习",
            desc: "探索诊断层级、ECG findings 与 evidence grounding 如何影响多模态对齐。",
          },
        ],
        researchItems: [
          {
            title: "深度 ECG 模型证据使用审计",
            meta: "研究负责人 · 2026年1月 — 至今",
            label: "核心问题",
            desc: "高性能 ECG 分类器是否真的依赖临床上正确的证据？我使用匹配对照扰动与冻结权重外部迁移，将目标证据敏感性与一般性脆弱区分开。",
          },
          {
            title: "DLEF：数据集—标签证据指纹",
            meta: "研究负责人 · 2026年6月 — 至今",
            label: "核心问题",
            desc: "跨数据集性能下降能否由更细粒度的证据结构差异解释？DLEF 从 source–target–label 层面刻画方向性与边界差异，保留单一全局统计量无法表达的迁移信息。",
          },
          {
            title: "PathCLIP: Evidence-Aware ECG–Text Representation Learning",
            meta: "研究负责人 · 2026年7月 — 至今",
            label: "探索中",
            desc: "目前仍处于方法构想阶段。我在用计数匹配、随机层级、仅残差和留出标签等对照，先判断诊断层级、ECG findings 与 evidence grounding 各自真正贡献了什么，再确定最终方法。",
          },
        ],
        clinicalItems: [
          {
            title: "叮呗心心 / GradioGPT 主动式心血管健康管理平台",
            desc: "作为联合创始人与核心开发成员，负责模型微调、RAG、全栈开发与申报材料；初版小程序已在广东省第二人民医院上线，目前负责 2.0 版本全栈开发。项目连续获得 2025、2026 年国家级大创立项，并于 2026 年 8 月实现公司化落地。",
          },
          {
            title: "心血管标准化病人问答流水线",
            desc: "独立开发从约 8,000 份心血管病例 PDF 到可检索知识的处理流水线，包括 LLM 信息抽取、实体消歧、Neo4j 知识表示与混合检索。",
          },
          {
            title: "临床数据胶囊与 Schema 治理",
            desc: "面向多家体检机构的异构数据，设计以 UMLS 为基础的 Schema 与标准化流水线，并通过 LLM 辅助将未见字段分流至 Schema 扩展或术语映射。",
          },
          {
            title: "鼎贝美美痤疮与面部健康评估系统",
            desc: "负责五人团队中的全栈与临床工作流开发；系统于 2026 年 7 月随医院难治性痤疮诊疗中心成立完成首发。",
          },
        ],
        capabilityItems: [
          {
            title: "建模",
            items: "PyTorch · XGBoost · representation learning · multimodal learning · LLM fine-tuning",
          },
          {
            title: "LLM 与知识系统",
            items: "LoRA · DPO · RAG/MQ-RAG · knowledge graphs · information extraction · UMLS",
          },
          {
            title: "评估与数据构建",
            items: "RAG/retrieval evaluation · perturbation analysis · external validation · schema design",
          },
          {
            title: "工程",
            items: "Python · TypeScript · SQL · Neo4j · Flask · Git",
          },
        ],
        coursesList:
          "大模型与生成式AI（93/100）、大语言模型与提示工程（93/100）、机器学习（92/100）、深度学习（88/100）",
      }
    : {
        subtitle:
          "My research spans evidence auditing for medical AI, cross-dataset generalization, and ECG–text representation learning, with extensions to real clinical data and system development. See the PDF for the complete record.",
        researchFocus: "Research Focus",
        education: "Education",
        educationDetail:
          "South China University of Technology · Big Data Management and Application · Bachelor of Management (2023–2027)",
        currentResearch: "Current Research",
        currentResearchIntro:
          "My recent work follows one connected question: whether medical AI models use the right evidence, whether that evidence dependence remains stable across datasets, and how such constraints can inform multimodal representation learning.",
        manuscripts: "Manuscripts & Publications",
        manuscriptsNote:
          "See the Publications page and ORCID for the complete record.",
        clinicalSystems: "From Research to Clinical Systems",
        clinicalSystemsIntro:
          "Alongside methodological research, I work on hospital-facing data, knowledge, retrieval, and workflow systems to better understand the constraints that appear when models leave the benchmark setting.",
        capabilities: "Research Capabilities",
        capabilitiesIntro:
          "Core capabilities include modeling, LLM and knowledge systems, evaluation and data curation, and implementation of working systems.",
        courses: "Selected Coursework",
        selectedRecognition: "Selected Recognition & IP",
        languages: "Languages",
        explore: "Explore Further",
        exploreExperience: "Research & Experience",
        explorePublications: "Publications & Research",
        exploreProjects: "Project Details",
        orcidLabel: "ORCID",
        focusItems: [
          {
            title: "Trustworthy Medical AI",
            desc: "Combining predictive evaluation with evidence-use audits to test whether models rely on clinically relevant evidence.",
          },
          {
            title: "ECG Generalization & Evidence Structure",
            desc: "Studying why model behavior changes across datasets and whether evidence structure can explain that change.",
          },
          {
            title: "ECG–Text Representation Learning",
            desc: "Exploring how diagnostic hierarchies, ECG findings, and evidence grounding affect multimodal alignment.",
          },
        ],
        researchItems: [
          {
            title: "A Matched-Control Perturbation Audit Framework for Evaluating Evidence Use in Deep Learning Models: An Application to 12-Lead ECG Classification",
            meta: "Research Lead · Jan 2026 — Present",
            label: "Question",
            desc: "Do high-performing ECG classifiers actually depend on clinically correct evidence? I use matched-control perturbations and frozen-weight external transfer to separate target-evidence sensitivity from generic model fragility.",
          },
          {
            title: "DLEF: Dataset-Label Evidence Fingerprints for Explaining Cross-Dataset Performance in ECG Classification",
            meta: "Research Lead · Jun 2026 — Present",
            label: "Question",
            desc: "Can cross-dataset performance degradation be explained by finer-grained differences in evidence structure? DLEF characterizes directional and boundary-aware source–target–label shifts that a single global statistic cannot capture.",
          },
          {
            title: "PathCLIP: Evidence-Aware ECG–Text Representation Learning",
            meta: "Research Lead · Jul 2026 — Present",
            label: "Exploratory",
            desc: "This project is still at the method-formulation stage. I am using matched-count, permuted-hierarchy, residual-only, and held-out-label controls to identify what diagnostic hierarchies, ECG findings, and evidence grounding actually contribute before fixing the final method.",
          },
        ],
        clinicalItems: [
          {
            title: "Dingbei Xinxin / GradioGPT Cardiovascular Health Platform",
            desc: "As a co-founder and core developer, led model fine-tuning, RAG, full-stack implementation, and application materials. The initial mini-program is deployed at Guangdong Second Provincial General Hospital; I now lead version 2.0 development. The project received national-level innovation support in 2025 and 2026 and was incorporated as a company in August 2026.",
          },
          {
            title: "Cardiovascular Standardized-Patient Q&A Pipeline",
            desc: "Solely developed a pipeline from approximately 8,000 cardiovascular case PDFs to retrievable knowledge, including LLM-based information extraction, entity disambiguation, Neo4j knowledge representation, and hybrid retrieval.",
          },
          {
            title: "Clinical Data Capsule & Schema Governance",
            desc: "Designed a UMLS-grounded schema and normalization pipeline for heterogeneous health-examination data from multiple institutions, with LLM-assisted governance that routes unseen fields to schema extension or terminology mapping.",
          },
          {
            title: "Dingbei Meimei Acne & Facial-Health Assessment System",
            desc: "Led full-stack and clinical-workflow development in a five-person team and supported the initial release alongside the hospital's Refractory Acne Diagnosis and Treatment Center in July 2026.",
          },
        ],
        capabilityItems: [
          {
            title: "Modeling",
            items: "PyTorch · XGBoost · representation learning · multimodal learning · LLM fine-tuning",
          },
          {
            title: "LLM & Knowledge Systems",
            items: "LoRA · DPO · RAG/MQ-RAG · knowledge graphs · information extraction · UMLS",
          },
          {
            title: "Evaluation & Data Curation",
            items: "RAG/retrieval evaluation · perturbation analysis · external validation · schema design",
          },
          {
            title: "Engineering",
            items: "Python · TypeScript · SQL · Neo4j · Flask · Git",
          },
        ],
        coursesList:
          "Large Models and Generative AI (93/100), Large Language Models and Prompt Engineering (93/100), Machine Learning (92/100), Deep Learning (88/100)",
      };

  const firstAuthorPapers = [
    {
      title: t("pub_bibm_title"),
      venue: t("pub_bibm_venue"),
      desc: t("pub_bibm_desc"),
    },
    {
      title: t("pub_jbhi_title"),
      venue: t("pub_jbhi_venue"),
      desc: t("pub_jbhi_desc"),
    },
  ];

  return (
    <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
      <header className="mb-12">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div className="max-w-2xl">
            <h1 className="text-3xl font-bold text-zinc-900">{t("title")}</h1>
            <p className="text-sm text-zinc-600 mt-3 leading-relaxed">{copy.subtitle}</p>
            <a
              href="https://orcid.org/0009-0002-3021-9647"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-accent hover:text-accent-dark mt-3"
            >
              {copy.orcidLabel}: 0009-0002-3021-9647
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
          <a
            href={isChinese ? "/cv/cheng-rongfeng-cv-zh.pdf" : "/cv/cheng-rongfeng-cv.pdf"}
            download
            className="px-5 py-2.5 bg-accent text-white rounded-xl text-sm font-medium hover:bg-accent-dark transition-colors shrink-0"
          >
            {t("download")}
          </a>
        </div>
      </header>

      <section className="mb-10">
        <h2 className="text-lg font-semibold text-zinc-900 mb-3 uppercase tracking-wider">
          {copy.researchFocus}
        </h2>
        <div className="grid md:grid-cols-3 gap-3">
          {copy.focusItems.map((item) => (
            <div key={item.title} className="p-4 rounded-xl bg-zinc-50 border border-zinc-200">
              <h3 className="text-sm font-semibold text-zinc-900">{item.title}</h3>
              <p className="text-sm text-zinc-600 mt-1.5 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-semibold text-zinc-900 mb-3 uppercase tracking-wider">
          {copy.education}
        </h2>
        <div className="p-5 rounded-xl border border-zinc-200">
          <p className="font-medium text-zinc-900">{copy.educationDetail}</p>
          <p className="text-sm text-zinc-500 mt-1">GPA: 3.46/4.0</p>
          <p className="text-sm text-zinc-600 mt-3 leading-relaxed">
            <span className="font-medium text-zinc-800">{copy.courses}: </span>
            {copy.coursesList}
          </p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-semibold text-zinc-900 mb-2 uppercase tracking-wider">
          {copy.currentResearch}
        </h2>
        <p className="text-sm text-zinc-600 leading-relaxed mb-4">{copy.currentResearchIntro}</p>
        <div className="space-y-3">
          {copy.researchItems.map((item) => (
            <article key={item.title} className="p-5 rounded-xl border border-zinc-200">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-semibold text-zinc-900">{item.title}</h3>
                <span className="text-[11px] font-medium text-accent bg-accent/10 px-2 py-0.5 rounded-full">
                  {item.label}
                </span>
              </div>
              <p className="text-xs text-zinc-500 mt-1">{item.meta}</p>
              <p className="text-sm text-zinc-600 mt-2 leading-relaxed">{item.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <div className="flex flex-wrap items-end justify-between gap-2 mb-3">
          <div>
            <h2 className="text-lg font-semibold text-zinc-900 uppercase tracking-wider">
              {copy.manuscripts}
            </h2>
            <p className="text-sm text-zinc-500 mt-1">{copy.manuscriptsNote}</p>
          </div>
          <a
            href={`/${locale}/publications`}
            className="inline-flex items-center gap-1 text-sm text-accent hover:text-accent-dark"
          >
            {copy.explorePublications}
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="space-y-4">
          {firstAuthorPapers.map((paper) => (
            <div key={paper.title} className="p-5 rounded-xl border-2 border-accent/20 bg-accent/[0.02]">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-xs font-medium text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                  {t("pub_under_review")}
                </span>
                <span className="text-xs font-medium text-accent bg-accent/10 px-2 py-0.5 rounded-full">
                  {t("pub_first_author")}
                </span>
              </div>
              <h3 className="text-sm font-semibold text-zinc-900 leading-snug">{paper.title}</h3>
              <p className="text-xs text-zinc-500 mt-1">{paper.venue}</p>
              <p className="text-sm text-zinc-600 mt-2 leading-relaxed">{paper.desc}</p>
            </div>
          ))}

          <div>
            <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
              {t("coauthored")}
            </h3>
            <ul className="space-y-1.5">
              {coauthoredPapers.map((paper) => (
                <li key={paper.key} className="text-sm text-zinc-600 flex items-start gap-2">
                  <span className="text-zinc-300 mt-1.5 shrink-0">•</span>
                  <span>
                    {t(paper.key)}{" "}
                    {"doi" in paper && (
                      <a
                        href={paper.doi}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-0.5 text-zinc-400 hover:text-accent transition-colors"
                      >
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-semibold text-zinc-900 mb-2 uppercase tracking-wider">
          {copy.clinicalSystems}
        </h2>
        <p className="text-sm text-zinc-600 leading-relaxed mb-4">{copy.clinicalSystemsIntro}</p>
        <div className="space-y-3">
          {copy.clinicalItems.map((item) => (
            <div key={item.title} className="p-5 rounded-xl border border-zinc-200">
              <h3 className="text-sm font-semibold text-zinc-900">{item.title}</h3>
              <p className="text-sm text-zinc-600 mt-2 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-semibold text-zinc-900 mb-2 uppercase tracking-wider">
          {copy.capabilities}
        </h2>
        <p className="text-sm text-zinc-600 leading-relaxed mb-4">{copy.capabilitiesIntro}</p>
        <div className="grid sm:grid-cols-2 gap-4">
          {copy.capabilityItems.map((item) => (
            <div key={item.title} className="p-4 rounded-xl bg-zinc-50 border border-zinc-200">
              <h3 className="text-sm font-semibold text-zinc-900 mb-1">{item.title}</h3>
              <p className="text-sm text-zinc-600 leading-relaxed">{item.items}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-semibold text-zinc-900 mb-3 uppercase tracking-wider">
          {copy.selectedRecognition}
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl border border-zinc-200">
            <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
              {t("awards")}
            </h3>
            <ul className="space-y-2">
              {(["award_1", "award_2", "award_3"] as const).map((key) => (
                <li key={key} className="text-sm text-zinc-600 flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span>{t(key)}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-5 rounded-xl border border-zinc-200">
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="text-xs font-semibold text-accent bg-accent/10 px-2 py-0.5 rounded-full">
                {t("patent_label")}
              </span>
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                {t("copyright_label")}
              </span>
            </div>
            <p className="text-sm text-zinc-700 leading-relaxed">{t("ip_patent_1")}</p>
            <ul className="mt-2 space-y-1">
              <li className="text-sm text-zinc-600">• {t("ip_copyright_1")}</li>
              <li className="text-sm text-zinc-600">• {t("ip_copyright_2")}</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-semibold text-zinc-900 mb-3 uppercase tracking-wider">
          {copy.languages}
        </h2>
        <div className="flex flex-wrap gap-3">
          <span className="px-4 py-2 rounded-xl bg-zinc-50 border border-zinc-200 text-sm text-zinc-700">
            {isChinese ? "中文（母语）" : "Chinese (native)"}
          </span>
          <span className="px-4 py-2 rounded-xl bg-zinc-50 border border-zinc-200 text-sm text-zinc-700">
            {isChinese ? "粤语（母语）" : "Cantonese (native)"}
          </span>
          <span className="px-4 py-2 rounded-xl bg-zinc-50 border border-zinc-200 text-sm text-zinc-700">
            {isChinese ? "英语：IELTS 6.5 · CET-6 528" : "English: IELTS 6.5 · CET-6 528"}
          </span>
        </div>
      </section>

      <section className="pt-6 border-t border-zinc-200">
        <h2 className="text-sm font-semibold text-zinc-900 mb-3 uppercase tracking-wider">{copy.explore}</h2>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <a
            href={`/${locale}/experience`}
            className="inline-flex items-center gap-1 text-sm text-accent hover:text-accent-dark"
          >
            {copy.exploreExperience}
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
          <a
            href={`/${locale}/publications`}
            className="inline-flex items-center gap-1 text-sm text-accent hover:text-accent-dark"
          >
            {copy.explorePublications}
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
          <a
            href={`/${locale}/projects`}
            className="inline-flex items-center gap-1 text-sm text-accent hover:text-accent-dark"
          >
            {copy.exploreProjects}
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </section>
    </div>
  );
}
