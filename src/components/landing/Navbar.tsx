import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useLanguage } from "@/i18n/LanguageContext";
import { LanguageSwitcher } from "@/components/landing/LanguageSwitcher";
import type { NavLink } from "@/content/landing";

function NavLinkItem({
  link,
  isTamil,
  textColor,
  compact,
}: {
  link: NavLink;
  isTamil: boolean;
  textColor: string;
  compact: boolean;
}) {
  const desktopLabel = isTamil && link.shortLabel ? link.shortLabel : link.label;

  return (
    <a
      href={link.href}
      className={`whitespace-nowrap ${textColor} hover:text-primary transition relative group font-medium ${
        isTamil
          ? `font-tamil-ui nav-tamil-link ${compact ? "text-[11px] 2xl:text-xs" : "text-xs 2xl:text-[13px]"}`
          : "text-xs 2xl:text-[13px] inline-flex items-center min-h-8"
      }`}
    >
      {isTamil && link.shortLabel ? (
        <>
          <span className="2xl:hidden">{link.shortLabel}</span>
          <span className="hidden 2xl:inline">{link.label}</span>
        </>
      ) : (
        desktopLabel
      )}
      <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
    </a>
  );
}

export function Navbar() {
  const { content, locale } = useLanguage();
  const { brand, nav } = content;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const textColor = scrolled ? "text-foreground/75" : "text-white/90";
  const logoColor = scrolled ? "text-foreground" : "text-white";
  const isTamil = locale === "ta";

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on();
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);

  const rightMinWidth = isTamil
    ? "min-w-[11.5rem] sm:min-w-[13.5rem] xl:min-w-[15.5rem] 2xl:min-w-[22rem]"
    : "min-w-[10rem] sm:min-w-[12rem] xl:min-w-[14rem] 2xl:min-w-[18rem]";

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass border-b border-foreground/5" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="relative flex items-center h-14 lg:h-16">
          {/* Brand — fixed width column */}
          <a
            href="#"
            className="relative z-20 flex items-center gap-2 shrink-0 w-[8.5rem] sm:w-[9.5rem]"
          >
            <img
              src="/ChatGPT_Image_May_26__2026_at_02_39_24_PM-removebg-preview.png"
              alt="Visil191 Logo"
              className="w-9 h-9 sm:w-10 sm:h-10 object-contain drop-shadow-lg shrink-0"
            />
            <div className="leading-tight hidden sm:block min-w-0">
              <div className={`font-display text-lg lg:text-xl tracking-wide whitespace-nowrap ${logoColor}`}>
                VISIL<span className="text-primary">191</span>
              </div>
              <div
                className={`${isTamil ? "font-tamil-ui" : ""} text-[10px] leading-none mt-0.5 whitespace-nowrap ${
                  scrolled ? "text-muted-foreground" : "text-white/55"
                }`}
              >
                {brand.constituencyShort}
              </div>
            </div>
          </a>

          {/* Center nav — full-width overlay for true center */}
          <div className="hidden xl:flex absolute inset-0 items-center justify-center pointer-events-none z-10 px-[9.5rem]">
            <div
              className={`flex items-center justify-center pointer-events-auto max-w-full ${
                isTamil ? "gap-1.5 2xl:gap-3.5" : "gap-3 2xl:gap-5"
              }`}
            >
              {nav.links.map((l) => (
                <NavLinkItem
                  key={l.href + l.label}
                  link={l}
                  isTamil={isTamil}
                  textColor={textColor}
                  compact={isTamil}
                />
              ))}
            </div>
          </div>

          {/* Right: language + CTAs — fixed min-width column */}
          <div className={`relative z-20 flex items-center justify-end gap-1.5 sm:gap-2 ml-auto shrink-0 ${rightMinWidth}`}>
            <LanguageSwitcher scrolled={scrolled} />

            <a
              href="#track"
              className={`hidden md:inline-flex items-center justify-center ${
                isTamil ? "font-tamil-ui nav-tamil-link" : ""
              } whitespace-nowrap px-2.5 lg:px-3 py-1.5 rounded-full text-[11px] lg:text-xs font-medium border transition shrink-0 ${
                scrolled ? "btn-ghost-light" : "border-white/35 text-white hover:bg-white/10"
              }`}
            >
              {isTamil ? (
                <>
                  <span className="2xl:hidden">{nav.trackShort}</span>
                  <span className="hidden 2xl:inline">{nav.track}</span>
                </>
              ) : (
                <>
                  <span className="lg:hidden">{nav.trackShort}</span>
                  <span className="hidden lg:inline">{nav.track}</span>
                </>
              )}
            </a>
            <a
              href="#submit"
              className={`hidden md:inline-flex items-center justify-center btn-glow-red ${
                isTamil ? "font-tamil-ui nav-tamil-link" : ""
              } whitespace-nowrap px-2.5 lg:px-3.5 py-1.5 rounded-full text-[11px] lg:text-xs font-semibold shrink-0`}
            >
              {isTamil ? (
                <>
                  <span className="2xl:hidden">{nav.submitShort}</span>
                  <span className="hidden 2xl:inline">{nav.submit}</span>
                </>
              ) : (
                <>
                  <span className="lg:hidden">{nav.submitShort}</span>
                  <span className="hidden lg:inline">{nav.submit}</span>
                </>
              )}
            </a>

            <button
              aria-label={nav.menu}
              onClick={() => setOpen((o) => !o)}
              className="xl:hidden w-9 h-9 grid place-items-center rounded-lg glass shrink-0"
            >
              <div className="space-y-1.5">
                <span className="block w-4 h-px bg-foreground" />
                <span className="block w-4 h-px bg-foreground" />
                <span className="block w-4 h-px bg-foreground" />
              </div>
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="xl:hidden glass border-t border-white/10 mx-3 mb-2 rounded-2xl p-4 space-y-1">
          <div className="flex justify-end pb-2">
            <LanguageSwitcher scrolled={scrolled} compact />
          </div>
          {nav.links.map((l) => (
            <a
              key={l.href + l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`block ${isTamil ? "font-tamil-ui" : ""} text-foreground/85 font-medium py-2.5 px-2 rounded-lg hover:bg-foreground/5`}
            >
              {l.label}
            </a>
          ))}
          <div className="flex flex-col gap-2 pt-3 mt-2 border-t border-white/10">
            <a
              href="#track"
              onClick={() => setOpen(false)}
              className={`btn-ghost-light block text-center ${isTamil ? "font-tamil-ui" : ""} px-5 py-2.5 rounded-full text-sm font-medium`}
            >
              {nav.track}
            </a>
            <a
              href="#submit"
              onClick={() => setOpen(false)}
              className={`btn-glow-red block text-center ${isTamil ? "font-tamil-ui" : ""} px-5 py-3 rounded-full font-semibold`}
            >
              {nav.submit}
            </a>
          </div>
        </div>
      )}
    </motion.nav>
  );
}
