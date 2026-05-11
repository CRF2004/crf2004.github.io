import { use } from "react";
import Link from "next/link";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
};

interface BlogPost {
  slug: string;
  title: { en: string; zh: string };
  date: string;
  excerpt: { en: string; zh: string };
  readTime: number;
}

const posts: BlogPost[] = [
  {
    slug: "why-interpretable-medical-ai",
    title: {
      en: "Why I'm Building Medical AI That Explains Itself",
      zh: "为什么我在构建能自我解释的医疗AI",
    },
    date: "2026-05-01",
    excerpt: {
      en: "Black-box models have no place in clinical decision support. Here's why interpretability matters in medicine and how knowledge graphs can bridge the gap.",
      zh: "黑箱模型在临床决策支持中没有立足之地。本文探讨可解释性在医学中的重要性，以及知识图谱如何弥合这一鸿沟。",
    },
    readTime: 5,
  },
  {
    slug: "kg-llm-hospital-lessons",
    title: {
      en: "Lessons from Deploying KG+LLM Pipelines in a Hospital",
      zh: "在医院部署KG+LLM管线的经验教训",
    },
    date: "2026-04-15",
    excerpt: {
      en: "Real clinical data is messy, inconsistent, and fragmented across formats. Here's what I learned processing 8,000 cardiovascular case PDFs and building a hybrid RAG system.",
      zh: "真实的临床数据是混乱、不一致且格式各异的。本文分享我处理8000份心血管病例PDF并构建混合RAG系统时学到的经验。",
    },
    readTime: 7,
  },
  {
    slug: "building-viora",
    title: {
      en: "Building Viora: Rethinking Health Tracking as a Conversation",
      zh: "构建Viora：将健康追踪重新想象为对话",
    },
    date: "2026-03-20",
    excerpt: {
      en: "Why I built a proactive AI health companion that checks in on you like a friend, not a form. The design philosophy behind Viora and what I learned about human-AI interaction.",
      zh: "为什么我构建了一个像朋友一样关心你、而非填表的主动式AI健康搭子。Viora背后的设计哲学，以及我对人机交互的思考。",
    },
    readTime: 6,
  },
];

export default function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);

  return (
    <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
      <h1 className="text-3xl font-bold text-zinc-900 mb-3">Blog</h1>
      <p className="text-lg text-zinc-500 mb-10">
        {locale === "en"
          ? "Thoughts on AI, healthcare, and building things that matter."
          : "关于AI、医疗健康与构建有意义之物的思考。"}
      </p>

      <div className="space-y-8">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/${locale}/blog/${post.slug}`}
            className="block group"
          >
            <article className="p-6 rounded-2xl border border-zinc-200 hover:border-accent/30 hover:shadow-md transition-all duration-300">
              <div className="flex items-center gap-3 text-sm text-zinc-400 mb-2">
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString(
                    locale === "en" ? "en-US" : "zh-CN",
                    { year: "numeric", month: "long", day: "numeric" }
                  )}
                </time>
                <span>·</span>
                <span>
                  {post.readTime}{" "}
                  {locale === "en" ? "min read" : "分钟阅读"}
                </span>
              </div>
              <h2 className="text-xl font-semibold text-zinc-900 group-hover:text-accent transition-colors mb-2">
                {post.title[locale as "en" | "zh"]}
              </h2>
              <p className="text-sm text-zinc-600 leading-relaxed">
                {post.excerpt[locale as "en" | "zh"]}
              </p>
              <span className="inline-block mt-3 text-sm font-medium text-accent">
                {locale === "en" ? "Read more →" : "阅读更多 →"}
              </span>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
