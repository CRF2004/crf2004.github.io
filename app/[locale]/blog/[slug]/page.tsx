import { use } from "react";
import { setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { routing } from "@/lib/routing";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  const slugs = [
    "why-interpretable-medical-ai",
    "kg-llm-hospital-lessons",
    "building-viora",
  ];
  const params: { locale: string; slug: string }[] = [];
  for (const locale of routing.locales) {
    for (const slug of slugs) {
      params.push({ locale, slug });
    }
  }
  return params;
}

const posts: Record<
  string,
  {
    title: { en: string; zh: string };
    date: string;
    content: { en: React.ReactNode; zh: React.ReactNode };
  }
> = {
  "why-interpretable-medical-ai": {
    title: {
      en: "Why I'm Building Medical AI That Explains Itself",
      zh: "为什么我在构建能自我解释的医疗AI",
    },
    date: "2026-05-01",
    content: {
      en: <MedicalAIExplainableEn />,
      zh: <MedicalAIExplainableZh />,
    },
  },
  "kg-llm-hospital-lessons": {
    title: {
      en: "Lessons from Deploying KG+LLM Pipelines in a Hospital",
      zh: "在医院部署KG+LLM管线的经验教训",
    },
    date: "2026-04-15",
    content: {
      en: <KGHospitalEn />,
      zh: <KGHospitalZh />,
    },
  },
  "building-viora": {
    title: {
      en: "Building Viora: Rethinking Health Tracking as a Conversation",
      zh: "构建Viora：将健康追踪重新想象为对话",
    },
    date: "2026-03-20",
    content: {
      en: <VioraEn />,
      zh: <VioraZh />,
    },
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const post = posts[slug];
  if (!post) return { title: "Not Found" };
  return { title: post.title[locale as "en" | "zh"] };
}

export default function BlogPostPage({ params }: Props) {
  const { slug, locale } = use(params);
  setRequestLocale(locale);

  const post = posts[slug];
  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-16 text-center">
        <h1 className="text-2xl font-bold text-zinc-900">
          {locale === "en" ? "Post not found" : "文章未找到"}
        </h1>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
      <Link
        href={`/${locale}/blog`}
        className="text-sm text-zinc-500 hover:text-accent transition-colors mb-6 inline-block"
      >
        ← {locale === "en" ? "Back to Blog" : "返回博客"}
      </Link>

      <article>
        <header className="mb-10">
          <time
            dateTime={post.date}
            className="text-sm text-zinc-400 mb-2 block"
          >
            {new Date(post.date).toLocaleDateString(
              locale === "en" ? "en-US" : "zh-CN",
              { year: "numeric", month: "long", day: "numeric" }
            )}
          </time>
          <h1 className="text-3xl font-bold text-zinc-900">
            {post.title[locale as "en" | "zh"]}
          </h1>
        </header>

        <div className="prose prose-zinc max-w-none">
          {post.content[locale as "en" | "zh"]}
        </div>
      </article>
    </div>
  );
}

/* ---- Blog post content components ---- */

function MedicalAIExplainableEn() {
  return (
    <>
      <p>
        When I started working at the AI Research Institute of Guangdong No. 2
        Provincial People&apos;s Hospital, I had a naive assumption: if we could
        just make the model accurate enough, clinicians would use it. I was
        wrong.
      </p>

      <h2>The Problem with Black-Box Medicine</h2>
      <p>
        In clinical practice, &quot;trust me, the model says so&quot; is not a
        valid argument. Doctors need to understand <em>why</em> a prediction was
        made — not just that it was made with high confidence. This is
        especially true for high-stakes decisions like cardiovascular disease
        diagnosis.
      </p>
      <p>
        During my internship, I observed that even when our LLM-based Q&A system
        produced factually correct answers, physicians would still ask:
        &quot;Where did this come from? Which guideline? Which study?&quot;
      </p>

      <h2>Knowledge Graphs as the Bridge</h2>
      <p>
        This is where knowledge graphs enter the picture. By mapping model
        predictions onto structured medical knowledge — diseases, symptoms,
        treatments, and their relationships — we can trace every inference back
        to a path in the graph. For our myocardial ischemia project, we used
        XGBoost for prediction and then mapped the feature importance scores
        onto the KG to show <em>which clinical factors drove the decision</em>.
      </p>

      <h2>What&apos;s Next</h2>
      <p>
        I believe the future of medical AI is hybrid: LLMs for flexible
        interaction and understanding, knowledge graphs for structure and
        traceability, and classical ML for robust inference. The key challenge
        is making these components work together seamlessly while keeping the
        explanation layer accessible to clinicians.
      </p>
    </>
  );
}

