import { use } from "react";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "CV",
};

const coauthoredPapers = [
  {
    key: "coauth_1",
    doi: "https://doi.org/10.1016/j.isci.2026.115073",
  },
  {
    key: "coauth_2",
    doi: "https://doi.org/10.1145/3795892.3795917",
  },
  {
    key: "coauth_3",
    doi: "https://doi.org/10.1145/3795892.3795918",
  },
] as const;

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

      {/* Research Publications */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold text-zinc-900 mb-3 uppercase tracking-wider">
          {t("research")}
        </h2>
        <div className="space-y-4">
          {/* Featured: First-Author Paper (JBHI) */}
          <div className="p-5 rounded-xl border-2 border-accent/20 bg-accent/[0.02]">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-xs font-medium text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                {t("pub_under_review")}
              </span>
              <span className="text-xs font-medium text-accent bg-accent/10 px-2 py-0.5 rounded-full">
                {t("pub_jbhi_role")}
              </span>
            </div>
            <h3 className="text-sm font-semibold text-zinc-900 leading-snug">
              {t("pub_jbhi_title")}
            </h3>
            <p className="text-xs text-zinc-500 mt-1">{t("pub_jbhi_venue")}</p>
            <p className="text-sm text-zinc-600 mt-2 leading-relaxed">
              {t("pub_jbhi_desc")}
            </p>
          </div>

          {/* Co-Authored Publications */}
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
                    <a
                      href={paper.doi}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-0.5 text-zinc-400 hover:text-accent transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
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

      {/* Patents & IP */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold text-zinc-900 mb-3 uppercase tracking-wider">
          {t("patents")}
        </h2>
        <div className="space-y-3">
          {/* Patents */}
          <div className="p-4 rounded-xl border border-zinc-200">
            <span className="text-xs font-semibold text-accent bg-accent/10 px-2 py-0.5 rounded-full mb-2 inline-block">
              {t("patent_label")}
            </span>
            <p className="text-sm text-zinc-700 mt-1.5">{t("ip_patent_1")}</p>
            <p className="text-xs text-zinc-400 mt-1">{t("ip_patent_2")}</p>
          </div>
          {/* Software Copyrights */}
          <div className="p-4 rounded-xl border border-zinc-200">
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full mb-2 inline-block">
              {t("copyright_label")}
            </span>
            <ul className="mt-1.5 space-y-1">
              <li className="text-sm text-zinc-700 flex items-start gap-2">
                <span className="text-emerald-500 mt-1.5">•</span>
                {t("ip_copyright_1")}
              </li>
              <li className="text-sm text-zinc-700 flex items-start gap-2">
                <span className="text-emerald-500 mt-1.5">•</span>
                {t("ip_copyright_2")}
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold text-zinc-900 mb-3 uppercase tracking-wider">
          {t("awards")}
        </h2>
        <ul className="space-y-2">
          {(["award_1", "award_2", "award_3", "award_4", "award_5"] as const).map(
            (key) => (
              <li key={key} className="text-sm text-zinc-600 flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                {t(key)}
              </li>
            )
          )}
        </ul>
      </section>

      {/* Language */}
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
