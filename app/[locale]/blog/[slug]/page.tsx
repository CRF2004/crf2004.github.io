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
