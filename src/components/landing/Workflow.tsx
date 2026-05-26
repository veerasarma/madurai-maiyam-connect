import { motion } from "motion/react";

const steps = [
  { n: "01", t: "Citizen submits issue", d: "Through web, app or WhatsApp — with photo & location." },
  { n: "02", t: "Party team receives", d: "Smart routing pushes it to the right desk in seconds." },
  { n: "03", t: "Assigned to local members", d: "Ward representatives mobilise the right people." },
  { n: "04", t: "Tracking & updates", d: "Live status, SMS alerts and timestamped progress." },
  { n: "05", t: "Problem resolved", d: "Verified closure with citizen confirmation & feedback." },
];

export function Workflow() {
  return (
    <section id="workflow" className="relative py-32">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-20">
          <div className="text-xs uppercase tracking-[0.3em] text-gold mb-4">How It Works</div>
          <h2 className="font-display text-4xl md:text-6xl leading-tight">
            From your street to <span className="text-gradient-fire">solved.</span>
          </h2>
        </div>

        <div className="relative">
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/40 to-transparent" />
          <div className="space-y-12">
            {steps.map((s, i) => (
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
                  <div className="font-display text-6xl text-gradient-gold mb-2">{s.n}</div>
                  <h3 className="font-display text-2xl mb-2">{s.t}</h3>
                  <p className="text-white/65 max-w-md">{s.d}</p>
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