function MedicalAIExplainableZh() {
  return (
    <>
      <p>
        当我开始在广东省第二人民医院人工智能研究所工作时，我有一个天真的假设：只要模型足够准确，临床医生就会使用它。我错了。
      </p>

      <h2>黑箱医学的问题</h2>
      <p>
        在临床实践中，「相信我，模型说是这样」不是一个有效的论证。医生需要理解预测<em>为什么</em>被做出——而不仅仅是高置信度地做出。对于心血管疾病诊断等高风险决策尤其如此。
      </p>
      <p>
        在实习期间，我观察到即使我们基于LLM的问答系统产生了事实上正确的答案，医生们仍然会问：「这从哪来的？哪个指南？哪个研究？」
      </p>

      <h2>知识图谱作为桥梁</h2>
      <p>
        这就是知识图谱发挥作用的地方。通过将模型预测映射到结构化医学知识——疾病、症状、治疗及其关系——我们可以将每个推理追溯到图谱中的路径。在我们的心肌缺血项目中，我们使用XGBoost进行预测，然后将特征重要性分数映射到知识图谱上，以展示<em>哪些临床因素驱动了决策</em>。
      </p>

      <h2>未来方向</h2>
      <p>
        我相信医学AI的未来是混合的：LLM用于灵活的交互和理解，知识图谱用于结构和可追溯性，经典机器学习用于稳健推理。关键挑战是让这些组件无缝协作，同时保持解释层对临床医生可访问。
      </p>
    </>
  );
}

function KGHospitalEn() {
  return (
    <>
      <p>
        Processing 8,000 PDF-formatted cardiovascular case reports taught me
        more about real-world AI engineering than any course ever could.
      </p>

      <h2>The Data Reality Check</h2>
      <p>
        Academic datasets are clean. Real hospital data is not. Our 8,000 PDFs
        came from multiple departments, written by different physicians with
        different conventions. Some were scanned images requiring OCR. Some had
        embedded tables with irregular formatting. Some were 2 pages, others 20+.
      </p>

      <h2>The Pipeline We Built</h2>
      <p>
        We designed a multi-stage pipeline: (1) PDF text extraction and cleaning,
        (2) semantic chunking adapted to medical report structure, (3) LLM-based
        named entity recognition and relation extraction, (4) entity
        disambiguation and fusion, and (5) Neo4j storage as per-case sub-graphs.
      </p>

      <h2>Key Lessons</h2>
      <ul>
        <li>
          <strong>Chunking matters more than you think.</strong> Medical reports have
          natural sections — chief complaint, history, examination, diagnosis,
          treatment. Respecting these boundaries improved our NER accuracy by ~15%.
        </li>
        <li>
          <strong>Entity disambiguation is the hidden bottleneck.</strong> The
          same drug can appear under brand name, generic name, and abbreviation.
          Resolving these across 8,000 documents required a combination of
          embedding similarity and rule-based matching.
        </li>
        <li>
          <strong>Hybrid RAG beats pure RAG for structured domains.</strong>
          Combining structured KG queries with semantic retrieval gave us both
          precision and recall for the standardized patient Q&A system.
        </li>
      </ul>
    </>
  );
}

