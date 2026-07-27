import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useLanguage } from "@/i18n/LanguageContext";
import { LanguageSwitcher } from "@/components/landing/LanguageSwitcher";
import type { NavLink } from "@/content/landing";

/** Keep section links working from home and from /submit, /track, /volunteer */
function resolveNavHref(href: string): string {
  if (!href || href === "#") return "/";
  if (href.startsWith("#")) return `/${href}`;
  return href;
}

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
  const href = resolveNavHref(link.href);

  return (
    <a
      href={href}
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

type NavbarProps = {
  /** Inner pages use the solid scrolled look so menus stay readable on light backgrounds */
  variant?: "landing" | "inner";
};

export function Navbar({ variant = "landing" }: NavbarProps) {
  const { content, locale } = useLanguage();
  const { brand, nav } = content;
  const isInner = variant === "inner";
  const [scrolled, setScrolled] = useState(isInner);
  const [open, setOpen] = useState(false);
  const textColor = scrolled ? "text-foreground/75" : "text-white/90";
  const logoColor = scrolled ? "text-foreground" : "text-white";
  const isTamil = locale === "ta";

  useEffect(() => {
    if (isInner) {
      setScrolled(true);
      return;
    }
    const on = () => setScrolled(window.scrollY > 20);
    on();
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, [isInner]);

  // Close drawer when viewport is wide enough for the desktop menu
  useEffect(() => {
    const onResize = () => {
      if (window.matchMedia("(min-width: 1280px)").matches) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Lock body scroll while mobile menu is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass border-b border-foreground/5 shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-3 sm:px-6 max-w-full">
        <div className="relative flex items-center gap-2 h-14 lg:h-16 min-w-0">
          {/* Brand */}
          <a
            href="/"
            className="relative z-20 flex items-center gap-2 shrink-0 min-w-0 max-w-[42%] sm:max-w-none"
          >
            <img
              src="/ChatGPT_Image_May_26__2026_at_02_39_24_PM-removebg-preview.png"
              alt="Visil191 Logo"
              className="w-8 h-8 sm:w-10 sm:h-10 object-contain drop-shadow-lg shrink-0"
            />
            <div className="leading-tight hidden sm:block min-w-0">
              <div
                className={`font-display text-base sm:text-lg lg:text-xl tracking-wide whitespace-nowrap ${logoColor}`}
              >
                VISIL<span className="text-primary">191</span>
              </div>
              <div
                className={`${isTamil ? "font-tamil-ui" : ""} text-[9px] sm:text-[10px] leading-none mt-0.5 truncate max-w-[9rem] lg:max-w-none ${
                  scrolled ? "text-muted-foreground" : "text-white/55"
                }`}
              >
                {brand.constituencyShort}
              </div>
            </div>
          </a>

          {/* Center nav — desktop only */}
          <div className="hidden xl:flex absolute inset-0 items-center justify-center pointer-events-none z-10 px-[10rem] 2xl:px-[12rem]">
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

          {/* Right: language + CTAs + hamburger */}
          <div className="relative z-20 flex items-center justify-end gap-1 sm:gap-2 ml-auto shrink-0 min-w-0">
            <LanguageSwitcher scrolled={scrolled} compact />

            <a
              href="/track"
              className={`hidden lg:inline-flex items-center justify-center ${
                isTamil ? "font-tamil-ui nav-tamil-link" : ""
              } whitespace-nowrap px-2.5 xl:px-3 py-1.5 rounded-full text-[11px] xl:text-xs font-medium border transition shrink-0 ${
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
                  <span className="xl:hidden">{nav.trackShort}</span>
                  <span className="hidden xl:inline">{nav.track}</span>
                </>
              )}
            </a>
            <a
              href="/submit"
              className={`hidden lg:inline-flex items-center justify-center btn-glow-red ${
                isTamil ? "font-tamil-ui nav-tamil-link" : ""
              } whitespace-nowrap px-2.5 xl:px-3.5 py-1.5 rounded-full text-[11px] xl:text-xs font-semibold shrink-0`}
            >
              {isTamil ? (
                <>
                  <span className="2xl:hidden">{nav.submitShort}</span>
                  <span className="hidden 2xl:inline">{nav.submit}</span>
                </>
              ) : (
                <>
                  <span className="xl:hidden">{nav.submitShort}</span>
                  <span className="hidden xl:inline">{nav.submit}</span>
                </>
              )}
            </a>

            <button
              type="button"
              aria-label={nav.menu}
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
              className="xl:hidden w-9 h-9 grid place-items-center rounded-lg glass shrink-0"
            >
              <div className="space-y-1.5">
                <span className={`block w-4 h-px ${scrolled ? "bg-foreground" : "bg-white"}`} />
                <span className={`block w-4 h-px ${scrolled ? "bg-foreground" : "bg-white"}`} />
                <span className={`block w-4 h-px ${scrolled ? "bg-foreground" : "bg-white"}`} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="xl:hidden absolute left-0 right-0 top-full px-3 pb-3">
          <div className="glass border border-foreground/10 rounded-2xl p-3 sm:p-4 max-h-[min(70vh,32rem)] overflow-y-auto overscroll-contain shadow-elegant">
            <nav className="space-y-0.5" aria-label={nav.menu}>
              {nav.links.map((l) => (
                <a
                  key={l.href + l.label}
                  href={resolveNavHref(l.href)}
                  onClick={() => setOpen(false)}
                  className={`block ${isTamil ? "font-tamil-ui" : ""} text-foreground/85 font-medium py-2.5 px-3 rounded-lg hover:bg-foreground/5 active:bg-foreground/10`}
                >
                  {l.label}
                </a>
              ))}
            </nav>
            <div className="flex flex-col gap-2 pt-3 mt-2 border-t border-foreground/10">
              <a
                href="/track"
                onClick={() => setOpen(false)}
                className={`btn-ghost-light block text-center ${isTamil ? "font-tamil-ui" : ""} px-5 py-2.5 rounded-full text-sm font-medium`}
              >
                {nav.track}
              </a>
              <a
                href="/submit"
                onClick={() => setOpen(false)}
                className={`btn-glow-red block text-center ${isTamil ? "font-tamil-ui" : ""} px-5 py-3 rounded-full font-semibold`}
              >
                {nav.submit}
              </a>
              <a
                href="/volunteer"
                onClick={() => setOpen(false)}
                className={`block text-center border border-foreground/15 bg-background/60 ${isTamil ? "font-tamil-ui" : ""} px-5 py-2.5 rounded-full text-sm font-medium hover:bg-foreground/5`}
              >
                {isTamil ? "தன்னார்வலர்" : "Volunteer"}
              </a>
            </div>
          </div>
        </div>
      )}
    </motion.nav>
  );
}
