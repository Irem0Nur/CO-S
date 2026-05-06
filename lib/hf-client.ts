export const HF_MODELS: Record<string, { id: string; label: string; badge: string; color: string }> = {
  "mistral-7b": {
    id: "mistralai/Mistral-7B-Instruct-v0.3",
    label: "Mistral 7B Instruct",
    badge: "Genel",
    color: "text-purple-400",
  },
  "llama-3-8b": {
    id: "meta-llama/Meta-Llama-3-8B-Instruct",
    label: "Llama 3 8B Instruct",
    badge: "Meta",
    color: "text-blue-400",
  },
  "zephyr-7b": {
    id: "HuggingFaceH4/zephyr-7b-beta",
    label: "Zephyr 7B Beta",
    badge: "HuggingFace",
    color: "text-yellow-400",
  },
  "qwen2-7b": {
    id: "Qwen/Qwen2.5-7B-Instruct",
    label: "Qwen 2.5 7B",
    badge: "Alibaba",
    color: "text-emerald-400",
  },
  "deepseek-coder": {
    id: "deepseek-ai/DeepSeek-Coder-V2-Lite-Instruct",
    label: "DeepSeek Coder V2",
    badge: "Kodlama",
    color: "text-cyan-400",
  },
};

// Server-only: key rotation
let keyIndex = 0;

export function getNextKey(): string {
  const keys = [
    process.env.HF_KEY_1,
    process.env.HF_KEY_2,
    process.env.HF_KEY_3,
  ].filter(Boolean) as string[];

  if (keys.length === 0) throw new Error("En az bir HF_KEY tanımlı olmalı");

  const key = keys[keyIndex % keys.length];
  keyIndex = (keyIndex + 1) % keys.length;
  return key;
}
