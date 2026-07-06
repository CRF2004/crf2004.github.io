import { use } from "react";
import { setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { routing } from "@/lib/routing";
import type { Metadata } from "next";
import GiscusComments from "@/components/GiscusComments";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  const slugs = [
    "medical-ai-beyond-auc",
    "why-interpretable-medical-ai",
    "kg-llm-hospital-lessons",
    "building-viora",
    "parameters-or-retrieval",
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
  "medical-ai-beyond-auc": {
    title: {
      en: "Why Medical AI Can't Just Look at AUC",
      zh: "为什么医疗AI不能只看AUC？",
    },
    date: "2026-06-20",
    content: {
      en: <MedAIBeyondAUCEn />,
      zh: <MedAIBeyondAUCZh />,
    },
  },
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
  "parameters-or-retrieval": {
    title: {
      en: "Parameters or Retrieval? When to Compress Data Into a Model vs. Use It as External Memory",
      zh: "参数还是检索？数据该压缩进模型，还是作为外部记忆直接推理？",
    },
    date: "2026-07-06",
    content: {
      en: <ParametersOrRetrievalEn />,
      zh: <ParametersOrRetrievalZh />,
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

      <GiscusComments />
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

/* ---- New blog post: Why Medical AI Can't Just Look at AUC ---- */

function MedAIBeyondAUCEn() {
  return (
    <>
      <h2>1. The question isn&apos;t whether the model can predict, but whether it can predict under control</h2>
      <p>
        Medical AI faces a higher bar than consumer applications. A model that achieves high accuracy on a held-out test set cannot be casually slipped into a clinical decision chain — because when it errs, its errors correspond to real patient risk.
      </p>
      <p>
        This is why medical AI can&apos;t just discuss &ldquo;how accurate&rdquo; the predictions are. Beyond accuracy, we need interpretability, the ability to express uncertainty, and the capacity to admit &ldquo;I don&apos;t know&rdquo; when appropriate. The next leap in medical AI may not be from &ldquo;fewer mistakes&rdquo; to &ldquo;never wrong,&rdquo; but from &ldquo;confidently wrong&rdquo; to &ldquo;knowing when not to act.&rdquo;
      </p>
      <p>
        AUC, AUPRC, Accuracy — these metrics matter. They tell us how well the model separates positives from negatives on the current test set. But they don&apos;t answer a different question: <em>Does the evidence the model relies on align with the evidence that clinical medicine says it should rely on?</em>
      </p>

      <h2>2. Predicting correctly doesn&apos;t mean reasoning correctly</h2>
      <p>
        Getting the right answer is not the same as taking the right reasoning path. A model may have genuinely learned medical knowledge — or it may just be guessing well, taking shortcuts, or exploiting hidden patterns baked into the dataset.
      </p>
      <p>
        In ECG classification, this issue is especially pronounced. The model learns from the feature distribution of the dataset itself — which is both a strength and a weakness. It may capture fine-grained pathological signals that humans have yet to formally characterize, or it may simply depend on device differences, acquisition protocols, noise patterns, labeling conventions, or other dataset-specific confounds. If a pattern reduces the loss, the model has every reason to use it.
      </p>
      <p>
        This is what worries me most: the patterns the model &ldquo;learns wrong&rdquo; often reduce the loss even further. But does its reasoning actually align with clinical evidence?
      </p>

      <h2>3. There is a tension between medical knowledge and model performance</h2>
      <p>
        I previously tried mapping ECG semantic features — P-wave abnormalities, ST elevation, etc. — and output label semantics — atrial fibrillation, sinus bradycardia, etc. — onto an ECG finding-disease evidence graph. I also attempted to use the graph to correct or verify the diagnoses made by machine learning models.
      </p>
      <p>
        The results were not always better. In fact, they were often worse than using the ML model alone. From an engineering perspective, this isn&apos;t surprising: deep learning models can learn far more complex decision boundaries from high-dimensional data distributions, while graphs and rules can only express already-abstracted medical knowledge.
      </p>
      <p>
        But this phenomenon deserves reflection. Higher predictive metrics don&apos;t necessarily mean the model&apos;s reasoning is more consistent with clinical evidence. Medical knowledge failing to improve the metrics doesn&apos;t mean medical knowledge is worthless; it may simply mean that &ldquo;prediction optimality&rdquo; and &ldquo;evidence alignment&rdquo; are two fundamentally different objectives.
      </p>

      <h2>4. Conventional explainability methods have value, but aren&apos;t enough</h2>
      <p>
        I&apos;m not dismissing saliency maps, occlusion maps, or attention visualizations. These are useful tools — they help us observe what the model might be attending to and provide a first layer of intuition for researchers.
      </p>
      <p>
        What I doubt is whether these <em>post-hoc</em> explanations themselves are sufficiently trustworthy.
      </p>
      <p>
        Too often, when an explanation looks plausible by common sense, people accept it. If the model predicts a certain cardiac condition and the heatmap happens to cover a waveform region that seems relevant, we may conclude the model &ldquo;really sees it.&rdquo; But few people go further and check: Is this explanation robust? Is it specific? Does the model&apos;s prediction genuinely depend on these regions?
      </p>
      <p>
        There is, of course, a large gap between &ldquo;explanation&rdquo; and &ldquo;reasoning&rdquo; in current ML — and they absolutely must not be conflated. Black-box models have enormous parameter counts and complex nonlinear structures; we cannot directly observe how a model internally arrives at a judgment. But in a medical context, this gap cannot simply be ignored. We need to design some kind of auditing mechanism to test whether the explanation genuinely supports the model&apos;s behavior.
      </p>

      <h2>5. From explanation to reasoning: why matched-control perturbation matters</h2>
      <p>
        The core contribution of matched-control perturbation is not generating yet another explanation map. It is advancing the question from explanation to testable reasoning.
      </p>
      <p>
        It doesn&apos;t ask: <em>Is the model sensitive to a certain region?</em>
      </p>
      <p>
        It asks: <em>If you claim the model depends on a certain medical evidence region, then I propose an anatomically matched but medically distinct control region; I place both explanations into a perturbation experiment and compare which one more strongly influences the model&apos;s judgment.</em> A truly valid explanation should not merely &ldquo;look right&rdquo; — it should hold up when competing against a reasonable control.
      </p>
      <p>
        In other words, it tries to move the question from &ldquo;where does the model look?&rdquo; to &ldquo;does the model depend more on the evidence that clinical medicine says it should?&rdquo;
      </p>

      <h2>6. Clinical evidence should serve as a more stable reference frame</h2>
      <p>
        What this work really cares about is not pushing the model further toward the loss function&apos;s minimum on some dataset. It is asking: <em>Can clinical evidence become a more stable reference frame?</em>
      </p>
      <p>
        When the dataset, acquisition device, patient population, or labeling conventions change — does the model still depend on the evidence that medicine says should be depended on? If the answer is no, then a high AUC cannot adequately demonstrate that the model has learned transferable, collaborative, auditable medical knowledge.
      </p>
      <p>
        Traditional training objectives ask: <em>What features reduce the loss?</em>
      </p>
      <p>
        Medical AI auditing needs to also ask: <em>What evidence makes the judgment more trustworthy, more stable, and more consistent with clinical reasoning?</em>
      </p>

      <h2>7. My take</h2>
      <p>
        Medical AI should not only chase higher scores on fixed test sets. High performance is a necessary condition, but it is not sufficient. For clinical settings, we also need to know <em>why</em> the model reached this judgment, whether it depended on reasonable medical evidence, and whether this dependence remains stable under external data shifts.
      </p>
      <p>
        Prediction, explanation, and evidence alignment should be treated as three separate evaluation axes.
      </p>
      <p>
        A model can predict accurately but for the wrong reasons; can produce plausible explanations that are unfaithful to the true reasoning; can achieve evidence alignment on one dataset but lose stability on another.
      </p>
      <p>
        Therefore, the trustworthiness of medical AI cannot rest on AUC alone. What we need are not just better performance metrics, but also methods that can audit <em>how</em> models use evidence.
      </p>
    </>
  );
}

function MedAIBeyondAUCZh() {
  return (
    <>
      <h2>一、问题不是模型能不能预测，而是能不能受控地预测</h2>
      <p>
        医疗领域对 AI 提出了比一般场景更高的要求。一个模型即使在测试集上达到很高的准确率，也不能被轻易地、不受监督地放进临床决策链条。因为只要它仍然会犯错，它的错误就可能对应真实患者的风险。
      </p>
      <p>
        这也是为什么医疗AI不能只讨论&ldquo;预测得准不准&rdquo;。相比普通推荐系统或消费级应用，医疗AI还需要解释能力、不确定性表达能力，以及在能力不足时承认&ldquo;不知道&rdquo;的机制。未来医疗AI的关键进步，也许不是从&ldquo;做错更少&rdquo;直接走向&ldquo;永远正确&rdquo;，而是从&ldquo;自信地做错&rdquo;走向&ldquo;知道什么时候不该做&rdquo;。
      </p>
      <p>
        AUC、AUPRC、Accuracy 这些指标当然重要。它们回答的是：模型在当前测试集上区分正负样本的能力如何。但它们回答不了另一个问题：模型做出判断时，依赖的证据是否符合临床医学中更应被依赖的依据。
      </p>

      <h2>二、预测对了，不等于理由对了</h2>
      <p>
        预测对了与推理路径不直接相关。模型可能是真的学到了医学知识，也可能只是猜对了、投机取巧答对了，或者利用了数据集中隐藏的某种捷径。
      </p>
      <p>
        在 ECG 分类任务中，这个问题尤其明显。模型基于数据集本身的特征分布进行学习，这一点有利也有弊。它可能捕捉到人类目前尚未明确总结出的细粒度病理信号，也可能只是依赖设备差异、采集流程、噪声模式、标签习惯或其他数据集偏差。只要某种模式能让损失函数下降，模型就有理由利用它。
      </p>
      <p>
        这也是我最担心的地方：模型&ldquo;学错&rdquo;的那部分，往往也能让损失降得更低。但它的推理真的符合临床医学的科学依据吗？
      </p>

      <h2>三、医学知识和模型性能之间存在张力</h2>
      <p>
        我之前尝试过将 XGBoost 的心电语义输入特征，例如 P 波异常、ST 抬高等，与输出标签语义特征，例如房颤、窦性心动过缓等，映射到 ECG finding-disease 的证据图谱上；也尝试过用图谱去修正或校验机器学习模型给出的诊断。
      </p>
      <p>
        结果并不总是更好，甚至很多时候不如单独使用机器学习模型。这个结果从工程角度看并不意外：深度学习或机器学习模型可以从高维数据分布中学习到更复杂的判别边界，而图谱和规则往往只能表达已经被抽象出来的医学知识。
      </p>
      <p>
        但这个现象也引人深思。预测指标更高，不一定意味着模型的推理更符合临床证据。医学知识没有让指标继续上升，并不代表医学知识没有价值；它可能说明&ldquo;预测最优&rdquo;和&ldquo;证据对齐&rdquo;本来就是两个不同目标。
      </p>

      <h2>四、普通可解释性方法有价值，但还不够</h2>
      <p>
        我并不是不认可 saliency map、occlusion map、attention 可视化这些方法。它们都是有用的工具，可以帮助我们观察模型可能关注了什么，也能给研究者提供第一层直觉。
      </p>
      <p>
        但我怀疑的是：这些事后解释本身是否足够可信。
      </p>
      <p>
        很多时候，只要解释结果看起来符合人的常识，人们就容易接受它。比如模型预测某种心电疾病，热力图也刚好覆盖到一段看起来相关的波形区域，我们就可能认为模型&ldquo;确实看到了那里&rdquo;。但问题是，很少有人继续确认：这个解释是否稳健？是否具有特异性？模型的预测是否真的以这些区域为依据？
      </p>
      <p>
        目前机器学习领域中，&ldquo;解释&rdquo;和&ldquo;推理&rdquo;之间当然存在很大的距离，并且绝对不能混为一谈。黑盒模型的参数量很大，非线性结构复杂，我们很难直接知道模型内部到底如何形成判断。但在医疗场景中，这个距离不能被简单忽略。我们至少需要设计某种审计机制，去检验解释是否真的能支持模型行为。
      </p>

      <h2>五、从解释到推理：为什么需要 matched-control perturbation</h2>
      <p>
        matched-control perturbation 的核心不是再生成一张解释图，而是把解释推进到可检验的推理层面。
      </p>
      <p>
        它问的不是：模型是否对某个区域敏感？
      </p>
      <p>
        它问的是：如果你声称模型依赖某个医学证据区域，那么我提出一个解剖学上匹配、但医学意义不同的对照区域；然后把两种解释都放进扰动实验中，比较哪一种更能影响模型判断。真正合理的解释，不应该只是&ldquo;看起来对&rdquo;，而应该在和合理对照竞争时仍然成立。
      </p>
      <p>
        换句话说，它试图把问题从&ldquo;模型关注哪里&rdquo;推进到&ldquo;模型是否更依赖临床上应该依赖的证据&rdquo;。
      </p>

      <h2>六、临床证据应该成为更稳定的参照系</h2>
      <p>
        这项工作真正关心的不是让模型在某个数据集上继续逼近损失函数的最低点，而是追问：临床证据能否成为一种更稳定的参照系？
      </p>
      <p>
        当数据集、采集设备、患者群体或标注习惯发生变化时，模型是否仍然依赖那些在医学上更应被依赖的证据？如果答案是否定的，那么高AUC并不能充分说明模型已经学到了可迁移、可协作、可审查的医学知识。
      </p>
      <p>
        传统训练目标问的是：什么特征能让损失更低？
      </p>
      <p>
        医疗AI审计还需要问的是：什么证据能让判断更可信、更稳定、更符合临床推理？
      </p>

      <h2>七、我的理解</h2>
      <p>
        医疗AI不应该只追求在固定测试集上取得更高分数。高性能是必要条件，但不是充分条件。对于临床场景来说，我们还需要知道模型为什么得出这个判断，它是否依赖了合理的医学证据，这种依赖在外部数据中是否仍然稳定。
      </p>
      <p>
        预测、解释和证据对齐，应该被看成三条不同的评价轴。
      </p>
      <p>
        一个模型可以预测很准，但理由不对；也可以给出看似合理的解释，但解释并不忠实于真实推理；还可以在一个数据集上证据对齐，却在另一个数据集上失去稳定性。
      </p>
      <p>
        因此，医疗AI的可信性不能只靠一个AUC支撑。我们需要的不只是更高的性能指标，也需要能够审计模型证据使用方式的方法。
      </p>
    </>
  );
}

/* ---- New blog post: Parameters or Retrieval ---- */

function ParametersOrRetrievalEn() {
  return (
    <>
      <p>
        Here is a question I keep coming back to: <em>When should you compress data into model parameters, and when should you keep it as an external sample database that participates directly in inference?</em>
      </p>
      <p>
        My answer is not a clean either/or. Transformers are not inherently superior to explicit sample databases. In high-dimensional, combinatorial, generalization-heavy tasks, pure sample databases struggle badly. But in retrieval-friendly, similarity-driven tasks with strong local structure, sample databases can actually be more reliable. The best form is usually hybrid: the model handles representation and reasoning, while data provides external memory and calibration.
      </p>

      <h2>1. Two Fundamentally Different Kinds of Memory</h2>

      <h3>A. Models: Parametric Memory</h3>
      <p>
        After training, data no longer exists in its original sample form — it has been compressed into parameters. The model learns a mapping from input to output:
      </p>
      <p className="text-center font-mono text-sm bg-zinc-50 py-3 rounded-lg">
        D → θ, ŷ = f<sub>θ</sub>(x)
      </p>
      <p>
        <strong>Strengths:</strong> learns abstract patterns, generalizes to unseen combinations, fast inference, compresses large datasets into compact parameter structures, learns implicit similarity without hand-crafted distance functions.
      </p>
      <p>
        <strong>Weaknesses:</strong> specific sample details may be lost, knowledge updates are expensive, hard to interpret, can silently absorb dataset biases.
      </p>

      <h3>B. Sample Databases / Semantic Networks: Non-Parametric Memory</h3>
      <p>
        Data is not compressed — it participates directly in inference through retrieval and aggregation:
      </p>
      <p className="text-center font-mono text-sm bg-zinc-50 py-3 rounded-lg">
        ŷ = Aggregate(NearestNeighbors(x, D))
      </p>
      <p>
        <strong>Strengths:</strong> high information fidelity, interpretable (you can see reference samples), new data can be added instantly, excellent for facts, medical cases, waveform templates, and historical examples.
      </p>
      <p>
        <strong>Weaknesses:</strong> &ldquo;similarity&rdquo; is hard to define in high dimensions, retrieval cost can be high, struggles with unseen combinations, tends to stay at &ldquo;finding similar cases&rdquo; rather than &ldquo;understanding generative mechanisms.&rdquo;
      </p>
      <p>
        Work like kNN-LM has already shown that combining neural language models with nearest-neighbor sample databases improves performance — using a pretrained LM&apos;s embedding space to find neighbors, then interpolating the kNN distribution with the original LM distribution. RAG follows the same philosophy: a pretrained model as parametric memory, an external document index as non-parametric memory.
      </p>

      <h2>2. More Data Doesn&apos;t Automatically Make Sample Databases Better</h2>
      <p>
        In low-dimensional, well-structured tasks, sample databases thrive. A few clear features, an easy-to-define distance function, genuinely similar samples mapping to similar outputs — more data means better nearest-neighbor performance.
      </p>
      <p>
        But in high-dimensional tasks like language, images, or physiological waveforms, the core problem shifts:
      </p>
      <p className="text-center italic text-zinc-600">
        What does it even mean for two samples to be &ldquo;similar&rdquo;?
      </p>
      <p>
        Take language: &ldquo;He didn&apos;t dislike the movie&rdquo; vs. &ldquo;He liked the movie&rdquo; — different tokens, similar semantics.
      </p>
      <p>
        Take ECG: two segments might differ in QRS offset, amplitude scaling, lead noise, heart rate, and phase — yet be medically similar. Raw Euclidean distance would call them &ldquo;different.&rdquo;
      </p>
      <p>
        So sample databases don&apos;t just need more data to improve — they need:
      </p>
      <p className="text-center font-mono text-sm bg-zinc-50 py-3 rounded-lg">
        good representation space + good distance function + sufficient coverage
      </p>
      <p>
        And that &ldquo;good representation space&rdquo; often needs to be learned by a model. This is why pure sample databases rarely fully replace Transformers — not because the approach is wrong, but because <strong>similarity in high-dimensional data itself requires learning</strong>.
      </p>

      <h2>3. Language Prediction: Can Pure Semantic Networks Work?</h2>
      <p>
        They can, but it&apos;s hard to beat a strong Transformer.
      </p>
      <p>
        Language prediction isn&apos;t a simple lookup. It requires simultaneously handling: local syntax, long-range dependencies, semantic consistency, world knowledge, style, contextual intent, and probability distributions over multiple possible tokens.
      </p>
      <p>
        A massive sample database can approximate:
      </p>
      <p className="text-center font-mono text-sm bg-zinc-50 py-3 rounded-lg">
        P(w<sub>t+1</sub> | context) ≈ distribution of next words in similar contexts
      </p>
      <p>
        If the database is enormous, many short contexts can find good matches. But long contexts are almost never exactly repeated — the longer the context, the sparser exact matches become. So pure sample databases face a dilemma: short contexts are matchable but information-poor; long contexts are information-rich but hard to match; abstract semantics and compositional reasoning need representation models.
      </p>
      <p>
        Transformers sidestep this by learning a compressed conditional distribution — effectively compressing massive language samples into a composable generative mechanism.
      </p>

      <div className="my-6 overflow-x-auto">
        <table className="min-w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-zinc-200">
              <th className="text-left py-2 pr-4 font-semibold">Approach</th>
              <th className="text-left py-2 font-semibold">Best for</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-zinc-100">
              <td className="py-2 pr-4 font-medium">Pure sample DB</td>
              <td className="py-2">Paraphrasing, citation, case retrieval, similar Q&A, fact replay</td>
            </tr>
            <tr className="border-b border-zinc-100">
              <td className="py-2 pr-4 font-medium">Pure Transformer</td>
              <td className="py-2">Generation, generalization, language modeling, compositional semantics</td>
            </tr>
            <tr className="border-b border-zinc-100">
              <td className="py-2 pr-4 font-medium">Transformer + Retrieval</td>
              <td className="py-2">Knowledge-intensive Q&A, medical Q&A, legal Q&A, research assistants, enterprise KB</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>4. Waveform Prediction: Transformer vs. Massive Waveform Database</h2>
      <p>
        This scenario — given a waveform segment, predict the next segment — gets closer to the ECG intuition: should we train a model to generate the future, or retrieve similar historical futures from a database?
      </p>

      <h3>Option A: Transformer predicts the next segment</h3>
      <p>
        Learns rhythm, morphology, phase changes; adapts to noise; generates plausible unseen morphologies; models long-range dependencies. But may produce &ldquo;averaged&rdquo; morphologies, lacks detail fidelity, has weak interpretability, and may be unstable for out-of-distribution pathological patterns.
      </p>

      <h3>Option B: Massive waveform database as candidate recommender</h3>
      <p>
        Outputs real historical waveform segments; medically interpretable; shows similar cases; effective for templated, periodic signals. But similarity definition is hard; phase, rate, amplitude, and lead differences interfere with retrieval; rare combinations may lack good neighbors; predictions can become &ldquo;historical splicing&rdquo; rather than true individual dynamics.
      </p>

      <div className="my-6 overflow-x-auto">
        <table className="min-w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-zinc-200">
              <th className="text-left py-2 pr-4 font-semibold">Scenario</th>
              <th className="text-left py-2 font-semibold">Better fit</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-zinc-100">
              <td className="py-2 pr-4">Highly regular, repetitive rhythm</td>
              <td className="py-2">Sample DB / template retrieval</td>
            </tr>
            <tr className="border-b border-zinc-100">
              <td className="py-2 pr-4">Short-term next-beat morphology prediction</td>
              <td className="py-2">Sample DB + local deformation</td>
            </tr>
            <tr className="border-b border-zinc-100">
              <td className="py-2 pr-4">Trend change prediction</td>
              <td className="py-2">Transformer / state-space models</td>
            </tr>
            <tr className="border-b border-zinc-100">
              <td className="py-2 pr-4">Large individual historical data</td>
              <td className="py-2">Personal sample database</td>
            </tr>
            <tr className="border-b border-zinc-100">
              <td className="py-2 pr-4">Cross-population generalization</td>
              <td className="py-2">Models are more important</td>
            </tr>
            <tr className="border-b border-zinc-100">
              <td className="py-2 pr-4">Medical interpretability needed</td>
              <td className="py-2">Sample DB as auxiliary</td>
            </tr>
            <tr className="border-b border-zinc-100">
              <td className="py-2 pr-4">Rare conditions</td>
              <td className="py-2">Hybrid approach is best</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p>
        The strongest approach is likely not either/or, but:
      </p>
      <p className="text-center font-mono text-sm bg-zinc-50 py-3 rounded-lg">
        Transformer encodes current state → retrieves similar waveforms → model reranks/fuses/corrects
      </p>
      <p>
        In other words: <strong>the model understands &ldquo;what state the current waveform is in,&rdquo; and the sample database provides &ldquo;real, referenceable future candidates.&rdquo;</strong>
      </p>

      <h2>5. A General Decision Framework</h2>

      <div className="my-6 overflow-x-auto">
        <table className="min-w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-zinc-200">
              <th className="text-left py-2 pr-4 font-semibold">Task characteristic</th>
              <th className="text-left py-2 pr-4 font-semibold">Train into model</th>
              <th className="text-left py-2 font-semibold">External memory</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-zinc-100">
              <td className="py-2 pr-4">Needs generalization to new combinations</td>
              <td className="py-2 pr-4 text-emerald-700 font-medium">Strong</td>
              <td className="py-2 text-zinc-400">Weak</td>
            </tr>
            <tr className="border-b border-zinc-100">
              <td className="py-2 pr-4">High input dimensionality</td>
              <td className="py-2 pr-4 text-emerald-700 font-medium">Strong (model reduces dims)</td>
              <td className="py-2 text-zinc-400">Weak (needs model first)</td>
            </tr>
            <tr className="border-b border-zinc-100">
              <td className="py-2 pr-4">Hard to define distance function</td>
              <td className="py-2 pr-4 text-emerald-700 font-medium">Strong</td>
              <td className="py-2 text-zinc-400">Weak</td>
            </tr>
            <tr className="border-b border-zinc-100">
              <td className="py-2 pr-4">Strong local similarity between samples</td>
              <td className="py-2 pr-4">Usable</td>
              <td className="py-2 text-emerald-700 font-medium">Strong</td>
            </tr>
            <tr className="border-b border-zinc-100">
              <td className="py-2 pr-4">Outputs must be interpretable & traceable</td>
              <td className="py-2 pr-4 text-zinc-400">Weaker</td>
              <td className="py-2 text-emerald-700 font-medium">Strong</td>
            </tr>
            <tr className="border-b border-zinc-100">
              <td className="py-2 pr-4">Knowledge updates frequently</td>
              <td className="py-2 pr-4 text-zinc-400">Weaker</td>
              <td className="py-2 text-emerald-700 font-medium">Strong</td>
            </tr>
            <tr className="border-b border-zinc-100">
              <td className="py-2 pr-4">Large data but sparse labels</td>
              <td className="py-2 pr-4 text-emerald-700 font-medium">Strong (self-supervised)</td>
              <td className="py-2">Retrieval also usable</td>
            </tr>
            <tr className="border-b border-zinc-100">
              <td className="py-2 pr-4">Factual queries</td>
              <td className="py-2 pr-4 text-zinc-400">Don&apos;t rely on model alone</td>
              <td className="py-2 text-emerald-700 font-medium">Strong</td>
            </tr>
            <tr className="border-b border-zinc-100">
              <td className="py-2 pr-4">Generation, prediction, compression</td>
              <td className="py-2 pr-4 text-emerald-700 font-medium">Strong</td>
              <td className="py-2">Auxiliary</td>
            </tr>
            <tr className="border-b border-zinc-100">
              <td className="py-2 pr-4">Distribution keeps shifting</td>
              <td className="py-2 pr-4">Needs continuous training</td>
              <td className="py-2 text-emerald-700 font-medium">External DB easier to update</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="text-center font-medium text-zinc-800">
        One-sentence summary: <em>When the task requires learning patterns, compressing structure, and handling unseen combinations — train the data into a model. When the task requires preserving facts, cases, evidence, and recent experience — let the data participate directly in inference.</em>
      </p>

      <h2>6. Three Paradigms</h2>

      <h3>Paradigm 1: Model-Dominant</h3>
      <p className="text-center font-mono text-sm bg-zinc-50 py-3 rounded-lg">
        D → θ, x → f<sub>θ</sub>(x)
      </p>
      <p>
        Data only appears during training. Pure Transformers, CNN ECG classifiers, ResNet waveform recognizers, standard supervised learning. Best for stable patterns, repetitive tasks, fast inference needs.
      </p>

      <h3>Paradigm 2: Data-Dominant</h3>
      <p className="text-center font-mono text-sm bg-zinc-50 py-3 rounded-lg">
        x + D → ŷ
      </p>
      <p>
        The &ldquo;model&rdquo; is weak — it only matches, aggregates, and ranks. kNN, case-based reasoning, similar case retrieval, template matching, sample-database waveform prediction. Best when similar samples are highly available, interpretability matters, and tasks have strong local structure.
      </p>

      <h3>Paradigm 3: Model-Data Synergy</h3>
      <p className="text-center font-mono text-sm bg-zinc-50 py-3 rounded-lg">
        x → z<sub>θ</sub>, z<sub>θ</sub> + D → ŷ
      </p>
      <p>
        The model first maps input into a better representation space, then data participates in inference. RAG, kNN-LM, retrieval-augmented time series forecasting, embedding-based similar case retrieval, model prediction + sample database calibration. This is usually the most practical and powerful form.
      </p>

      <h2>7. What the Literature Says</h2>

      <p>
        Recent research has made this debate concrete with controlled experiments across domains. Here are the key findings.
      </p>

      <h3>RAG vs. Fine-Tuning: External Memory Wins on Long-Tail Knowledge</h3>
      <p>
        Multiple studies (2024–2026) across low-frequency factual QA, medical Q&A, evidence synthesis, and structured EHR prediction consistently find that RAG outperforms fine-tuning on long-tail entities, dynamically updated knowledge, and evidence-dependent tasks. EHR-RAG (2026) showed an average <strong>10.76% Macro-F1 improvement</strong> over the strongest LLM baselines on long-horizon clinical predictions by retrieving relevant structured history. MedMeta (2026) demonstrated that Golden-RAG significantly outperformed parametric-only models for clinical evidence synthesis.
      </p>

      <h3>Long-Context LLMs vs. RAG: It&apos;s Nuanced</h3>
      <p>
        Some studies (EMNLP Industry 2024) find that with sufficient resources, long-context LLMs can outperform vanilla RAG — though RAG is significantly cheaper. Others show that ultra-long contexts dilute attention, and order-preserving RAG can achieve higher answer quality with fewer tokens. The takeaway: it&apos;s not that &ldquo;longer context is always better,&rdquo; but that <strong>precisely surfacing relevant information to the model&apos;s attention center is what matters</strong> — and that&apos;s exactly the strength of external memory.
      </p>

      <h3>Time Series & Waveform Forecasting: Retrieval Makes Real Progress</h3>
      <p>
        RAFT (ICML 2025) achieved an <strong>86% average win ratio</strong> over contemporary baselines across 10 time-series benchmarks by retrieving similar temporal patterns. RAF extends this to foundation models like Chronos/Moirai, showing larger TS foundation models benefit <em>more</em> from retrieval. RATD (NeurIPS 2024) uses retrieved historical sequences as diffusion denoising references. TimeRAG (2024) boosts LLM-based forecasting by ~2.97% through DTW-retrieved reference sequences.
      </p>
      <p>
        For ECG-like signals with local templates, rhythmic repetition, individual variation, and device differences, these results directly support the idea that external sample databases aren&apos;t just &ldquo;lookup&rdquo; — they can serve as <strong>conditional priors</strong> or <strong>predictive reference trajectories</strong>.
      </p>

      <h3>Beyond Language and Time Series</h3>
      <p>
        Retrieval augmentation has shown gains across diverse domains: tabular anomaly detection (CIKM 2024), robot manipulation and navigation (CVPR 2024, 2025), reinforcement learning via decision transformers, and graph learning (NeurIPS 2024). The pattern is consistent: when tasks require specific instances, past experiences, or structural memory, external retrieval beats pure parametric memory.
      </p>

      <h2>8. The Deeper Reason: Sample Complexity</h2>

      <p>
        Sample database methods need data to cover the space: <span className="font-mono text-sm">samples needed ~ O(ε<sup>−d</sup>)</span>, where <em>d</em> is the effective dimension. The higher the dimension, the harder to cover.
      </p>

      <p>
        Models reduce effective dimensionality through structural assumptions — attention composes context, semantics map to continuous space, patterns share parameters. A model transforms the problem from &ldquo;remember all cases&rdquo; to &ldquo;learn the generative principles behind those cases.&rdquo;
      </p>

      <p>
        But models have one weakness that sample databases don&apos;t: <strong>concreteness</strong>. Models learn compressed patterns; sample databases preserve specific evidence. In medicine, science, law, and finance, you want systems that can say: &ldquo;I referenced these cases, these waveform segments, these papers, these patient trajectories.&rdquo;
      </p>

      <p>
        This is the same philosophy behind patient trajectory graphs, dataset fingerprints, and ECG evidence fingerprints: <strong>data isn&apos;t just fuel for training models — it can be structured reference material during inference.</strong>
      </p>

      <h2>9. Closing Thoughts</h2>

      <p>
        Transformers will generally outperform pure semantic networks / pure sample databases — especially on high-dimensional, long-context, compositional generalization, and generative prediction tasks. Not because Transformers are magical, but because they learn representation spaces, distance metrics, abstract patterns, and compositional mechanisms.
      </p>

      <p>
        <strong>But:</strong> when tasks depend on specific facts, real cases, historical waveforms, and traceable evidence, sample databases have irreplaceable value. More data does make sample databases stronger — but only if similarity is correctly defined. And similarity definition often still requires a learned model.
      </p>

      <p>
        The most promising direction is the third path:
      </p>

      <div className="my-4 p-5 border border-accent/30 rounded-2xl bg-accent/5">
        <p className="text-center font-semibold text-zinc-900 mb-2">
          Model learns representation and patterns. Data provides external memory and evidence.
        </p>
        <p className="text-center font-mono text-sm text-zinc-600">
          current waveform → Transformer/encoder representation → retrieve similar historical waveforms → candidate future segments → model fusion/reranking/uncertainty estimation
        </p>
      </div>

      <p>
        This is more valuable — and more research-worthy — than either pure Transformers or pure sample databases alone. And the growing body of literature across language, time series, robotics, and medicine strongly supports this hybrid direction.
      </p>
    </>
  );
}

function ParametersOrRetrievalZh() {
  return (
    <>
      <p>
        有一个问题我反复在思考：<em>什么时候应该把数据&ldquo;压缩进模型参数&rdquo;来用，什么时候应该把数据作为&ldquo;外部样本库&rdquo;直接参与推理？</em>
      </p>
      <p>
        我的判断不是简单的二选一。Transformer 并非天然比显式样本库高级——在高维、组合性强、需要泛化的任务里，单纯样本库会非常吃亏；但在可检索、可比对、局部相似性强的任务里，样本库反而可能更可靠。最佳形态通常是混合：模型负责表示和推理，数据负责外部记忆和校准。
      </p>

      <h2>一、两种本质不同的&ldquo;记忆&rdquo;</h2>

      <h3>A. 模型：参数化记忆</h3>
      <p>
        训练完成后，数据不再以原始样本形式存在，而是被压缩到参数里：
      </p>
      <p className="text-center font-mono text-sm bg-zinc-50 py-3 rounded-lg">
        D → θ, ŷ = f<sub>θ</sub>(x)
      </p>
      <p>
        <strong>优势：</strong>能学到抽象规律；能在没见过的组合上泛化；推理速度快；可以把大量数据压缩成较小的参数结构；能学习隐含的相似性，而不是依赖人工定义的距离。
      </p>
      <p>
        <strong>劣势：</strong>具体样本细节可能丢失；更新知识成本高；难解释；容易把训练分布里的偏差也压缩进去。
      </p>

      <h3>B. 样本库 / 语义网：非参数化记忆</h3>
      <p>
        数据不被压缩，而是直接参与推理：
      </p>
      <p className="text-center font-mono text-sm bg-zinc-50 py-3 rounded-lg">
        ŷ = Aggregate(NearestNeighbors(x, D))
      </p>
      <p>
        <strong>优势：</strong>信息保真；可解释，能看到参考样本；新数据可以直接加入库；对事实、病例、波形模板、历史案例等任务很有用。
      </p>
      <p>
        <strong>劣势：</strong>高维空间里&ldquo;相似&rdquo;很难定义；检索成本高；对没见过的组合不擅长；容易停留在&ldquo;找相似案例&rdquo;，而不是&ldquo;理解生成机制&rdquo;。
      </p>
      <p>
        kNN-LM 这类工作已经证明，把神经语言模型和最近邻样本库结合，可以提升语言模型表现——用预训练 LM 的 embedding 空间找近邻，再把 kNN 分布和原 LM 分布插值。RAG 也是类似思想：预训练模型作为参数化记忆，外部文档索引作为非参数化记忆，用检索结果辅助生成。
      </p>

      <h2>二、数据量上去后，样本库会不会越来越好？</h2>
      <p>
        会，但有一个关键限制：<strong>维度灾难</strong>。
      </p>
      <p>
        在低维、结构清晰的任务里，样本库很好。输入是几个明确特征，距离函数容易定义，相似样本真的代表相似输出，任务主要是局部插值——这时数据量越大，最近邻方法会越来越强。
      </p>
      <p>
        但在语言、图像、波形这种高维任务里，问题变成：
      </p>
      <p className="text-center italic text-zinc-600">
        两个样本到底怎么算&ldquo;相似&rdquo;？
      </p>
      <p>
        比如语言：&ldquo;他没有不喜欢这部电影&rdquo;和&ldquo;他喜欢这部电影&rdquo;——表面 token 不一样，但语义相近。
      </p>
      <p>
        比如 ECG：两个片段可能 QRS 稍微偏移、幅度缩放、导联噪声不同、心率略变、病理形态相似但相位不同。用原始欧氏距离可能认为它们&ldquo;不像&rdquo;，但医学意义上它们可能很像。
      </p>
      <p>
        所以样本库变强的前提不是只有&ldquo;数据量大&rdquo;，还需要：
      </p>
      <p className="text-center font-mono text-sm bg-zinc-50 py-3 rounded-lg">
        好的表示空间 + 好的距离函数 + 足够覆盖的数据
      </p>
      <p>
        而这个&ldquo;好的表示空间&rdquo;往往又需要模型学习出来。这就是为什么纯样本库很少完全取代 Transformer——不是因为样本库思路错，而是因为<strong>高维数据里的相似性本身就需要学习</strong>。
      </p>

      <h2>三、语言预测：纯语义网能不能做？</h2>
      <p>
        可以做，但很难超过强 Transformer。
      </p>
      <p>
        语言预测不是简单查表。它需要同时处理：局部语法、长程依赖、语义一致性、世界知识、风格、上下文意图、多种可能 token 的概率分布。
      </p>
      <p>
        一个巨大样本库可以做：
      </p>
      <p className="text-center font-mono text-sm bg-zinc-50 py-3 rounded-lg">
        P(w<sub>t+1</sub> | context) ≈ 相似上下文里的下一个词分布
      </p>
      <p>
        如果库极大，很多短上下文都能找到相似案例。但问题是，长上下文几乎不可能完全重复。上下文越长，精确匹配越稀疏。所以纯样本库容易遇到：短上下文能匹配但信息不足；长上下文信息足但难匹配；抽象语义需要表示模型；组合推理样本库很难直接拼出来。
      </p>
      <p>
        Transformer 的优势在于它不是只找相似样本，而是学到一个压缩后的条件分布，相当于把大量语言样本压缩成一套可组合的生成机制。
      </p>

      <div className="my-6 overflow-x-auto">
        <table className="min-w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-zinc-200">
              <th className="text-left py-2 pr-4 font-semibold">方案</th>
              <th className="text-left py-2 font-semibold">适合什么</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-zinc-100">
              <td className="py-2 pr-4 font-medium">纯样本库</td>
              <td className="py-2">复述、引用、案例检索、相似问答、事实回放</td>
            </tr>
            <tr className="border-b border-zinc-100">
              <td className="py-2 pr-4 font-medium">纯 Transformer</td>
              <td className="py-2">生成、泛化、语言建模、组合语义</td>
            </tr>
            <tr className="border-b border-zinc-100">
              <td className="py-2 pr-4 font-medium">Transformer + 检索库</td>
              <td className="py-2">知识密集问答、医学问答、法律问答、科研助手、企业知识库</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>四、波形预测：Transformer vs 超大波形库</h2>
      <p>
        这个场景更贴近 ECG 的直觉：给定前一段波形，预测下一段波形形状——是用模型生成，还是从库中检索相似历史片段？
      </p>

      <h3>方案 A：Transformer 预测下一段波形</h3>
      <p>
        可以学习节律、形态、相位变化；适应噪声；生成没见过但合理的形态；建模长程依赖。但可能生成&ldquo;平均形态&rdquo;；细节可能不真实；可解释性弱；对分布外病理形态可能不稳。
      </p>

      <h3>方案 B：超大波形库做候选推荐</h3>
      <p>
        输出是真实历史波形片段；医学上更容易解释；可以展示相似病例；对模板化、周期性强的波形很有效。但相似性定义很难；相位、心率、幅度、导联差异会干扰检索；遇到罕见组合时可能找不到好邻居；预测容易变成&ldquo;历史案例拼接&rdquo;，不一定符合当前个体动力学。
      </p>

      <div className="my-6 overflow-x-auto">
        <table className="min-w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-zinc-200">
              <th className="text-left py-2 pr-4 font-semibold">场景</th>
              <th className="text-left py-2 font-semibold">更适合</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-zinc-100">
              <td className="py-2 pr-4">心律高度规则、重复性强</td>
              <td className="py-2">样本库 / 模板检索</td>
            </tr>
            <tr className="border-b border-zinc-100">
              <td className="py-2 pr-4">需要预测短期下一拍形态</td>
              <td className="py-2">样本库 + 局部变形可能很强</td>
            </tr>
            <tr className="border-b border-zinc-100">
              <td className="py-2 pr-4">需要预测趋势变化</td>
              <td className="py-2">Transformer / 状态空间模型更合适</td>
            </tr>
            <tr className="border-b border-zinc-100">
              <td className="py-2 pr-4">有大量个体历史数据</td>
              <td className="py-2">个体样本库很有价值</td>
            </tr>
            <tr className="border-b border-zinc-100">
              <td className="py-2 pr-4">跨人群泛化</td>
              <td className="py-2">模型更重要</td>
            </tr>
            <tr className="border-b border-zinc-100">
              <td className="py-2 pr-4">需要医学解释</td>
              <td className="py-2">样本库辅助更好</td>
            </tr>
            <tr className="border-b border-zinc-100">
              <td className="py-2 pr-4">需要处理罕见情况</td>
              <td className="py-2">混合方案最好</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p>
        最强的方案大概率不是二选一，而是：
      </p>
      <p className="text-center font-mono text-sm bg-zinc-50 py-3 rounded-lg">
        Transformer 表示当前状态 → 检索相似波形 → 模型重排序/融合/修正
      </p>
      <p>
        也就是：<strong>模型负责&ldquo;理解当前波形处于什么状态&rdquo;，样本库负责&ldquo;给出真实可参考的未来候选&rdquo;。</strong>
      </p>

      <h2>五、通用判断框架</h2>

      <div className="my-6 overflow-x-auto">
        <table className="min-w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-zinc-200">
              <th className="text-left py-2 pr-4 font-semibold">任务特征</th>
              <th className="text-left py-2 pr-4 font-semibold">训练进模型</th>
              <th className="text-left py-2 font-semibold">外部记忆直接推理</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-zinc-100">
              <td className="py-2 pr-4">需要泛化到新组合</td>
              <td className="py-2 pr-4 text-emerald-700 font-medium">强</td>
              <td className="py-2 text-zinc-400">弱</td>
            </tr>
            <tr className="border-b border-zinc-100">
              <td className="py-2 pr-4">输入维度很高</td>
              <td className="py-2 pr-4 text-emerald-700 font-medium">强（模型先降维）</td>
              <td className="py-2 text-zinc-400">弱（需要模型先降维）</td>
            </tr>
            <tr className="border-b border-zinc-100">
              <td className="py-2 pr-4">距离函数难定义</td>
              <td className="py-2 pr-4 text-emerald-700 font-medium">强</td>
              <td className="py-2 text-zinc-400">弱</td>
            </tr>
            <tr className="border-b border-zinc-100">
              <td className="py-2 pr-4">样本之间局部相似性很强</td>
              <td className="py-2 pr-4">可用</td>
              <td className="py-2 text-emerald-700 font-medium">强</td>
            </tr>
            <tr className="border-b border-zinc-100">
              <td className="py-2 pr-4">输出必须可解释、可追溯</td>
              <td className="py-2 pr-4 text-zinc-400">较弱</td>
              <td className="py-2 text-emerald-700 font-medium">强</td>
            </tr>
            <tr className="border-b border-zinc-100">
              <td className="py-2 pr-4">知识频繁更新</td>
              <td className="py-2 pr-4 text-zinc-400">较弱</td>
              <td className="py-2 text-emerald-700 font-medium">强</td>
            </tr>
            <tr className="border-b border-zinc-100">
              <td className="py-2 pr-4">数据规模大但标签稀缺</td>
              <td className="py-2 pr-4 text-emerald-700 font-medium">自监督模型强</td>
              <td className="py-2">检索也可用</td>
            </tr>
            <tr className="border-b border-zinc-100">
              <td className="py-2 pr-4">任务是事实查询</td>
              <td className="py-2 pr-4 text-zinc-400">不应只靠模型</td>
              <td className="py-2 text-emerald-700 font-medium">检索强</td>
            </tr>
            <tr className="border-b border-zinc-100">
              <td className="py-2 pr-4">任务是生成、预测、压缩</td>
              <td className="py-2 pr-4 text-emerald-700 font-medium">强</td>
              <td className="py-2">辅助</td>
            </tr>
            <tr className="border-b border-zinc-100">
              <td className="py-2 pr-4">分布持续变化</td>
              <td className="py-2 pr-4">需持续训练</td>
              <td className="py-2 text-emerald-700 font-medium">外部库更新更方便</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="text-center font-medium text-zinc-800">
        一句话总结：<em>当任务需要学习规律、压缩结构、处理未见组合时，数据应该用于训练模型；当任务需要保留事实、案例、证据、最近经验时，数据应该直接参与推理。</em>
      </p>

      <h2>六、三种范式</h2>

      <h3>范式一：模型主导</h3>
      <p className="text-center font-mono text-sm bg-zinc-50 py-3 rounded-lg">
        D → θ, x → f<sub>θ</sub>(x)
      </p>
      <p>
        数据只在训练阶段出现。纯 Transformer、CNN ECG 分类、ResNet 波形识别、普通监督学习。适合规律稳定、任务重复、需要快速推理的场景。
      </p>

      <h3>范式二：数据主导</h3>
      <p className="text-center font-mono text-sm bg-zinc-50 py-3 rounded-lg">
        x + D → ŷ
      </p>
      <p>
        模型很弱，只负责匹配、聚合、排序。kNN、case-based reasoning、相似病例检索、模板匹配、基于样本库的波形预测。适合相似样本高度可用、解释性重要、任务局部性强的场景。
      </p>

      <h3>范式三：模型-数据协同</h3>
      <p className="text-center font-mono text-sm bg-zinc-50 py-3 rounded-lg">
        x → z<sub>θ</sub>, z<sub>θ</sub> + D → ŷ
      </p>
      <p>
        模型先把输入映射到一个更好的表示空间，再用数据参与推理。RAG、kNN-LM、检索增强时间序列预测、embedding-based 相似病例检索、模型预测 + 样本库校准。这个通常是最现实、也最强的形态。
      </p>

      <h2>七、文献怎么说</h2>

      <p>
        近几年有不少研究已经把这个问题做成了比较明确的实验。以下是关键发现。
      </p>

      <h3>RAG vs Fine-Tuning：外部记忆在长尾知识上持续占优</h3>
      <p>
        2024–2026 年的多项研究——跨低频事实 QA、医学 QA、证据综合和结构化 EHR 预测——一致发现：在长尾实体、动态更新知识和依赖证据的任务上，RAG 显著超过 fine-tuning。EHR-RAG（2026）在四个长程临床预测任务上，通过检索相关结构化历史信息，平均 Macro-F1 比最强 LLM baseline 提升 <strong>10.76%</strong>。MedMeta（2026）也证明，Golden-RAG 在临床证据综合上显著超过纯参数化模型。
      </p>

      <h3>长上下文 LLM vs RAG：结论更复杂</h3>
      <p>
        有研究（EMNLP Industry 2024）显示，资源充足时长上下文 LLM 平均表现优于普通 RAG——但 RAG 成本明显更低。也有研究指出，超长上下文会让模型注意力被无关信息稀释，order-preserve RAG 能用更少 token 达到更高答案质量。核心启示：不是&ldquo;上下文越长越好&rdquo;，而是<strong>能不能把相关信息精准放到模型注意力中心</strong>——这正是外部记忆的优势所在。
      </p>

      <h3>时间序列与波形预测：检索在真正进步</h3>
      <p>
        RAFT（ICML 2025）通过检索训练集中相似 temporal pattern，在 10 个 benchmark 上取得 <strong>86% 的平均胜率</strong>。RAF 将其扩展到 Chronos/Moirai 等时序基础模型，发现更大的 TSFM 从检索中受益更多。RATD（NeurIPS 2024）把检索到的历史序列作为 diffusion denoising 参考。TimeRAG（2024）通过 DTW 检索相似参考序列，平均提升原模型预测准确率 2.97%。
      </p>
      <p>
        对 ECG 这类有局部模板、节律重复、个体差异、设备差异的信号，外部样本库不只是&ldquo;查找&rdquo;，而是可以作为<strong>条件先验</strong>或<strong>预测参考轨迹</strong>。
      </p>

      <h3>超越语言和时序</h3>
      <p>
        检索增强在多个领域都展现出增益：表格异常检测（CIKM 2024）、机器人操作与导航（CVPR 2024, 2025）、基于 decision transformer 的强化学习、图学习（NeurIPS 2024）。模式很一致：当任务需要具体实例、过往经验或结构化记忆时，外部检索优于纯参数化记忆。
      </p>

      <h2>八、深层原因：样本复杂度</h2>

      <p>
        样本库方法需要数据覆盖空间：<span className="font-mono text-sm">所需样本数 ~ O(ε<sup>−d</sup>)</span>，其中 <em>d</em> 是有效维度。维度越高，样本库越难覆盖空间。
      </p>

      <p>
        模型通过结构假设降低有效维度——注意力可以组合上下文，语义可以映射到连续空间，许多模式可以共享参数。模型把问题从&ldquo;记住所有情况&rdquo;变成&ldquo;学习生成这些情况的规律&rdquo;。
      </p>

      <p>
        但模型有一个样本库难以替代的弱点：<strong>具体性</strong>。模型学到的是压缩规律，样本库保留的是具体证据。在医学、科研、法律、金融这些场景里，你希望系统回答时能说：&ldquo;我参考了哪些病例、哪些波形片段、哪些文献、哪些患者轨迹。&rdquo;
      </p>

      <p>
        这和你之前做的&ldquo;患者轨迹图&rdquo;&ldquo;数据集指纹&rdquo;&ldquo;ECG evidence fingerprint&rdquo;其实是同一个思想：<strong>数据不只是拿来训练模型的燃料，也可以作为推理过程中的结构化参照物。</strong>
      </p>

      <h2>九、最终判断</h2>

      <p>
        Transformer 通常会比纯语义网 / 纯样本库强，尤其是在高维、长上下文、组合泛化、生成预测任务里。原因不是 Transformer 神秘，而是它学到了表示空间、距离度量、抽象规律和组合机制。
      </p>

      <p>
        <strong>但是：</strong>当任务依赖具体事实、真实案例、历史波形、可追溯证据时，样本库会有模型参数无法替代的价值。数据量越大，样本库确实会变强，但前提是相似性定义正确；而相似性定义往往仍然需要模型来学习。
      </p>

      <p>
        最值得探索的是第三种路线：
      </p>

      <div className="my-4 p-5 border border-accent/30 rounded-2xl bg-accent/5">
        <p className="text-center font-semibold text-zinc-900 mb-2">
          模型学习表示与规律，数据提供外部记忆与证据。
        </p>
        <p className="text-center font-mono text-sm text-zinc-600">
          当前波形 → Transformer/encoder 表示 → 检索相似历史波形 → 候选未来片段 → 模型融合/重排序/不确定性估计
        </p>
      </div>

      <p>
        这比单纯 Transformer 或单纯样本库都更有研究价值。而且跨语言、时序、机器人和医学等领域的越来越多文献，正在为这种混合方向提供强有力的支撑。
      </p>
    </>
  );
}
