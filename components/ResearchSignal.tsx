export default function ResearchSignal({ locale }: { locale: string }) {
  const zh = locale === "zh";

  return (
    <div className="signal-panel relative overflow-hidden rounded-[2rem] border border-sky-200/70 bg-slate-950 p-6 text-white shadow-2xl shadow-sky-950/20">
      <div className="signal-grid absolute inset-0 opacity-50" />
      <div className="relative flex items-center justify-between text-[11px] font-medium uppercase tracking-[0.2em] text-sky-200/70">
        <span>{zh ? "证据链路" : "Evidence path"}</span>
        <span className="flex items-center gap-2 normal-case tracking-normal text-emerald-300">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_12px_#6ee7b7]" />
          {zh ? "研究进行中" : "Active research"}
        </span>
      </div>

      <svg viewBox="0 0 640 210" className="relative mt-8 w-full" aria-label="ECG evidence signal">
        <defs>
          <linearGradient id="signal" x1="0" x2="1">
            <stop offset="0" stopColor="#38bdf8" stopOpacity="0" />
            <stop offset="0.18" stopColor="#38bdf8" />
            <stop offset="0.65" stopColor="#67e8f9" />
            <stop offset="1" stopColor="#818cf8" stopOpacity="0" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <path d="M0 116 H86 L102 109 L114 122 L129 115 H173 L187 88 L202 145 L218 28 L237 175 L254 113 H326 L342 103 L354 122 L368 115 H421 L435 91 L450 142 L465 42 L482 165 L500 114 H640" fill="none" stroke="url(#signal)" strokeWidth="3" filter="url(#glow)" />
        {[218, 465].map((x) => <circle key={x} cx={x} cy={x === 218 ? 28 : 42} r="5" fill="#a5f3fc" />)}
      </svg>

      <div className="relative grid grid-cols-3 gap-2">
        {[
          [zh ? "临床证据" : "Clinical evidence", "01"],
          [zh ? "跨库迁移" : "Dataset shift", "02"],
          [zh ? "模型行为" : "Model behavior", "03"],
        ].map(([label, n]) => (
          <div key={n} className="rounded-xl border border-white/10 bg-white/[0.06] p-3 backdrop-blur-sm">
            <span className="font-mono text-[10px] text-sky-300">{n}</span>
            <p className="mt-1 text-xs font-medium text-slate-200">{label}</p>
          </div>
        ))}
      </div>

      <div className="relative mt-5 flex flex-wrap gap-2 text-[11px] text-slate-300">
        <span className="rounded-full border border-white/10 px-3 py-1">ECG</span>
        <span className="rounded-full border border-white/10 px-3 py-1">Evidence auditing</span>
        <span className="rounded-full border border-white/10 px-3 py-1">Multimodal learning</span>
      </div>
    </div>
  );
}