function KGHospitalZh() {
  return (
    <>
      <p>
        处理8000份PDF格式的心血管病例报告，比任何课程都更让我理解了真实世界的AI工程。
      </p>

      <h2>数据的现实检验</h2>
      <p>
        学术数据集是干净的。真实的医院数据不是。我们的8000份PDF来自多个科室，由不同的医生用不同的习惯撰写。有些是需要OCR的扫描图像。有些包含格式不规则的嵌入式表格。有些只有2页，有些超过20页。
      </p>

      <h2>我们构建的流水线</h2>
      <p>
        我们设计了一个多阶段流水线：(1) PDF文本提取与清洗，(2) 适配医疗报告结构的语义分块，(3) 基于LLM的命名实体识别和关系抽取，(4) 实体消歧与融合，(5) 以病例为单位的Neo4j子图存储。
      </p>

      <h2>关键经验</h2>
      <ul>
        <li>
          <strong>分块策略比你想象的更重要。</strong>
          医疗报告有自然的分段——主诉、病史、检查、诊断、治疗。尊重这些边界使我们的NER准确率提升了约15%。
        </li>
        <li>
          <strong>实体消歧是隐藏的瓶颈。</strong>
          同一种药物可能以商品名、通用名和缩写出现。在8000份文档中消解这些需要结合嵌入相似度和规则匹配。
        </li>
        <li>
          <strong>在结构化领域中，混合RAG优于纯RAG。</strong>
          结合结构化知识图谱查询和语义检索，为标准化病人问答系统提供了精准率和召回率的双重保障。
        </li>
      </ul>
    </>
  );
}

function VioraEn() {
  return (
    <>
      <p>
        Health apps are broken. They treat you like a data entry clerk —
        logging meals, counting steps, filling forms. Viora takes a different
        approach: it talks to you like a friend.
      </p>

      <h2>The Insight</h2>
      <p>
        People don&apos;t want to &quot;track their health.&quot; They want to
        feel good and understand their body. The tracking is a means, not an
        end. Yet most health apps make the tracking itself the entire experience.
        Viora inverts this: the conversation is the experience, and the data
        collection happens naturally in the background.
      </p>

      <h2>Design Principles</h2>
      <ul>
        <li>
          <strong>Proactive, not reactive.</strong> Viora initiates
          conversations when your routine changes — not when you remember to
          open the app.
        </li>
        <li>
          <strong>Conversational, not form-based.</strong> Information flows
          through natural dialogue. You never feel like you&apos;re
          &quot;logging&quot; anything.
        </li>
        <li>
          <strong>Long-term memory.</strong> Viora remembers your patterns,
          preferences, and history. It doesn&apos;t ask the same questions twice.
        </li>
        <li>
          <strong>Narrative over numbers.</strong> Instead of dashboards, Viora
          weaves your health data into readable stories with a D3.js-powered
          graph visualization.
        </li>
      </ul>

      <h2>What I Learned</h2>
      <p>
        Building Viora changed how I think about AI interaction design. The
        hardest part wasn&apos;t the tech stack (Flask + D3.js) — it was
        designing conversation flows that feel natural while reliably extracting
        useful health signals. This project deepened my interest in
        conversational AI for health and directly informed my approach to the
        standardized patient Q&A system.
      </p>
    </>
  );
}

function VioraZh() {
  return (
    <>
      <p>
        健康应用坏了。它们把你当数据录入员——记录饮食、计算步数、填表格。Viora采取了不同的方式：像朋友一样和你聊天。
      </p>

      <h2>洞察</h2>
      <p>
        人们并不想「追踪健康」。他们想要感觉良好、了解自己的身体。追踪是手段，不是目的。然而大多数健康应用把追踪本身变成了整个体验。Viora反转了这一点：对话就是体验，数据收集在后台自然发生。
      </p>

      <h2>设计原则</h2>
      <ul>
        <li>
          <strong>主动而非被动。</strong> Viora在你的作息变化时主动发起对话——而不是等你想起打开应用。
        </li>
        <li>
          <strong>对话而非填表。</strong> 信息通过自然对话流动。你永远不会觉得在「记录」什么。
        </li>
        <li>
          <strong>长期记忆。</strong> Viora记住你的模式、偏好和历史。不会问两遍同样的问题。
        </li>
        <li>
          <strong>叙事而非数字。</strong> Viora将你的健康数据编织成可读的故事，辅以D3.js驱动的图谱可视化。
        </li>
      </ul>

      <h2>我学到了什么</h2>
      <p>
        构建Viora改变了我对AI交互设计的思考方式。最难的部分不是技术栈（Flask + D3.js）——而是设计既自然又能可靠提取有用健康信号的对话流程。这个项目加深了我对医疗对话式AI的兴趣，并直接影响了我在标准化病人问答系统中的方法。
      </p>
    </>
  );
}
