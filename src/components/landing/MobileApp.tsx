import { motion } from "motion/react";
import mockup from "@/assets/mobile-mockup.png";
import { useLanguage } from "@/i18n/LanguageContext";

export function MobileApp() {
  const { content, locale } = useLanguage();
  const { digitalAccess } = content;
  const isTamil = locale === "ta";

  return (
    <section className="relative py-32 overflow-hidden">
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="text-xs uppercase tracking-[0.3em] text-primary mb-4">{digitalAccess.tag}</div>
          <h2 className={`font-display text-4xl md:text-6xl leading-tight mb-6 ${isTamil ? "font-tamil font-normal" : ""}`}>
            {digitalAccess.title}
          </h2>
          <p className={`text-lg text-muted-foreground leading-relaxed mb-8 ${isTamil ? "font-tamil" : ""}`}>
            {digitalAccess.body}
          </p>
          <ul className="space-y-4 mb-10">
            {digitalAccess.bullets.map((x) => (
              <li key={x} className="flex items-start gap-3">
                <span className="mt-1 w-5 h-5 rounded-full bg-gradient-gold grid place-items-center text-[10px] text-background font-bold">✓</span>
                <span className={`text-foreground/80 ${isTamil ? "font-tamil" : ""}`}>{x}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-3">
            <a className={`btn-glow-red px-6 py-3.5 rounded-full font-semibold ${isTamil ? "font-tamil" : ""}`} href="/submit">{digitalAccess.ctaAndroid}</a>
            <a className={`btn-ghost-light px-6 py-3.5 rounded-full font-semibold ${isTamil ? "font-tamil" : ""}`} href="/track">{digitalAccess.ctaIos}</a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative flex justify-center"
        >
          <div className="absolute inset-0 bg-gradient-gold opacity-30 blur-[100px] rounded-full" />
          <img
            src={mockup}
            alt="Visil191 mobile app showing complaint tracking dashboard"
            width={900}
            height={1024}
            loading="lazy"
            className="relative max-w-md w-full animate-float drop-shadow-2xl"
          />
        </motion.div>
      </div>
    </section>
  );
}
