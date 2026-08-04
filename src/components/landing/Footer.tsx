import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const SOFTEAN_URL = "https://www.softean.com";

export function Footer() {
  const { content, locale } = useLanguage();
  const { brand, footer } = content;
  const isTamil = locale === "ta";

  const socialLinks = [
    {
      icon: Facebook,
      link: "https://www.facebook.com/madurai.vijayanban",
      label: "Facebook",
    },
    {
      icon: Instagram,
      link: "https://www.instagram.com/madurai_vijay_anban?igsh=MTJlYTZrMTVuNzJ1bg%3D%3D",
      label: "Instagram",
    },
    {
      icon: Twitter,
      link: "https://x.com/VijayAnban_offl",
      label: "X",
    },
    {
      icon: Youtube,
      link: "https://www.youtube.com/@tvkitwing-madurainorth",
      label: "YouTube",
    },
  ];

  return (
    <footer
      id="contact"
      className="relative pt-16 sm:pt-20 pb-8 sm:pb-10 text-white"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.32 0.16 25) 0%, oklch(0.22 0.12 25) 100%)",
      }}
    >
      <div className="container mx-auto px-4 sm:px-6">
        {/* Top row: brand + quick links + services + reach us */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-10 mb-10 sm:mb-12">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-xl bg-gradient-gold grid place-items-center font-display text-xl shadow-glow-gold text-[oklch(0.22_0.12_25)]">
                V
              </div>
              <div>
                <div className="font-display text-2xl tracking-wide">
                  VISIL<span className="text-gradient-gold">191</span>
                </div>
                <div
                  className={`text-[10px] uppercase tracking-[0.15em] text-white/60 ${isTamil ? "font-tamil normal-case" : ""}`}
                >
                  {brand.expanded}
                </div>
              </div>
            </div>
            <p
              className={`text-white/75 leading-relaxed mb-6 text-sm sm:text-[15px] ${isTamil ? "font-tamil" : ""}`}
            >
              {footer.description}
            </p>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map(({ icon: Icon, link, label }) => (
                <a
                  key={label}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-full bg-white/10 border border-white/15 grid place-items-center hover:bg-gold hover:text-[oklch(0.22_0.12_25)] hover:border-gold transition"
                >
                  <Icon className="w-4 h-4" />
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
                  <a
                    href={l.href}
                    className={`hover:text-gold transition ${isTamil ? "font-tamil" : ""}`}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4
              className={`font-display text-sm uppercase tracking-[0.2em] text-gold mb-5 ${isTamil ? "font-tamil normal-case" : ""}`}
            >
              {footer.serviceLinksTitle}
            </h4>
            <ul className="space-y-3 text-white/75 text-sm">
              {footer.serviceLinks.map((l) => (
                <li key={l}>
                  <a
                    href="#features"
                    className={`hover:text-gold transition ${isTamil ? "font-tamil" : ""}`}
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4
              className={`font-display text-sm uppercase tracking-[0.2em] text-gold mb-5 ${isTamil ? "font-tamil normal-case" : ""}`}
            >
              {footer.reachUsTitle}
            </h4>
            <ul className="space-y-4 text-white/75 text-sm">
              <li className="flex gap-3">
                <MapPin className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                <span className={isTamil ? "font-tamil" : ""}>{footer.address}</span>
              </li>
                <li className="flex items-start gap-3">
                 <Phone className="w-4 h-4 text-gold mt-1 shrink-0" />
                 <div className="flex flex-col space-y-1">
                    {footer.phone.map((phone, index) => (
                      <p key={index}>
                        {phone}
                      </p>
                    ))}
                 </div>
              </li>
              <li className="flex gap-3 items-center">
                <Mail className="w-4 h-4 text-gold shrink-0" />
                <a href={`mailto:${footer.emailSupport}`} className="hover:text-gold transition break-all">
                  {footer.emailSupport}
                </a>
              </li>
              {/* <li className="flex gap-3 items-center">
                <Mail className="w-4 h-4 text-gold shrink-0" />
                <a href={`mailto:${footer.emailGrievance}`} className="hover:text-gold transition break-all">
                  {footer.emailGrievance}
                </a>
              </li> */}
            </ul>
          </div>
        </div>

        {/* Second band: tagline */}
        <div className="py-6 sm:py-7 border-t border-white/15">
          <p
            className={`text-center text-sm sm:text-base tracking-wide text-gold/95 ${isTamil ? "font-tamil" : ""}`}
          >
            {footer.tagline}
          </p>
        </div>

        {/* Bottom: copyright left · powered by right */}
        <div className="pt-5 sm:pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-center sm:text-left">
          <div
            className={`text-[11px] sm:text-xs text-white/55 leading-relaxed ${isTamil ? "font-tamil" : ""}`}
          >
            {footer.copyright}
          </div>
          <p className="text-[11px] sm:text-xs text-white/55 shrink-0 sm:text-right">
            Powered by{" "}
            <a
              href={SOFTEAN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:text-white transition underline-offset-4 hover:underline font-medium"
            >
              Softean Technologies
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
