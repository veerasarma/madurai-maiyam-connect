import { motion } from "motion/react";

const pillars = [
  {
    t: "Faster Help",
    d: "Cut the wait. Submit issues directly to your ward representative and watch them move.",
    i: "⚡",
  },
  {
    t: "Digital Governance",
    d: "Every complaint logged, routed and resolved with full digital accountability.",
    i: "◆",
  },
  {
    t: "Transparency First",
    d: "Real-time tracking on every request — from citizen submission to closure.",
    i: "✦",
  },
];

export function About() {
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
          <div className="text-xs uppercase tracking-[0.3em] text-gold mb-4">About Visil191</div>
          <h2 className="font-display text-4xl md:text-6xl leading-tight mb-6">
            A new chapter for <span className="text-gradient-fire">Madurai North.</span>
          </h2>
          <p className="text-lg text-white/70 leading-relaxed">
            Visil191 is TVK Madurai North's digital backbone — a platform built so every
            voice from every street reaches the right hands, instantly. No middlemen. No
            delays. Just <span className="text-gold">service, tracked.</span>
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {pillars.map((p, i) => (
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
                <div className="w-14 h-14 rounded-2xl glass-gold grid place-items-center text-2xl text-gold mb-6">
                  {p.i}
                </div>
                <h3 className="font-display text-2xl mb-3">{p.t}</h3>
                <p className="text-white/65 leading-relaxed">{p.d}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
