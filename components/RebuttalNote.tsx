const promptZh = `请查看论文返修仓库：[仓库链接]。

先以审稿人的视角阅读初稿，理解每条审稿意见真正关心的问题，再结合修订稿、当前 response letter 和仓库中的审稿回复规范（如有），客观评估现有回复。不要只润色英语，也不要默认作者的解释成立。

请重点检查：
1. 每条意见是否被正面回答？回复、修订稿、实验结果是否一致？请给出文件位置作为依据，无法核实的内容明确标注。
2. 审稿人指出的错误，是否直接承认，并说明如何修正、影响多大、在何处修改？
3. 对返修复现中新发现的不一致，区分其影响：是否改变结果、方法解释或结论？需要说明的实质变化不能省略；不影响理解的排查细节，是否不必在回复中反复强调？
4. 从审稿人的阅读顺序、已有预判和合理期待出发，检查信息安排：哪些结论应先说，哪些证据随后给，哪些背景适合放到补充材料？避免让直接答案淹没在解释中。
5. 找出过度承诺、答非所问、防御性措辞，以及可能引出额外疑问却没有证据支撑的表述。

请按重要性列出问题，区分事实错误、证据缺口和表达策略。对关键段落给出可直接替换的版本，并解释调整理由。不要编造实验或把尚未完成的工作写成已完成。`;

const promptEn = `Review the paper revision repository: [repository URL].

First read the original manuscript as a reviewer and identify the concern behind each review comment. Then assess the current response letter against the revised manuscript, experimental results, and any response-writing guidelines in the repository. Go beyond English editing; do not assume the authors' explanations are correct.

Check the following:
1. Does each response directly address the concern? Are the letter, manuscript, and results consistent? Cite file locations and explicitly flag anything you cannot verify.
2. Where reviewers identified an error, does the response acknowledge it directly and explain the correction, its impact, and where the manuscript changed?
3. For inconsistencies discovered during reproduction, distinguish their consequences. Do they change results, the interpretation of methods, or conclusions? Explain material changes; consider whether debugging details that do not affect understanding need repeated emphasis in the letter.
4. Account for reading order, prior expectations, and reasonable reviewer concerns. What answer should come first, what evidence should follow, and what background belongs in supplementary material? Keep the direct answer easy to find.
5. Identify overpromising, evasive answers, defensive language, and statements that invite new questions without supporting evidence.

Prioritize your findings and separate factual errors, evidence gaps, and communication choices. Provide replacement text for key passages and explain the revisions. Do not invent experiments or describe unfinished work as complete.`;

