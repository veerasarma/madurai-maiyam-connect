import { motion } from "motion/react";
import heroImg from "@/assets/hero-sangam.jpg";

export function Hero() {
  return (
    <section className="relative min-h-screen pt-32 pb-20 overflow-hidden">
      {/* Background landmark */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImg}
          alt="Madurai Tamil Sangam temple gopuram at sunset"
          width={1920}
          height={1280}
          className="w-full h-full object-cover object-center"
        />
        {/* dark wash for legibility */}
        <div className="absolute inset-0 bg-[oklch(0.18_0.08_25/0.55)]" />
        {/* fade to cream at bottom */}
        <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* glowing orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-primary/30 blur-[120px] z-0" />
      <div className="absolute bottom-1/3 -right-32 w-96 h-96 rounded-full bg-gold/40 blur-[120px] z-0" />


      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-gold mb-8 animate-pulse-glow">
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            <span className="text-xs uppercase tracking-[0.25em] text-white">
              A People's Movement · மதுரை வடக்கு
            </span>
          </div>

          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] mb-6 text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
            <span className="block">Voice of</span>
            <span className="block text-gradient-gold">Madurai North</span>
            <span className="block text-2xl md:text-3xl lg:text-4xl font-normal tracking-normal mt-4 text-white/90">
              Powered by <span className="text-gold font-display">Visil191</span>
            </span>
          </h1>

          <p className="text-lg md:text-xl text-white/85 max-w-2xl mx-auto leading-relaxed mb-10 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
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
            <a
              href="#volunteer"
              className="px-7 py-4 rounded-full font-semibold bg-white/10 backdrop-blur-md border border-white/30 text-white hover:bg-white/20 transition"
            >
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
              <div
                key={s.l}
                className="rounded-2xl p-4 bg-black/40 backdrop-blur-md border border-white/20"
              >
                <div className="font-display text-2xl md:text-3xl text-gold">{s.v}</div>
                <div className="text-xs uppercase tracking-wider text-white/90 mt-1">{s.l}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

    </section>
  );
}
