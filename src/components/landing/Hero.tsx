import { motion } from "motion/react";
import heroImg from "@/assets/hero-sangam.jpg";
import { useLanguage } from "@/i18n/LanguageContext";

export function Hero() {
  const { content, locale } = useLanguage();
  const { hero } = content;
  const isTamil = locale === "ta";

  return (
    <section className="relative min-h-screen pt-32 pb-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src={heroImg}
          alt="Madurai Tamil Sangam temple gopuram at sunset"
          width={1920}
          height={1280}
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/40 to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto text-center"
        >
          <div className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full glass-gold mb-8 animate-pulse-glow max-w-4xl mx-auto ${isTamil ? "text-center" : ""}`}>
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse shrink-0" />
            <span className={`text-xs text-white ${isTamil ? "font-tamil-ui leading-snug" : "uppercase tracking-[0.2em]"}`}>
              {hero.eyebrow}
            </span>
          </div>

          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] mb-6 text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
            <span className="block">{hero.titleLine1}</span>
            <span
              className={`block text-gradient-gold mt-4 text-balance mx-auto max-w-4xl ${
                isTamil
                  ? "font-tamil-ui font-semibold text-xl sm:text-2xl md:text-3xl lg:text-[2rem] leading-snug"
                  : "text-2xl md:text-3xl lg:text-4xl leading-tight"
              }`}
            >
              {hero.titleLine2}
            </span>
          </h1>

          <p className={`text-base md:text-lg text-white/85 max-w-3xl mx-auto leading-relaxed mb-6 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] ${isTamil ? "font-tamil-ui" : "md:text-xl"}`}>
            {hero.subtitle}
          </p>

          <p className={`text-sm md:text-base text-gold/90 max-w-2xl mx-auto mb-10 ${isTamil ? "font-tamil-ui leading-relaxed" : "tracking-wide"}`}>
            {hero.processStrip}
          </p>

          <div className={`flex flex-wrap justify-center gap-3 sm:gap-4 mb-16 ${isTamil ? "max-w-3xl mx-auto" : ""}`}>
            <a
              href="#submit"
              className={`btn-glow-red rounded-full font-semibold flex items-center justify-center gap-2 text-center ${
                isTamil ? "font-tamil-ui px-5 py-3.5 text-sm sm:text-base flex-1 sm:flex-none min-w-[10rem]" : "px-7 py-4"
              }`}
            >
              {hero.ctaPrimary}
              <span aria-hidden>→</span>
            </a>
            <a
              href="#track"
              className={`btn-glow-gold rounded-full font-semibold text-center ${
                isTamil ? "font-tamil-ui px-5 py-3.5 text-sm sm:text-base flex-1 sm:flex-none min-w-[10rem]" : "px-7 py-4"
              }`}
            >
              {hero.ctaSecondary}
            </a>
            <a
              href="#team"
              className={`rounded-full font-semibold bg-white/10 backdrop-blur-md border border-white/30 text-white hover:bg-white/20 transition text-center ${
                isTamil ? "font-tamil-ui px-5 py-3.5 text-sm sm:text-base w-full sm:w-auto sm:min-w-[12rem]" : "px-7 py-4"
              }`}
            >
              {hero.ctaTertiary}
            </a>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto"
          >
            {hero.stats.map((s) => (
              <div
                key={s.l}
                className="rounded-2xl p-4 bg-black/40 backdrop-blur-md border border-white/20"
              >
                <div className="font-display text-2xl md:text-3xl text-gold">{s.v}</div>
                <div className={`text-xs text-white/90 mt-1 min-h-[2rem] flex items-center justify-center ${isTamil ? "font-tamil-ui normal-case leading-snug" : "uppercase tracking-wider"}`}>{s.l}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />
    </section>
  );
}
