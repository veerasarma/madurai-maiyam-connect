import { useLanguage } from "@/i18n/LanguageContext";
import type { Locale } from "@/content/landing";

type LanguageSwitcherProps = {
  scrolled?: boolean;
  compact?: boolean;
};

export function LanguageSwitcher({ scrolled = false, compact = false }: LanguageSwitcherProps) {
  const { locale, setLocale, content } = useLanguage();

  const options: { value: Locale; label: string }[] = [
    { value: "ta", label: content.language.tamil },
    { value: "en", label: content.language.english },
  ];

  return (
    <div
      className={`inline-flex items-center rounded-full p-0.5 shrink-0 ${
        scrolled
          ? "bg-foreground/5 border border-foreground/10"
          : "bg-black/30 border border-white/20 backdrop-blur-sm"
      }`}
      role="group"
      aria-label={content.language.label}
    >
      {options.map((opt) => {
        const active = locale === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => setLocale(opt.value)}
            className={`rounded-full font-medium transition-all ${
              compact ? "px-2 py-1 text-[10px]" : "px-2.5 py-1 text-[11px] sm:text-xs"
            } ${
              active
                ? scrolled
                  ? "bg-primary text-white shadow-sm"
                  : "bg-white text-foreground shadow-sm"
                : scrolled
                  ? "text-foreground/60 hover:text-foreground"
                  : "text-white/70 hover:text-white"
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
