import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

export function Footer() {
  const { content, locale } = useLanguage();
  const { brand, footer } = content;
  const isTamil = locale === "ta";

  return (
    <footer
      id="contact"
      className="relative pt-20 pb-10 text-white"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.32 0.16 25) 0%, oklch(0.22 0.12 25) 100%)",
      }}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 mb-12 sm:mb-16">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-gold grid place-items-center font-display text-xl shadow-glow-gold text-[oklch(0.22_0.12_25)]">
                V
              </div>
              <div>
                <div className="font-display text-2xl tracking-wide">
                  VISIL<span className="text-gradient-gold">191</span>
                </div>
                <div className={`text-[10px] uppercase tracking-[0.15em] text-white/60 ${isTamil ? "font-tamil normal-case" : ""}`}>
                  {brand.expanded}
                </div>
              </div>
            </div>
            <p className={`text-white/75 max-w-md leading-relaxed mb-6 ${isTamil ? "font-tamil" : ""}`}>
              {footer.description}
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
              {footer.quickLinksTitle}
            </h4>
            <ul className="space-y-3 text-white/75 text-sm">
              {footer.quickLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className={`hover:text-gold transition ${isTamil ? "font-tamil" : ""}`}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className={`font-display text-sm uppercase tracking-[0.2em] text-gold mb-5 ${isTamil ? "font-tamil normal-case" : ""}`}>
              {footer.serviceLinksTitle}
            </h4>
            <ul className="space-y-3 text-white/75 text-sm mb-8">
              {footer.serviceLinks.map((l) => (
                <li key={l}>
                  <a href="#features" className={`hover:text-gold transition ${isTamil ? "font-tamil" : ""}`}>
                    {l}
                  </a>
                </li>
              ))}
            </ul>
            <h4 className="font-display text-sm uppercase tracking-[0.2em] text-gold mb-5">
              {footer.reachUsTitle}
            </h4>
            <ul className="space-y-4 text-white/75 text-sm">
              <li className="flex gap-3">
                <MapPin className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                {footer.address}
              </li>
              <li className="flex gap-3">
                <Phone className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                {footer.phone}
              </li>
              <li className="flex gap-3">
                <Mail className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                {footer.emailSupport}
              </li>
              <li className="flex gap-3">
                <Mail className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                {footer.emailGrievance}
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/15 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/60">
          <div className={isTamil ? "font-tamil" : ""}>{footer.copyright}</div>
          <div className={`text-gold ${isTamil ? "font-tamil" : ""}`}>{footer.tagline}</div>
        </div>
      </div>
    </footer>
  );
}
