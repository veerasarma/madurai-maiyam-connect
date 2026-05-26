import { motion } from "motion/react";

const items = [
  {
    q: "Submitted a complaint about street lights at 9 PM. By next morning, our entire lane was lit. Visil191 actually works.",
    n: "Rajesh Kumar",
    r: "Resident, Anna Nagar",
  },
  {
    q: "ஒரு வாரத்துல எங்க தெருவுல குப்பை பிரச்சினை தீர்ந்தது. முதல்ல நம்ப முடியல, ஆனா TVK திட்டம் வேலை செய்துச்சு.",
    n: "Lakshmi Devi",
    r: "Homemaker, K.K. Nagar",
  },
  {
    q: "As a volunteer, the platform gives me clear tasks and visibility on what's happening in my ward. Service made simple.",
    n: "Mohammed Asif",
    r: "Volunteer, Ward 47",
  },
];

export function Testimonials() {
  return (
    <section className="relative py-32">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs uppercase tracking-[0.3em] text-primary mb-4">Voices from the Ground</div>
          <h2 className="font-display text-4xl md:text-6xl leading-tight">
            Real stories from <span className="text-gradient-red">real Madurai.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {items.map((t, i) => (
            <motion.figure
              key={t.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass rounded-3xl p-8 relative"
            >
              <div className="absolute -top-4 left-8 font-display text-7xl text-gradient-gold leading-none">"</div>
              <blockquote className="text-foreground/85 leading-relaxed mb-6 pt-4">
                {t.q}
              </blockquote>
              <figcaption className="flex items-center gap-3 pt-4 border-t border-white/10">
                <div className="w-10 h-10 rounded-full bg-gradient-primary grid place-items-center font-display text-white">
                  {t.n[0]}
                </div>
                <div>
                  <div className="font-semibold text-white">{t.n}</div>
                  <div className="text-xs text-muted-foreground/80">{t.r}</div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
