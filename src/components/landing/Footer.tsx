import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer
      id="contact"
      className="relative pt-20 pb-10 text-white"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.32 0.16 25) 0%, oklch(0.22 0.12 25) 100%)",
      }}
    >
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-gold grid place-items-center font-display text-xl shadow-glow-gold text-[oklch(0.22_0.12_25)]">
                V
              </div>
              <div>
                <div className="font-display text-2xl tracking-wide">
                  VISIL<span className="text-gradient-gold">191</span>
                </div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-white/60">
                  TVK · Madurai North
                </div>
              </div>
            </div>
            <p className="text-white/75 max-w-md leading-relaxed mb-6">
              A people-first digital movement by TVK Madurai North — built to make
              governance responsive, transparent and worthy of Tamil Nadu's future.
            </p>
            <div className="flex gap-3">
              {[Facebook, Instagram, Twitter, Youtube].map((Ic, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/10 border border-white/15 grid place-items-center hover:bg-gold hover:text-[oklch(0.22_0.12_25)] hover:border-gold transition"
                >
                  <Ic className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-sm uppercase tracking-[0.2em] text-gold mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3 text-white/75 text-sm">
              {["About Visil191", "Features", "Workflow", "Impact", "Team", "Volunteer"].map((l) => (
                <li key={l}>
                  <a href="#" className="hover:text-gold transition">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm uppercase tracking-[0.2em] text-gold mb-5">
              Reach Us
            </h4>
            <ul className="space-y-4 text-white/75 text-sm">
              <li className="flex gap-3">
                <MapPin className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                TVK Madurai North Office, Anna Nagar Main Road, Madurai 625020
              </li>
              <li className="flex gap-3">
                <Phone className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                +91 452 191 1919
              </li>
              <li className="flex gap-3">
                <Mail className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                contact@visil191.in
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/15 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/60">
          <div>© {new Date().getFullYear()} Visil191 · TVK Madurai North. All rights reserved.</div>
          <div className="font-tamil text-gold">மக்கள் சேவையே மகேசன் சேவை</div>
        </div>
      </div>
    </footer>
  );
}
