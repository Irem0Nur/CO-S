"use client";

import { Category, categories } from "@/data/providers";

interface Props {
  active: Category | "all";
  onChange: (c: Category | "all") => void;
  counts: Record<string, number>;
}

export default function CategoryFilter({ active, onChange, counts }: Props) {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      <button
        onClick={() => onChange("all")}
        className={`rounded-xl border px-4 py-2 text-sm font-medium transition ${
          active === "all"
            ? "border-[#c46a3a] bg-[#c46a3a] text-white shadow-md"
            : "border-black/10 bg-white text-[#2b2b2b]/70 hover:border-[#c46a3a]/40 hover:text-[#c46a3a]"
        }`}
      >
        🌐 Tümü{" "}
        <span className="ml-1 rounded-full bg-black/10 px-2 py-0.5 text-xs">
          {counts.all}
        </span>
      </button>

      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onChange(cat.id)}
          className={`rounded-xl border px-4 py-2 text-sm font-medium transition ${
            active === cat.id
              ? "border-[#c46a3a] bg-[#c46a3a] text-white shadow-md"
              : "border-black/10 bg-white text-[#2b2b2b]/70 hover:border-[#c46a3a]/40 hover:text-[#c46a3a]"
          }`}
        >
          {cat.emoji} {cat.label}
          <span className="ml-1 rounded-full bg-black/10 px-2 py-0.5 text-xs">
            {counts[cat.id]}
          </span>
        </button>
      ))}
    </div>
  );
}