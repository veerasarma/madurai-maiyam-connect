import { motion } from "motion/react";
import heroImg from "@/assets/hero-sangam.jpg";

export function Hero() {
  return (
    <section className="relative min-h-screen pt-32 pb-20 overflow-hidden bg-hero grain">
      {/* Background landmark */}
      <div className="absolute inset-0 -z-10">
        <img
          src={heroImg}
          alt="Madurai Tamil Sangam temple gopuram at sunset"
          width={1920}
          height={1280}
          className="w-full h-full object-cover object-center opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,oklch(0.10_0.02_25)_85%)]" />
      </div>

      {/* glowing orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-primary/30 blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-gold/30 blur-[120px] -z-10" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-gold mb-8 animate-pulse-glow">
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            <span className="text-xs uppercase tracking-[0.25em] text-gold">A People's Movement · மதுரை வடக்கு</span>
          </div>

          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] mb-6">
            <span className="block text-white">Voice of</span>
            <span className="block text-gradient-fire">Madurai North</span>
            <span className="block text-2xl md:text-3xl lg:text-4xl font-normal tracking-normal mt-4 text-white/80">
              Powered by <span className="text-gradient-gold font-display">Visil191</span>
            </span>
          </h1>

          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed mb-10">
            Connecting People. Solving Problems. Building a Better Madurai —
            <span className="text-gold"> one ward at a time.</span>
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <a href="#submit" className="btn-glow-red px-7 py-4 rounded-full font-semibold flex items-center gap-2">
              Submit Your Issue
              <span aria-hidden>→</span>
            </a>
            <a href="#track" className="btn-glow-gold px-7 py-4 rounded-full font-semibold">
              Track Complaint
            </a>
            <a href="#volunteer" className="btn-ghost-light px-7 py-4 rounded-full font-semibold">
              Join as Volunteer
            </a>
          </div>

          {/* Quick stats strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto"
          >
            {[
              { v: "24/7", l: "Citizen Support" },
              { v: "112+", l: "Wards Covered" },
              { v: "5k+", l: "Volunteers" },
              { v: "98%", l: "Response Rate" },
            ].map((s) => (
              <div key={s.l} className="glass rounded-2xl p-4">
                <div className="font-display text-2xl md:text-3xl text-gradient-gold">{s.v}</div>
                <div className="text-xs uppercase tracking-wider text-white/60 mt-1">{s.l}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 text-xs uppercase tracking-[0.3em] flex flex-col items-center gap-2">
        <span>Scroll</span>
        <span className="w-px h-10 bg-gradient-to-b from-gold to-transparent" />
      </div>
    </section>
  );
}
