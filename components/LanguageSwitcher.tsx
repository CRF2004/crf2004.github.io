"use client";

import { usePathname, useRouter } from "next/navigation";

export default function LanguageSwitcher({ locale }: { locale: string }) {
  const pathname = usePathname();
  const router = useRouter();

  const switchTo = locale === "en" ? "zh" : "en";
  const label = locale === "en" ? "中文" : "EN";

  function toggle() {
    const newPath = pathname.replace(`/${locale}`, `/${switchTo}`);
    router.push(newPath);
  }

  return (
    <button
      onClick={toggle}
      className="px-2.5 py-1.5 rounded-lg text-sm font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 transition-colors"
    >
      {label}
    </button>
  );
}
