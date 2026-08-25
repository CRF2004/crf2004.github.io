"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";

const navItems = [
  "home",
  "about",
  "projects",
  "experience",
  "publications",
  "blog",
  "cv",
] as const;

export default function Nav({ locale }: { locale: string }) {
  const t = useTranslations("nav");
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          href={`/${locale}`}
          className="group flex items-center gap-2.5 text-sm font-semibold tracking-tight text-slate-950"
        >
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-slate-950 font-mono text-[11px] text-white transition group-hover:bg-sky-800">RC</span>
          <span className="hidden lg:block">Rongfeng Cheng</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const href = `/${locale}${item === "home" ? "" : `/${item}`}`;
            const isActive =
              item === "home"
                ? pathname === `/${locale}` || pathname === `/${locale}/`
                : pathname.startsWith(`/${locale}/${item}`);
            return (
              <Link
                key={item}
                href={href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-sky-50 text-sky-800"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                {t(item)}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <LanguageSwitcher locale={locale} />
          <Link
            href={`/${locale}/contact`}
            className="hidden rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-sky-800 sm:inline-flex"
          >
            {t("contact")}
          </Link>
        </div>
      </nav>
      <div className="no-scrollbar flex gap-1 overflow-x-auto border-t border-slate-100 px-4 py-2 md:hidden">
        {navItems.map((item) => {
          const href = `/${locale}${item === "home" ? "" : `/${item}`}`;
          const isActive = item === "home" ? pathname === `/${locale}` || pathname === `/${locale}/` : pathname.startsWith(`/${locale}/${item}`);
          return <Link key={item} href={href} className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium ${isActive ? "bg-sky-100 text-sky-800" : "text-slate-500"}`}>{t(item)}</Link>;
        })}
      </div>
    </header>
  );
}
