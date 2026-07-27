import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { LanguageProvider, useLanguage } from "@/i18n/LanguageContext";
import { CitizenAuthProvider } from "@/auth/CitizenAuthContext";
import { SubmitWizard } from "@/components/submit/SubmitWizard";
import { Navbar } from "@/components/landing/Navbar";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/submit")({
  component: SubmitPage,
});

function SubmitPage() {
  return (
    <LanguageProvider>
      <CitizenAuthProvider>
        <SubmitPageInner />
        <Toaster richColors position="top-center" />
      </CitizenAuthProvider>
    </LanguageProvider>
  );
}

function SubmitPageInner() {
  const { locale } = useLanguage();
  const isTamil = locale === "ta";

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at top, oklch(0.80 0.17 85 / 0.18), transparent 55%), radial-gradient(ellipse at bottom right, oklch(0.48 0.21 25 / 0.08), transparent 50%)",
        }}
      />

      <Navbar variant="inner" />

      <main className="relative z-10 container mx-auto max-w-2xl px-3 sm:px-6 pt-20 sm:pt-24 pb-10">
        <div className="mb-6 sm:mb-8 text-center space-y-2 px-1">
          <p className={cn("text-xs sm:text-sm text-muted-foreground break-words", isTamil && "font-tamil")}>
            {isTamil
              ? "உயர்திரு. விஜய் அன்பன் கல்லாணை.அ சட்டமன்ற உறுப்பினர் - மதுரை வடக்கு (191)"
              : "Hon. Vijay Anban Kallanai.A, MLA – Madurai North (191)"}
          </p>
          <h1 className={cn("text-xl sm:text-2xl md:text-3xl font-semibold break-words", isTamil && "font-tamil")}>
            {isTamil ? "குறை / கோரிக்கை பதிவு" : "Submit Grievance / Request"}
          </h1>
          <p className={cn("text-sm text-muted-foreground", isTamil && "font-tamil")}>
            {isTamil
              ? "கைபேசி ஆப் போன்றே அதே பின்தளத்தில் பதிவு செய்யப்படுகிறது."
              : "Uses the same backend as the Visil191 mobile app — visible in the admin panel."}
          </p>
        </div>

        <SubmitWizard isTamil={isTamil} />
      </main>
    </div>
  );
}
