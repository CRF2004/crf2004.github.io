import { use } from "react";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CV",
};

export default function CVPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("cv");

  return (
    <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-3xl font-bold text-zinc-900">{t("title")}</h1>
        <a
          href="/cv/cheng-rongfeng-cv.pdf"
          download
          className="px-5 py-2.5 bg-accent text-white rounded-xl text-sm font-medium hover:bg-accent-dark transition-colors"
        >
          {t("download")}
        </a>
      </div>

      {/* Education */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold text-zinc-900 mb-3 uppercase tracking-wider">
          {t("education")}
        </h2>
        <div className="p-5 rounded-xl border border-zinc-200">
          <p className="font-medium text-zinc-900">{t("education_detail")}</p>
          <p className="text-sm text-zinc-500 mt-1">{t("education_gpa")}</p>
        </div>
      </section>

      {/* Core Courses */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold text-zinc-900 mb-3 uppercase tracking-wider">
          {t("core_courses")}
        </h2>
        <p className="text-sm text-zinc-600 leading-relaxed">
          {t("courses_list")}
        </p>
      </section>

      {/* Skills */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold text-zinc-900 mb-3 uppercase tracking-wider">
          Skills
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            {
              cat: "Programming",
              items: "Python, Java, TypeScript, SQL",
            },
            {
              cat: "AI / ML",
              items: "PyTorch, XGBoost, LLM Fine-tuning, Prompt Engineering, RAG",
            },
            {
              cat: "Web & Tools",
              items: "React, Next.js, Flask, Neo4j, Git, Docker",
            },
            {
              cat: "Domain",
              items: "Knowledge Graphs, Data Analysis, AI Workflow Design",
            },
          ].map(({ cat, items }) => (
            <div key={cat} className="p-4 rounded-xl bg-zinc-50 border border-zinc-200">
              <h3 className="text-sm font-semibold text-zinc-900 mb-1">
                {cat}
              </h3>
              <p className="text-sm text-zinc-600">{items}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Awards */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold text-zinc-900 mb-3 uppercase tracking-wider">
          {t("awards")}
        </h2>
        <ul className="space-y-2">
          <li className="text-sm text-zinc-600 flex items-start gap-2">
            <span className="text-accent mt-1">•</span>
            {t("award_1")}
          </li>
          <li className="text-sm text-zinc-600 flex items-start gap-2">
            <span className="text-accent mt-1">•</span>
            {t("award_2")}
          </li>
          <li className="text-sm text-zinc-600 flex items-start gap-2">
            <span className="text-accent mt-1">•</span>
            {t("award_3")}
          </li>
        </ul>
      </section>

      {/* Certificates */}
      <section>
        <h2 className="text-lg font-semibold text-zinc-900 mb-3 uppercase tracking-wider">
          {t("certificates")}
        </h2>
        <div className="flex flex-wrap gap-4">
          <span className="px-4 py-2 rounded-xl bg-zinc-50 border border-zinc-200 text-sm text-zinc-700">
            {t("cet6")}
          </span>
          <span className="px-4 py-2 rounded-xl bg-zinc-50 border border-zinc-200 text-sm text-zinc-700">
            {t("ielts")}
          </span>
        </div>
      </section>
    </div>
  );
}
