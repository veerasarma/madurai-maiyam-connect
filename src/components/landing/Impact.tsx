import { motion, useInView, useMotionValue, animate } from "motion/react";
import { useEffect, useRef } from "react";

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const mv = useMotionValue(0);
  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, to, {
      duration: 2,
      ease: "easeOut",
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = Math.round(v).toLocaleString() + suffix;
      },
    });
    return () => controls.stop();
  }, [inView, to, suffix, mv]);
  return <span ref={ref}>0{suffix}</span>;
}

const stats = [
  { n: 24500, s: "+", l: "People Helped" },
  { n: 5200, s: "+", l: "Active Volunteers" },
  { n: 18700, s: "+", l: "Complaints Solved" },
  { n: 112, s: "", l: "Wards Covered" },
];

export function Impact() {
  return (
    <section id="impact" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/10 to-transparent -z-10" />
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs uppercase tracking-[0.3em] text-primary mb-4">Madurai North · Impact</div>
          <h2 className="font-display text-4xl md:text-6xl leading-tight">
            Numbers that <span className="text-gradient-red">move people.</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((s, i) => (
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
                <div className="font-display text-5xl md:text-6xl text-gradient-red mb-2">
                  <Counter to={s.n} suffix={s.s} />
                </div>
                <div className="text-sm uppercase tracking-wider text-muted-foreground">{s.l}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
