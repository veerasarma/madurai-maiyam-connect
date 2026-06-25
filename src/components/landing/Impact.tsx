import { motion } from "motion/react";
import { useLanguage } from "@/i18n/LanguageContext";

export function Impact() {
  const { content, locale } = useLanguage();
  const { impact } = content;
  const isTamil = locale === "ta";

  return (
    <section id="impact" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/10 to-transparent -z-10" />
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs uppercase tracking-[0.3em] text-primary mb-4">{impact.tag}</div>
          <h2 className={`font-display text-4xl md:text-6xl leading-tight mb-6 ${isTamil ? "font-tamil font-normal" : ""}`}>
            {impact.title}
          </h2>
          <p className={`text-lg text-muted-foreground leading-relaxed ${isTamil ? "font-tamil" : ""}`}>{impact.body}</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {impact.metrics.map((s, i) => (
            <motion.div
              key={s.l}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass-gold rounded-3xl p-8 text-center relative overflow-hidden"
            >
              <div className="absolute inset-0 shimmer opacity-30" />
              <div className="relative">
                <div className="font-display text-4xl md:text-5xl text-gradient-red mb-2">
                  {s.v}
                </div>
                <div className={`text-sm uppercase tracking-wider text-muted-foreground ${isTamil ? "font-tamil normal-case" : ""}`}>{s.l}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
