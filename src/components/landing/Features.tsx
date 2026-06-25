import { motion } from "motion/react";
import { FileText, Activity, Users, MapPin, Siren, Megaphone, Network, ChartBar as BarChart3 } from "lucide-react";
import vijayImg from "@/assets/IMG_8433.JPG.jpeg";
import anandImg from "@/assets/n-anand-general-secretary.png";
import anbanImg from "@/assets/1000066596.jpg.jpeg";
import { useLanguage } from "@/i18n/LanguageContext";

const leaderImages = [vijayImg, anandImg, anbanImg];
const featureIcons = [FileText, Activity, MapPin, Network, Siren, Users, BarChart3, Megaphone];

export function Features() {
  const { content, locale } = useLanguage();
  const { leadership, features } = content;
  const isTamil = locale === "ta";

  return (
    <>
      <section className="relative py-24 overflow-hidden bg-[#7A0000]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/bakimage.jpeg')" }}
        />
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent" />

        <div className="relative container mx-auto px-6">
          <div className="text-center mb-14">
            <div className="inline-block text-xs uppercase tracking-[0.3em] text-[#C9A84C] mb-4 font-semibold">
              {leadership.tag}
            </div>
            <h2 className={`font-display text-4xl md:text-5xl leading-tight ${isTamil ? "font-tamil font-normal" : ""}`} style={{ color: "#FFFFFF" }}>
              {leadership.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {leadership.leaders.map((l, idx) => (
              <motion.div
                key={l.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: idx * 0.1 }}
                className="group min-w-0 rounded-2xl overflow-hidden border border-[#C9A84C]/50 shadow-2xl flex flex-col"
              >
                <div className="relative overflow-hidden h-[380px] md:h-[360px]">
                  <img
                    src={leaderImages[idx]}
                    alt={l.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-[#C9A84C] text-[#3B0000] text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                    {l.badge}
                  </div>
                </div>
                <div className="min-h-[150px] flex-1 px-6 py-5 border-t-2 border-[#C9A84C]/40" style={{ background: "#5A0000" }}>
                  <h3 className={`font-display text-xl text-white mb-1 ${isTamil ? "font-tamil font-normal" : ""}`}>{l.name}</h3>
                  <div className={`text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-3 ${isTamil ? "font-tamil normal-case" : ""}`}>{l.role}</div>
                  <p className={`text-white text-sm leading-relaxed italic border-l-2 border-[#C9A84C] pl-3 opacity-90 ${isTamil ? "font-tamil not-italic" : ""}`}>
                    "{l.quote}"
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center mt-10">
            <motion.a
              href="#team"
              whileHover={{ scale: 1.04 }}
              className={`flex items-center gap-2 font-bold px-6 py-3 rounded-full text-sm shadow-lg transition-colors ${isTamil ? "font-tamil" : ""}`}
              style={{ background: "#C9A84C", color: "#3B0000" }}
            >
              {leadership.viewMore}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.a>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent" />
      </section>

      <section id="features" className="relative py-32 overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/15 blur-[140px] -z-10" />

        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="text-xs uppercase tracking-[0.3em] text-primary mb-4">{features.tag}</div>
            <h2 className={`font-display text-4xl md:text-6xl leading-tight ${isTamil ? "font-tamil font-normal" : ""}`}>
              {features.title}
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.items.map((f, i) => {
              const Icon = featureIcons[i] ?? FileText;
              return (
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
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className={`font-display text-lg mb-2 ${isTamil ? "font-tamil font-normal" : ""}`}>{f.t}</h3>
                  <p className={`text-sm text-muted-foreground leading-relaxed ${isTamil ? "font-tamil" : ""}`}>{f.d}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
