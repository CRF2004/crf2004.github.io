import { use } from "react";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("about");

  const skills = [
    "Python", "Java", "TypeScript", "React", "Next.js",
    "PyTorch", "XGBoost", "Neo4j", "Flask",
    "LLM Fine-tuning", "Prompt Engineering", "RAG",
    "Knowledge Graphs", "Data Analysis",
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
      <h1 className="text-3xl font-bold text-zinc-900 mb-8">{t("title")}</h1>

      <div className="grid md:grid-cols-3 gap-10">
        {/* Bio */}
        <div className="md:col-span-2 space-y-5">
          <p className="text-zinc-600 leading-relaxed">{t("bio_p1")}</p>
          <p className="text-zinc-600 leading-relaxed">{t("bio_p2")}</p>
          <p className="text-zinc-600 leading-relaxed">{t("bio_p3")}</p>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Research Interests */}
          <div>
            <h3 className="text-sm font-semibold text-zinc-900 uppercase tracking-wider mb-3">
              {t("research_interests")}
            </h3>
            <ul className="space-y-2">
              {["ri_1", "ri_2", "ri_3", "ri_4"].map((key) => (
                <li
                  key={key}
                  className="text-sm text-zinc-600 flex items-start gap-2"
                >
                  <span className="text-accent mt-1">•</span>
                  {t(key)}
                </li>
              ))}
            </ul>
          </div>

          {/* Skills */}
          <div>
            <h3 className="text-sm font-semibold text-zinc-900 uppercase tracking-wider mb-3">
              {t("skills")}
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((s) => (
                <span
                  key={s}
                  className="px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-600 text-xs font-medium"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div>
            <h3 className="text-sm font-semibold text-zinc-900 uppercase tracking-wider mb-3">
              {t("languages")}
            </h3>
            <ul className="space-y-1 text-sm text-zinc-600">
              <li>{t("lang_zh")}</li>
              <li>{t("lang_en")}</li>
              <li>{t("lang_cantonese")}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
