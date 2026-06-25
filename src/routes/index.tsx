import { createFileRoute } from "@tanstack/react-router";
import { LanguageProvider } from "@/i18n/LanguageContext";
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
  component: Index,
});

function Index() {
  return (
    <LanguageProvider>
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
    </LanguageProvider>
  );
}
