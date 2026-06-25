import { motion } from "motion/react";
import { useLanguage } from "@/i18n/LanguageContext";

export function Workflow() {
  const { content, locale } = useLanguage();
  const { workflow } = content;
  const isTamil = locale === "ta";

  return (
    <section id="workflow" className="relative py-32">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-20">
          <div className="text-xs uppercase tracking-[0.3em] text-primary mb-4">{workflow.tag}</div>
          <h2 className={`font-display text-4xl md:text-6xl leading-tight ${isTamil ? "font-tamil font-normal" : ""}`}>
            {workflow.title}
          </h2>
        </div>

        <div className="relative">
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/40 to-transparent" />
          <div className="space-y-12">
            {workflow.steps.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, x: i % 2 ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`relative md:grid md:grid-cols-2 md:gap-16 items-center ${
                  i % 2 ? "md:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className={`pl-16 md:pl-0 ${i % 2 ? "md:text-left md:pl-16" : "md:text-right md:pr-16"}`}>
                  <div className="font-display text-6xl text-gradient-red mb-2">{s.n}</div>
                  <h3 className={`font-display text-2xl mb-2 ${isTamil ? "font-tamil font-normal" : ""}`}>{s.t}</h3>
                  <p className={`text-muted-foreground max-w-md ${isTamil ? "font-tamil" : ""}`}>{s.d}</p>
                </div>
                <div className="absolute left-0 md:left-1/2 top-2 md:-translate-x-1/2">
                  <div className="w-12 h-12 rounded-full bg-gradient-primary grid place-items-center shadow-glow-red ring-4 ring-background">
                    <span className="w-3 h-3 rounded-full bg-gold animate-pulse" />
                  </div>
                </div>
                <div />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
