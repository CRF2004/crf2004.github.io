interface TimelineItem {
  title: string;
  role: string;
  period: string;
  descriptions: string[];
}

export default function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <div className="relative">
      <div className="absolute left-4 top-0 bottom-0 w-px bg-zinc-200" />
      <div className="space-y-10">
        {items.map((item) => (
          <div key={item.title} className="relative pl-12">
            <div className="absolute left-2.5 top-1.5 w-3 h-3 rounded-full border-2 border-accent bg-white" />
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-2">
              <h3 className="text-lg font-semibold text-zinc-900">
                {item.title}
              </h3>
              <span className="text-sm font-medium text-accent whitespace-nowrap">
                {item.period}
              </span>
            </div>
            <p className="text-sm font-medium text-zinc-500 mb-2">{item.role}</p>
            <ul className="space-y-1">
              {item.descriptions.map((desc, i) => (
                <li
                  key={i}
                  className="text-sm text-zinc-600 leading-relaxed before:content-['—'] before:mr-2 before:text-zinc-400"
                >
                  {desc}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
