import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { About } from "@/components/landing/About";
import { Features } from "@/components/landing/Features";
import { Workflow } from "@/components/landing/Workflow";
import { Impact } from "@/components/landing/Impact";
import { Team } from "@/components/landing/Team";
import { MobileApp } from "@/components/landing/MobileApp";
import { Testimonials } from "@/components/landing/Testimonials";
import { CTA } from "@/components/landing/CTA";
import { Footer } from "@/components/landing/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Visil191 — Voice of Madurai North | TVK" },
      {
        name: "description",
        content:
          "Visil191 by TVK Madurai North — submit issues, track complaints, and join a transparent, citizen-first digital governance movement.",
      },
      { property: "og:title", content: "Visil191 — Voice of Madurai North" },
      { property: "og:description", content: "Connecting People. Solving Problems. Building a Better Madurai." },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600;700&family=Noto+Sans+Tamil:wght@400;600&display=swap",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Features />
      <Workflow />
      <Impact />
      <MobileApp />
      <Team />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  );
}
