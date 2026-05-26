import { motion } from "motion/react";
import { FileText, Activity, Users, MapPin, Siren, Megaphone, Network, ChartBar as BarChart3 } from "lucide-react";
import vijayImg from "@/assets/IMG_8433.JPG.jpeg";
import anbanImg from "@/assets/1000066594.jpg.jpeg";

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

const leaders = [
  {
    img: vijayImg,
    name: "C. Joseph Vijay",
    role: "TVK President",
    quote: "தமிழ்நாட்டின் மாற்றம் தமிழ் மக்களின் கைகளில்",
    badge: "TVK தலைவர்",
  },
  {
    img: anbanImg,
    name: "Vijay Anban Kallanai",
    role: "Madurai North Ward Rep.",
    quote: "மக்களின் குரல் — Visil191 மூலம் அரசு வரை",
    badge: "Madurai North",
  },
];

export function Features() {
  return (
    <>
      {/* Leadership Photo Cards Section */}
      <section className="relative py-24 overflow-hidden bg-[#8B0000]">
        {/* Crowd texture overlay */}
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=1600')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#8B0000]/80 via-[#6B0000]/70 to-[#8B0000]/90" />

        {/* Gold top border */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent" />

        <div className="relative container mx-auto px-6">
          {/* Header — centered */}
          <div className="text-center mb-14">
            <div className="text-xs uppercase tracking-[0.3em] text-[#C9A84C] mb-3">Our Leadership</div>
            <h2 className="font-display text-4xl md:text-5xl text-white leading-tight">
              Voices of <span className="text-[#C9A84C]">Madurai North</span>
            </h2>
          </div>

          {/* Cards */}
          <div className="flex flex-col md:flex-row items-end justify-center gap-8 max-w-4xl mx-auto">

            {/* Card 1 — TVK President */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group w-full md:w-[320px] flex-shrink-0 rounded-2xl overflow-hidden border border-[#C9A84C]/50 shadow-2xl"
            >
              {/* Photo */}
              <div className="relative overflow-hidden" style={{ aspectRatio: "4/5" }}>
                <img
                  src={vijayImg}
                  alt="C. Joseph Vijay"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-[#C9A84C] text-[#3B0000] text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                  TVK தலைவர்
                </div>
              </div>
              {/* Info panel — matches section bg */}
              <div className="bg-[#6B0000] px-6 py-5 border-t border-[#C9A84C]/30">
                <h3 className="font-display text-2xl text-white mb-0.5">C. Joseph Vijay</h3>
                <div className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-3">TVK President</div>
                <p className="text-white/75 text-sm leading-relaxed italic border-l-2 border-[#C9A84C] pl-3">
                  "தமிழ்நாட்டின் மாற்றம் தமிழ் மக்களின் கைகளில்"
                </p>
              </div>
            </motion.div>

            {/* Card 2 — Ward Rep */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="group w-full md:w-[280px] flex-shrink-0 rounded-2xl overflow-hidden border border-[#C9A84C]/40 shadow-2xl"
            >
              {/* Photo */}
              <div className="relative overflow-hidden" style={{ aspectRatio: "4/5" }}>
                <img
                  src={anbanImg}
                  alt="Vijay Anban Kallanai"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-[#C9A84C] text-[#3B0000] text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                  Madurai North
                </div>
              </div>
              {/* Info panel */}
              <div className="bg-[#6B0000] px-5 py-5 border-t border-[#C9A84C]/30">
                <h3 className="font-display text-xl text-white mb-0.5">Vijay Anban Kallanai</h3>
                <div className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-3">Ward Representative</div>
                <p className="text-white/75 text-sm leading-relaxed italic border-l-2 border-[#C9A84C] pl-3">
                  "மக்களின் குரல் — Visil191 மூலம் அரசு வரை"
                </p>
              </div>
            </motion.div>

          </div>

          {/* View More — centered below */}
          <div className="flex justify-center mt-10">
            <motion.a
              href="#team"
              whileHover={{ scale: 1.04 }}
              className="flex items-center gap-2 bg-[#C9A84C] text-[#3B0000] font-bold px-6 py-2.5 rounded-full text-sm shadow-lg hover:bg-yellow-400 transition-colors"
            >
              View More
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.a>
          </div>
        </div>

        {/* Gold bottom border */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent" />
      </section>

      {/* Features Grid Section */}
      <section id="features" className="relative py-32 overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/15 blur-[140px] -z-10" />

        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="text-xs uppercase tracking-[0.3em] text-primary mb-4">Built for Citizens</div>
            <h2 className="font-display text-4xl md:text-6xl leading-tight">
              Every tool to <span className="text-gradient-red">serve faster.</span>
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
    </>
  );
}
