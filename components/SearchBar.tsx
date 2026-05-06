"use client";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="API, provider veya araç ara..."
      className="w-full rounded-xl border border-black/10 bg-white px-5 py-4 text-[#2b2b2b] shadow-sm outline-none placeholder:text-[#2b2b2b]/40 focus:border-[#c46a3a] focus:ring-4 focus:ring-[#c46a3a]/10"
    />
  );
}