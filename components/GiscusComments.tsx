"use client";

import { useEffect, useRef } from "react";

export default function GiscusComments() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Prevent duplicate script injection
    if (ref.current?.querySelector("iframe")) return;

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    script.setAttribute("data-repo", "CRF2004/crf2004.github.io");
    script.setAttribute("data-repo-id", "R_kgDOLekgvQ");
    script.setAttribute("data-category", "General");
    script.setAttribute("data-category-id", "DIC_kwDOLekgvc4C_iTk");
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "top");
    script.setAttribute("data-theme", "light");
    script.setAttribute("data-lang", "en");
    script.setAttribute("loading", "lazy");

    ref.current?.appendChild(script);

    return () => {
      // Cleanup on unmount
      const giscusFrame = ref.current?.querySelector("iframe");
      if (giscusFrame) {
        giscusFrame.remove();
      }
      script.remove();
    };
  }, []);

  return (
    <div className="mt-16 pt-10 border-t border-zinc-200">
      <h2 className="text-lg font-semibold text-zinc-900 mb-6">Comments</h2>
      <div ref={ref} className="giscus" />
    </div>
  );
}
