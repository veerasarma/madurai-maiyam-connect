import { motion } from "motion/react";
import { useLanguage } from "@/i18n/LanguageContext";

export function Team() {
  const { content, locale } = useLanguage();
  const { volunteer } = content;
  const isTamil = locale === "ta";

  return (
    <section id="team" className="relative py-32">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-20">
          <div className="text-xs uppercase tracking-[0.3em] text-primary mb-4">{volunteer.tag}</div>
          <h2 className={`font-display text-4xl md:text-6xl leading-tight mb-6 ${isTamil ? "font-tamil font-normal" : ""}`}>
            {volunteer.title}
          </h2>
          <p className={`text-lg text-muted-foreground leading-relaxed ${isTamil ? "font-tamil" : ""}`}>{volunteer.body}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {volunteer.roles.map((m, i) => (
            <motion.div
              key={m.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              className="glass rounded-3xl p-6 flex items-center gap-5 hover:border-gold/30 transition group"
            >
              <div className="relative shrink-0">
                <div className="w-16 h-16 rounded-2xl bg-gradient-primary grid place-items-center font-display text-2xl text-white shadow-glow-red">
                  {m.n[0]}
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-gold ring-2 ring-background" />
              </div>
              <div>
                <h3 className={`font-display text-lg ${isTamil ? "font-tamil font-normal" : ""}`}>{m.r}</h3>
                <div className="text-sm text-gold">{m.n}</div>
                <div className={`text-xs text-muted-foreground/80 mt-1 ${isTamil ? "font-tamil" : ""}`}>{m.w}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
