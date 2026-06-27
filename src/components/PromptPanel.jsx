import { Sparkles } from "lucide-react";

export function PromptPanel({ copiedPrompt, onCopyPrompt }) {
  const promptPlatforms = ["Midjourney", "ChatGPT Image", "Flux", "Stable Diffusion", "Gemini"];

  return (
    <section id="prompt-studio" className="rounded-[1.5rem] border border-white/10 bg-white/[0.05] p-4 shadow-[0_0_44px_rgba(109,40,217,.14)] backdrop-blur-2xl">
      <div className="mb-3 flex items-center gap-2 text-amber-100">
        <span className="grid h-9 w-9 place-items-center rounded-xl border border-amber-200/25 bg-amber-200/10">
          <Sparkles className="h-4 w-4" />
        </span>
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Creative Output</p>
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em]">AI Artwork Prompt Generator</h3>
        </div>
      </div>
      <p className="mb-3 text-sm leading-6 text-slate-300">
        Copy a complete external image prompt for a Soul of Love result card. It includes branding, aura color, score, card name, orientation, and the universe message.
      </p>
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
        {promptPlatforms.map((platform) => (
          <button
            key={platform}
            type="button"
            onClick={() => onCopyPrompt(platform)}
            className="rounded-2xl border border-white/10 bg-white/[0.055] px-3 py-3 text-xs font-bold uppercase tracking-[0.12em] text-slate-200 transition hover:border-amber-200/35 hover:bg-white/[0.09]"
          >
            {copiedPrompt === platform ? "Copied" : platform}
          </button>
        ))}
      </div>
    </section>
  );
}
