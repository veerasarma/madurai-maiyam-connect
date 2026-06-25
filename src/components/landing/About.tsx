import { motion } from "motion/react";
import { useLanguage } from "@/i18n/LanguageContext";

export function About() {
  const { content, locale } = useLanguage();
  const { about } = content;
  const isTamil = locale === "ta";

  return (
    <section id="about" className="relative py-32">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-20"
        >
          <div className="text-xs uppercase tracking-[0.3em] text-primary mb-4">{about.tag}</div>
          <h2 className={`font-display text-4xl md:text-6xl leading-tight mb-6 ${isTamil ? "font-tamil font-normal" : ""}`}>
            {about.title}
          </h2>
          <p className={`text-lg text-muted-foreground leading-relaxed mb-4 ${isTamil ? "font-tamil" : ""}`}>
            {about.body}
          </p>
          <p className={`text-lg text-muted-foreground leading-relaxed ${isTamil ? "font-tamil" : ""}`}>
            <span className="text-primary font-semibold">{about.bodyNote}</span>
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {about.pillars.map((p, i) => (
            <motion.div
              key={p.t}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass rounded-3xl p-8 group hover:border-gold/30 transition relative overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-primary/20 blur-3xl opacity-0 group-hover:opacity-100 transition duration-500" />
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl glass-gold grid place-items-center text-2xl text-primary mb-6">
                  {p.i}
                </div>
                <h3 className="font-display text-xl mb-3">{p.t}</h3>
                <p className={`text-muted-foreground leading-relaxed ${isTamil ? "font-tamil" : ""}`}>{p.d}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
