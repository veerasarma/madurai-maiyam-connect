import { motion } from "motion/react";
import { useLanguage } from "@/i18n/LanguageContext";

export function Testimonials() {
  const { content, locale } = useLanguage();
  const { testimonials } = content;
  const isTamil = locale === "ta";

  return (
    <section className="relative py-32">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs uppercase tracking-[0.3em] text-primary mb-4">{testimonials.tag}</div>
          <h2 className={`font-display text-4xl md:text-6xl leading-tight mb-6 ${isTamil ? "font-tamil font-normal" : ""}`}>
            {testimonials.title}
          </h2>
          <p className={`text-lg text-muted-foreground leading-relaxed ${isTamil ? "font-tamil" : ""}`}>{testimonials.body}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[0, 1, 2].map((i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass rounded-3xl p-8 relative"
            >
              <div className="absolute -top-4 left-8 font-display text-7xl text-gradient-red leading-none">"</div>
              <blockquote className={`text-foreground/85 leading-relaxed mb-6 pt-4 ${isTamil ? "font-tamil" : ""}`}>
                {testimonials.comingSoonBody}
              </blockquote>
              <figcaption className="flex items-center gap-3 pt-4 border-t border-white/10">
                <div className="w-10 h-10 rounded-full bg-gradient-primary grid place-items-center font-display text-white">
                  V
                </div>
                <div>
                  <div className="font-semibold text-white">{testimonials.comingSoonTitle}</div>
                  <div className="text-xs text-muted-foreground/80">Visil191 · Madurai North</div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
