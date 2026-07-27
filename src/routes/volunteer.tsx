import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast, Toaster } from "sonner";
import { Button } from "@/components/ui/button";
import { LanguageProvider, useLanguage } from "@/i18n/LanguageContext";
import { Navbar } from "@/components/landing/Navbar";
import { CitizenAuthProvider, useCitizenAuth } from "@/auth/CitizenAuthContext";
import { PhoneAccessGate } from "@/components/auth/PhoneAccessGate";
import { citizenApi } from "@/api/citizen";
import { ApiError } from "@/api/client";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/volunteer")({
  component: VolunteerPage,
});

function VolunteerPage() {
  return (
    <LanguageProvider>
      <CitizenAuthProvider>
        <VolunteerPageInner />
        <Toaster richColors position="top-center" />
      </CitizenAuthProvider>
    </LanguageProvider>
  );
}

function formatStatus(status: string): string {
  return status.replace(/_/g, " ");
}

function VolunteerPageInner() {
  const { locale } = useLanguage();
  const isTamil = locale === "ta";
  const { isAuthenticated, user, logout, phoneAccess } = useCitizenAuth();
  const queryClient = useQueryClient();
  const [appliedLocally, setAppliedLocally] = useState(false);

  const isVolunteer = user?.role === "volunteer";

  const tasksQuery = useQuery({
    queryKey: ["volunteer-tasks", user?.id],
    queryFn: () => citizenApi.getVolunteerTasks(),
    enabled: isAuthenticated && isVolunteer,
    retry: false,
  });

  const applyMutation = useMutation({
    mutationFn: () => citizenApi.applyVolunteer({ skills: ["field-work"] }),
    onSuccess: async () => {
      setAppliedLocally(true);
      toast.success(
        isTamil
          ? "தன்னார்வலர் விண்ணப்பம் சமர்ப்பிக்கப்பட்டது"
          : "Volunteer application submitted",
      );
      // Refresh JWT so role becomes volunteer (needed for my-tasks)
      if (user?.phone) {
        try {
          await phoneAccess(user.phone);
          await queryClient.invalidateQueries({ queryKey: ["volunteer-tasks"] });
        } catch {
          // Application succeeded; token refresh can be done by signing in again
        }
      }
    },
    onError: (e) => {
      toast.error(
        e instanceof ApiError
          ? e.message
          : isTamil
            ? "விண்ணப்பம் தோல்வி"
            : "Could not submit application",
      );
    },
  });

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at top, oklch(0.80 0.17 85 / 0.18), transparent 55%)",
        }}
      />

      <Navbar variant="inner" />

      <main className="relative z-10 container mx-auto max-w-lg px-3 sm:px-6 pt-20 sm:pt-24 pb-10 space-y-5 sm:space-y-6">
        <div className="text-center space-y-2 px-1">
          <h1 className={cn("text-xl sm:text-2xl font-semibold break-words", isTamil && "font-tamil")}>
            {isTamil ? "தன்னார்வலர் அணுகல்" : "Volunteer access"}
          </h1>
          <p className={cn("text-sm text-muted-foreground", isTamil && "font-tamil")}>
            {isTamil
              ? "தொலைபேசி எண்ணால் உள்நுழைந்து விண்ணப்பிக்கவும் அல்லது ஒதுக்கப்பட்ட பணிகளைப் பார்க்கவும்."
              : "Sign in with your mobile number to apply, or view assigned tasks."}
          </p>
        </div>

        {isAuthenticated && (
          <div className="flex justify-end">
            <button
              type="button"
              onClick={logout}
              className={cn(
                "text-sm font-medium text-muted-foreground hover:text-primary",
                isTamil && "font-tamil",
              )}
            >
              {isTamil ? "வெளியேறு" : "Sign out"}
            </button>
          </div>
        )}

        {!isAuthenticated ? (
          <PhoneAccessGate
            isTamil={isTamil}
            title={isTamil ? "தொலைபேசியால் தொடரவும்" : "Continue with mobile"}
            description={
              isTamil
                ? "தொலைபேசி எண்ணை உள்ளிட்டு தன்னார்வலர் பதிவு / பணிகளை அணுகவும்."
                : "Enter your mobile number to apply as a volunteer or open your tasks."
            }
          />
        ) : (
          <>
            <div className="rounded-xl border border-border bg-card/80 px-4 py-3 text-sm space-y-1">
              <div>
                <span className={cn("text-muted-foreground", isTamil && "font-tamil")}>
                  {isTamil ? "உள்நுழைந்துள்ளது" : "Signed in"}:
                </span>{" "}
                <span className="font-medium">{user?.phone}</span>
              </div>
              <div>
                <span className={cn("text-muted-foreground", isTamil && "font-tamil")}>
                  {isTamil ? "பங்கு" : "Role"}:
                </span>{" "}
                <span className="capitalize font-medium">{user?.role}</span>
              </div>
            </div>

            {!isVolunteer && (
              <div className="rounded-2xl border border-border bg-card p-6 space-y-4 shadow-sm">
                <p className={cn("text-sm text-muted-foreground", isTamil && "font-tamil")}>
                  {appliedLocally
                    ? isTamil
                      ? "விண்ணப்பம் பதிவு செய்யப்பட்டது. நிர்வாகி ஒப்புதலுக்குப் பிறகு பணிகள் தெரியும்."
                      : "Application recorded. Tasks appear after admin approval."
                    : isTamil
                      ? "களப்பணியில் உதவ தன்னார்வலராக விண்ணப்பிக்கவும். நிர்வாகி ஒப்புதல் தேவை."
                      : "Apply to help with field work. Admin approval is required."}
                </p>
                <Button
                  className="w-full btn-glow-gold"
                  disabled={applyMutation.isPending || appliedLocally}
                  onClick={() => applyMutation.mutate()}
                >
                  {applyMutation.isPending
                    ? isTamil
                      ? "சமர்ப்பிக்கிறது…"
                      : "Submitting…"
                    : appliedLocally
                      ? isTamil
                        ? "விண்ணப்பம் சமர்ப்பிக்கப்பட்டது"
                        : "Application submitted"
                      : isTamil
                        ? "தன்னார்வலராக பதிவு"
                        : "Apply as Volunteer"}
                </Button>
              </div>
            )}

            {isVolunteer && (
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <h2 className={cn("text-lg font-semibold", isTamil && "font-tamil")}>
                    {isTamil ? "என் பணிகள்" : "My tasks"}
                  </h2>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => tasksQuery.refetch()}
                    disabled={tasksQuery.isFetching}
                  >
                    {isTamil ? "புதுப்பி" : "Refresh"}
                  </Button>
                </div>

                {tasksQuery.isLoading && (
                  <p className="text-center text-sm text-muted-foreground">
                    {isTamil ? "ஏற்றுகிறது…" : "Loading…"}
                  </p>
                )}

                {tasksQuery.isError && (
                  <div className="rounded-2xl border border-border bg-card p-4 text-center space-y-3">
                    <p className="text-sm text-muted-foreground">
                      {tasksQuery.error instanceof ApiError
                        ? tasksQuery.error.message
                        : isTamil
                          ? "பணிகள் கிடைக்கவில்லை. ஒப்புதல் நிலுவையில் இருக்கலாம்."
                          : "No tasks available yet. Approval may still be pending."}
                    </p>
                    <Button
                      className="btn-glow-gold"
                      disabled={applyMutation.isPending}
                      onClick={() => applyMutation.mutate()}
                    >
                      {isTamil ? "மீண்டும் விண்ணப்பி / புதுப்பி" : "Re-apply / refresh profile"}
                    </Button>
                  </div>
                )}

                {!tasksQuery.isLoading &&
                  !tasksQuery.isError &&
                  (tasksQuery.data || []).length === 0 && (
                    <p className={cn("text-center text-sm text-muted-foreground", isTamil && "font-tamil")}>
                      {isTamil
                        ? "இப்போது ஒதுக்கப்பட்ட பணிகள் இல்லை."
                        : "No tasks assigned yet."}
                    </p>
                  )}

                <ul className="space-y-3">
                  {(tasksQuery.data || []).map((task) => (
                    <li
                      key={task._id}
                      className="rounded-2xl border border-border bg-card p-4 shadow-sm space-y-1"
                    >
                      <div className="font-mono text-sm font-semibold text-primary">
                        {task.ticketNumber}
                      </div>
                      <div className="text-xs capitalize text-muted-foreground">
                        {formatStatus(task.status)}
                      </div>
                      {task.description && (
                        <p className={cn("text-sm pt-1", isTamil && "font-tamil")}>
                          {task.description}
                        </p>
                      )}
                      {task.incidentLocationText && (
                        <p className="text-xs text-muted-foreground">{task.incidentLocationText}</p>
                      )}
                    </li>
                  ))}
                </ul>

                <p className={cn("text-xs text-muted-foreground text-center", isTamil && "font-tamil")}>
                  {isTamil
                    ? "பணி நிலை புதுப்பிப்புக்கு Visil191 கைபேசி ஆப்பைப் பயன்படுத்தவும்."
                    : "Use the Visil191 mobile app to update task progress in the field."}
                </p>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