export default function RebuttalNote({ locale }: { locale: "en" | "zh" }) {
  if (locale === "zh") return (
    <>
      <p>最近在整理论文返修时，我写了一个 prompt：让 AI 先读初稿和审稿意见，再站在审稿人的位置检查已经写好的回复。写完觉得，这个提问方式值得单独留一条 note。</p>
      <p>我的出发点很简单：response letter 的读者是人。读者会按顺序阅读，带着对原稿的印象、对问题的预判，以及对答案的期待。回复里包含了正确的信息，还不等于读者能顺利找到答案。</p>
      <h2>先检查是否答到了问题，再考虑怎么说</h2>
      <p>我希望 AI 先理解审稿人为什么问这个问题：是在怀疑方法是否成立、证据是否充分，还是原文没有说清楚？如果只把现有回复润色得更流畅，可能只是把一个没有答到点上的段落写得更长。</p>
      <p>在这个基础上，才值得讨论策略：先说什么、再说什么，解释到什么程度，哪些内容应留在正文或补充材料。对审稿人指出的错误，直接承认，然后说明修正、影响和修改位置，通常比先铺陈一大段背景更清楚。</p>
      <h2>返修过程的细节，需要讲到哪一步？</h2>
      <p>我尤其想让 AI 帮忙判断一个边界：如果返修复现时发现了审稿人没有指出的不一致，是否有必要把整个发现和排查过程都放进 response letter？</p>
      <p>我的判断标准是它对论文的影响。如果它改变了报告结果、方法解释或结论，就需要清楚说明修正及其影响，不能因为审稿人没问就略过。如果只是已经解决、也不影响论证的排查细节，则可以考虑放在修订记录或补充说明里，而不必让它占据回复的中心。是否需要披露和是否需要反复强调，是两个不同的问题。</p>
      <h2>我会复用的 prompt</h2>
      <p>下面是整理后的版本。实际使用时，我会把仓库链接、初稿、审稿意见、修订稿和当前回复一起提供，让评估能落到具体证据上。</p>
      <pre className="whitespace-pre-wrap break-words text-sm">{promptZh}</pre>
      <h2>把回复组织成一条能跟上的思路</h2>
      <p>我倾向于让每条回复先给直接答案，再给关键证据，最后指出具体修改位置。必要的限制紧跟相关结论说明。这样审稿人不必先读完一段实验史，才知道自己的问题有没有被解决。</p>
      <p>这条 note 记录的是一个检查返修回复的提问方式，不是对某篇论文的审稿结论。AI 的建议仍需要作者逐项核实，尤其是实验事实、修改位置和结论边界。</p>
      <p>这次提问的背景：<a href="https://github.com/CRF2004/jbhi_ECG_audit_revision">JBHI ECG evidence-audit revision 仓库</a>。</p>
    </>
  );
  return (
    <>
      <p>While working on a paper revision, I wrote a prompt asking AI to read the original manuscript and reviewer comments, then examine the response letter from the reviewer’s perspective. The framing felt useful enough to save as a short note.</p>
      <p>A response letter has a human reader. Reviewers read in sequence, carrying an impression of the original paper, an expectation about what went wrong, and a reasonable idea of what an answer should contain. Including the right information does not automatically make that answer easy to find.</p>
      <h2>Check the answer before polishing the wording</h2>
      <p>I want AI to identify the concern behind each comment first. Is the reviewer questioning the method, the strength of the evidence, or the clarity of the manuscript? Polishing an existing paragraph can otherwise turn an unanswered question into a longer unanswered question.</p>
      <p>Then communication choices become useful: what to say first, how much explanation is needed, and what belongs in the manuscript or supplementary material. When a reviewer identifies an error, acknowledging it directly and explaining the correction, impact, and location usually makes the response easier to follow.</p>
      <h2>How much of the revision process belongs in the letter?</h2>
      <p>One boundary I want help examining is whether an inconsistency discovered during reproduction, but not raised by a reviewer, needs its entire discovery and debugging history in the response letter.</p>
      <p>My criterion is its effect on the paper. If it changes reported results, the interpretation of methods, or conclusions, the correction and its consequences need a clear explanation, even if nobody asked. Resolved debugging details that do not affect the argument may fit better in revision records or supplementary notes than at the center of the response. Whether something needs disclosure and whether it needs repeated emphasis are separate questions.</p>
      <h2>A prompt I would reuse</h2>
      <p>This is an edited version of the prompt. In practice, I would supply the repository, original manuscript, reviewer comments, revised manuscript, and current response letter so that the assessment can refer to concrete evidence.</p>
      <pre className="whitespace-pre-wrap break-words text-sm">{promptEn}</pre>
      <h2>Give the reader a sequence they can follow</h2>
      <p>My preferred starting point for each response is a direct answer, followed by the key evidence and the precise location of the revision. Any necessary limitation should sit beside the claim it qualifies. The reviewer should not have to read an experiment’s entire history to discover whether their concern has been addressed.</p>
      <p>This note records a way of asking for a critical review of a response letter; it does not report a completed review of a particular paper. Authors still need to verify every suggestion, especially experimental facts, revision locations, and the scope of conclusions.</p>
      <p>Context for the original prompt: the <a href="https://github.com/CRF2004/jbhi_ECG_audit_revision">JBHI ECG evidence-audit revision repository</a>.</p>
    </>
  );
}
