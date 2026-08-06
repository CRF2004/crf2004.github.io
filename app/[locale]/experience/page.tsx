import { use } from "react";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import Timeline from "@/components/Timeline";

export const metadata: Metadata = {
  title: "Experience",
};

export default function ExperiencePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("experience");

  const researchItems = [
    {
      title: t("ecg_audit.title"),
      role: t("ecg_audit.role"),
      period: t("ecg_audit.period"),
      descriptions: [t("ecg_audit.desc_1"), t("ecg_audit.desc_2")],
    },
    {
      title: t("dlef.title"),
      role: t("dlef.role"),
      period: t("dlef.period"),
      descriptions: [t("dlef.desc_1"), t("dlef.desc_2")],
    },
    {
      title: t("pathclip.title"),
      role: t("pathclip.role"),
      period: t("pathclip.period"),
      descriptions: [t("pathclip.desc_1"), t("pathclip.desc_2")],
    },
  ];

  const otherItems = [
    {
      title: t("hospital.title"),
      role: t("hospital.role"),
      period: t("hospital.period"),
      descriptions: [t("hospital.desc_1"), t("hospital.desc_2")],
    },
    {
      title: t("startup.title"),
      role: t("startup.role"),
      period: t("startup.period"),
      descriptions: [t("startup.desc_1")],
    },
    {
      title: t("bigdata_assoc.title"),
      role: t("bigdata_assoc.role"),
      period: t("bigdata_assoc.period"),
      descriptions: [t("bigdata_assoc.desc_1")],
    },
    {
      title: t("student_union.title"),
      role: t("student_union.role"),
      period: t("student_union.period"),
      descriptions: [t("student_union.desc_1")],
    },
  ];

  return (
    <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
      <h1 className="text-3xl font-bold text-zinc-900 mb-10">{t("title")}</h1>

      <section className="mb-14">
        <h2 className="text-lg font-semibold text-zinc-900 mb-6 uppercase tracking-wider">
          {t("research_title")}
        </h2>
        <Timeline items={researchItems} />
      </section>

      <section>
        <h2 className="text-lg font-semibold text-zinc-900 mb-6 uppercase tracking-wider">
          {t("other_title")}
        </h2>
        <Timeline items={otherItems} />
      </section>
    </div>
  );
}
