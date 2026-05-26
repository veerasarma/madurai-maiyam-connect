import { useEffect, useState } from "react";
import { motion } from "motion/react";

const links = [
  { label: "About", href: "#about" },
  { label: "Features", href: "#features" },
  { label: "Workflow", href: "#workflow" },
  { label: "Impact", href: "#impact" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on();
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass border-b border-foreground/5 py-3"
          : "py-5 bg-background/40 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary grid place-items-center font-display text-lg shadow-glow-red">
              <span className="text-white">V</span>
            </div>
          </div>
          <div className="leading-tight">
            <div className="font-display text-xl tracking-wide text-foreground">
              VISIL<span className="text-primary">191</span>
            </div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              TVK · Madurai North
            </div>
          </div>
        </a>

        <div className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-foreground/75 hover:text-primary transition relative group font-medium"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a href="#track" className="btn-ghost-light px-4 py-2 rounded-full text-sm font-medium">
            Track Status
          </a>
          <a href="#submit" className="btn-glow-red px-5 py-2.5 rounded-full text-sm font-semibold">
            Submit Issue
          </a>
        </div>

        <button
          aria-label="Menu"
          onClick={() => setOpen((o) => !o)}
          className="lg:hidden w-10 h-10 grid place-items-center rounded-lg glass"
        >
          <div className="space-y-1.5">
            <span className="block w-5 h-px bg-foreground" />
            <span className="block w-5 h-px bg-foreground" />
            <span className="block w-5 h-px bg-foreground" />
          </div>
        </button>
      </div>

      {open && (
        <div className="lg:hidden glass mt-3 mx-6 rounded-2xl p-6 space-y-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block text-foreground/80 font-medium"
            >
              {l.label}
            </a>
          ))}
          <a href="#submit" className="btn-glow-red block text-center px-5 py-3 rounded-full font-semibold">
            Submit Issue
          </a>
        </div>
      )}
    </motion.nav>
  );
}
