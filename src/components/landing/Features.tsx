import { motion } from "motion/react";
import {
  FileText, Activity, Users, MapPin, Siren, Megaphone, Network, BarChart3,
} from "lucide-react";

const features = [
  { icon: FileText, t: "Complaint Registration", d: "One-tap submission with photo, location & category." },
  { icon: Activity, t: "Real-Time Status", d: "Live updates on every step of resolution." },
  { icon: Users, t: "Volunteer Management", d: "Onboard, assign and recognise active volunteers." },
  { icon: MapPin, t: "Ward-Level Monitoring", d: "Heatmaps across all 100+ wards of Madurai North." },
  { icon: Siren, t: "Emergency Support", d: "Priority routing for urgent civic emergencies." },
  { icon: Megaphone, t: "Public Announcements", d: "Push critical updates direct to every citizen." },
  { icon: Network, t: "Member Coordination", d: "Internal channels for area heads and party teams." },
  { icon: BarChart3, t: "Analytics Dashboard", d: "Insights that turn data into ground-level action." },
];

export function Features() {
  return (
    <section id="features" className="relative py-32 overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/15 blur-[140px] -z-10" />

      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="text-xs uppercase tracking-[0.3em] text-gold mb-4">Built for Citizens</div>
          <h2 className="font-display text-4xl md:text-6xl leading-tight">
            Every tool to <span className="text-gradient-gold">serve faster.</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.t}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: (i % 4) * 0.08 }}
              className="glass rounded-2xl p-6 group relative overflow-hidden hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent opacity-0 group-hover:opacity-100 transition" />
              <div className="w-12 h-12 rounded-xl bg-gradient-primary grid place-items-center shadow-glow-red mb-5 group-hover:scale-110 transition">
                <f.icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-display text-lg mb-2">{f.t}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
