import { motion } from "motion/react";

const team = [
  { n: "Arun Vijay", r: "District Coordinator", w: "Ward 1–25" },
  { n: "Selvi Meenakshi", r: "Women's Wing Lead", w: "Madurai North" },
  { n: "Karthik Raja", r: "Youth Coordinator", w: "Ward 26–60" },
  { n: "Murugan S.", r: "Volunteer Head", w: "Field Operations" },
  { n: "Priya Devi", r: "Area Representative", w: "Anna Nagar" },
  { n: "Bharath Kumar", r: "Tech & Outreach", w: "Visil191 Platform" },
];

export function Team() {
  return (
    <section id="team" className="relative py-32">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-20">
          <div className="text-xs uppercase tracking-[0.3em] text-primary mb-4">Leadership</div>
          <h2 className="font-display text-4xl md:text-6xl leading-tight">
            Coordinators on the <span className="text-gradient-red">ground.</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {team.map((m, i) => (
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
                <h3 className="font-display text-lg">{m.n}</h3>
                <div className="text-sm text-gold">{m.r}</div>
                <div className="text-xs text-muted-foreground/80 mt-1">{m.w}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
