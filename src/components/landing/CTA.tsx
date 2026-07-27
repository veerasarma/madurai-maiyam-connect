import { useLanguage } from "@/i18n/LanguageContext";

export function CTA() {
  const { content, locale } = useLanguage();
  const { cta } = content;
  const isTamil = locale === "ta";

  return (
    <section id="submit" className="relative py-16 sm:py-24">
      <div id="track" className="container mx-auto px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl sm:rounded-[2.5rem] glass-gold p-6 sm:p-12 md:p-20 text-center">
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-primary/40 blur-[100px]" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-gold/40 blur-[100px]" />
          <div className="relative">
            <div className="text-xs uppercase tracking-[0.3em] text-primary mb-4">{cta.tag}</div>
            <h2 className={`font-display text-3xl sm:text-4xl md:text-6xl leading-tight mb-6 max-w-3xl mx-auto ${isTamil ? "font-tamil font-normal" : ""}`}>
              {cta.title}
            </h2>
            <p className={`text-base sm:text-lg text-foreground/75 max-w-2xl mx-auto mb-8 sm:mb-10 ${isTamil ? "font-tamil" : ""}`}>
              {cta.body}
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
              <a href={cta.submitUrl} className={`btn-glow-red px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-semibold w-full sm:w-auto ${isTamil ? "font-tamil" : ""}`}>{cta.submit}</a>
              <a href={cta.trackUrl} className={`btn-glow-gold px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-semibold w-full sm:w-auto ${isTamil ? "font-tamil" : ""}`}>{cta.track}</a>
              <a href={cta.volunteerUrl} className={`btn-ghost-light px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-semibold w-full sm:w-auto ${isTamil ? "font-tamil" : ""}`}>{cta.volunteer}</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
