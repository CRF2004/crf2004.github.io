import { useTranslations } from "next-intl";
import Link from "next/link";

export default function Footer({ locale }: { locale: string }) {
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-300">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-base font-medium text-white">Rongfeng Cheng</p>
          <p className="mt-1 text-sm text-slate-400">Medical AI · ECG · Clinical Systems</p>
          <p className="mt-4 text-xs text-slate-500">&copy; {new Date().getFullYear()} {t("rights")}</p>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href={`/${locale}/contact`}
            className="text-sm hover:text-sky-300 transition-colors"
          >
            Email
          </Link>
          <a
            href="https://github.com/CRF2004"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm hover:text-sky-300 transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
