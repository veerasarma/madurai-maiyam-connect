import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast, Toaster } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LanguageProvider, useLanguage } from "@/i18n/LanguageContext";
import { Navbar } from "@/components/landing/Navbar";
import { CitizenAuthProvider, useCitizenAuth } from "@/auth/CitizenAuthContext";
import { PhoneAccessGate } from "@/components/auth/PhoneAccessGate";
import { citizenApi } from "@/api/citizen";
import { ApiError } from "@/api/client";
import type { MyComplaintItem, TrackComplaintResult } from "@/api/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/track")({
  component: TrackPage,
});

function TrackPage() {
  return (
    <LanguageProvider>
      <CitizenAuthProvider>
        <TrackPageInner />
        <Toaster richColors position="top-center" />
      </CitizenAuthProvider>
    </LanguageProvider>
  );
}

function formatStatus(status: string): string {
  return status.replace(/_/g, " ");
}

function TrackResultCard({
  complaint,
  timeline,
  isTamil,
}: {
  complaint: TrackComplaintResult["complaint"];
  timeline: TrackComplaintResult["timeline"];
  isTamil: boolean;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 sm:p-6 space-y-4 shadow-sm">
      <h2 className="font-semibold text-primary font-mono text-sm sm:text-base break-all">{complaint.ticketNumber}</h2>
      <p>
        <span className="text-muted-foreground">{isTamil ? "நிலை" : "Status"}: </span>
        <span className="font-medium capitalize">{formatStatus(complaint.status)}</span>
      </p>
      {complaint.priority && (
        <p>
          <span className="text-muted-foreground">
            {isTamil ? "முன்னுரிமை" : "Priority"}:{" "}
          </span>
          <span className="capitalize">{complaint.priority}</span>
        </p>
      )}
      {complaint.description && (
        <p className={cn("text-sm", isTamil && "font-tamil")}>{complaint.description}</p>
      )}
      {complaint.incidentLocationText && (
        <p className="text-sm text-muted-foreground">{complaint.incidentLocationText}</p>
      )}
      {complaint.mapsLink && (
        <a
          href={complaint.mapsLink}
          target="_blank"
          rel="noreferrer"
          className="text-sm text-primary underline-offset-4 hover:underline"
        >
          {isTamil ? "வரைபட இணைப்பு" : "View map link"}
        </a>
      )}

      {timeline.length > 0 && (
        <div className="space-y-3 pt-2 border-t border-border">
          <h3 className={cn("text-sm font-semibold", isTamil && "font-tamil")}>
            {isTamil ? "நிலை பதிவு" : "Status history"}
          </h3>
          <ul className="space-y-2">
            {timeline.map((entry, idx) => (
              <li key={`${entry.action}-${entry.createdAt}-${idx}`} className="text-sm">
                <span className="font-medium capitalize">
                  {formatStatus(entry.toStatus || entry.action)}
                </span>
                <span className="text-muted-foreground">
                  {" "}
                  · {new Date(entry.createdAt).toLocaleString()}
                </span>
                {entry.note && (
                  <p className="text-muted-foreground mt-0.5">{entry.note}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function ManualTrackForm({
  isTamil,
  defaultPhone = "",
}: {
  isTamil: boolean;
  defaultPhone?: string;
}) {
  const [ticketNumber, setTicketNumber] = useState("");
  const [phone, setPhone] = useState(defaultPhone);

  const mutation = useMutation({
    mutationFn: (): Promise<TrackComplaintResult> =>
      citizenApi.trackComplaint(ticketNumber, phone),
    onError: (e) => {
      toast.error(
        e instanceof ApiError
          ? e.message
          : isTamil
            ? "மனு கிடைக்கவில்லை"
            : "Could not find complaint",
      );
    },
  });

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-border bg-card p-4 sm:p-6 space-y-4 shadow-sm">
        <div className="space-y-2">
          <Label className={cn(isTamil && "font-tamil")}>
            {isTamil ? "மனு எண்" : "Ticket number"}
          </Label>
          <Input
            value={ticketNumber}
            onChange={(e) => setTicketNumber(e.target.value.toUpperCase())}
            placeholder="VISIL-191-2026-00001"
          />
        </div>
        <div className="space-y-2">
          <Label className={cn(isTamil && "font-tamil")}>
            {isTamil ? "தொலைபேசி எண்" : "Mobile number"}
          </Label>
          <Input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="9876543210"
          />
        </div>
        <Button
          className="w-full btn-glow-red"
          disabled={mutation.isPending}
          onClick={() => {
            if (ticketNumber.trim().length < 5 || phone.replace(/\D/g, "").length < 10) {
              toast.error(
                isTamil
                  ? "மனு எண் மற்றும் தொலைபேசி எண்ணை சரியாக உள்ளிடவும்"
                  : "Enter a valid ticket number and phone",
              );
              return;
            }
            mutation.mutate();
          }}
        >
          {mutation.isPending
            ? isTamil
              ? "தேடுகிறது…"
              : "Searching…"
            : isTamil
              ? "நிலையை காட்டு"
              : "Track"}
        </Button>
      </div>

      {mutation.data?.complaint && (
        <TrackResultCard
          complaint={mutation.data.complaint}
          timeline={mutation.data.timeline || []}
          isTamil={isTamil}
        />
      )}
    </div>
  );
}

function TrackPageInner() {
  const { locale } = useLanguage();
  const isTamil = locale === "ta";
  const { isAuthenticated, user, logout } = useCitizenAuth();
  const [showManual, setShowManual] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const myQuery = useQuery({
    queryKey: ["my-complaints", user?.id],
    queryFn: () => citizenApi.getMyComplaints(),
    enabled: isAuthenticated,
  });

  const detailQuery = useQuery({
    queryKey: ["complaint-detail", selectedId],
    queryFn: () => citizenApi.getComplaintDetail(selectedId!),
    enabled: Boolean(isAuthenticated && selectedId),
  });

  const items = useMemo(
    () => (myQuery.data?.items || []) as MyComplaintItem[],
    [myQuery.data],
  );

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
            {isTamil ? "மனு நிலையை பார்க்கவும்" : "Track Complaint Status"}
          </h1>
          <p className={cn("text-sm text-muted-foreground", isTamil && "font-tamil")}>
            {isAuthenticated
              ? isTamil
                ? "உங்கள் புகார்களிலிருந்து தேர்ந்தெடுக்கவும் அல்லது டிக்கெட் எண்ணால் தேடவும்."
                : "Choose from your complaints or search by ticket number."
              : isTamil
                ? "தொலைபேசி எண்ணால் உள்நுழைந்து உங்கள் புகார்களைப் பார்க்கவும்."
                : "Sign in with your mobile number to list your complaints."}
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
          <>
            <PhoneAccessGate
              isTamil={isTamil}
              title={isTamil ? "தொலைபேசியால் தொடரவும்" : "Continue with mobile"}
              description={
                isTamil
                  ? "தொலைபேசி எண்ணை உள்ளிட்டு உங்கள் புகார் பட்டியலைப் பார்க்கவும்."
                  : "Enter your mobile number to view your complaint list."
              }
            />

            <button
              type="button"
              className={cn(
                "w-full text-sm font-medium text-primary hover:underline",
                isTamil && "font-tamil",
              )}
              onClick={() => setShowManual((v) => !v)}
            >
              {showManual
                ? isTamil
                  ? "கைமுறை தேடலை மறை"
                  : "Hide ticket search"
                : isTamil
                  ? "டிக்கெட் எண்ணால் தேட வேண்டுமா?"
                  : "Search by ticket number instead?"}
            </button>

            {showManual && <ManualTrackForm isTamil={isTamil} />}
          </>
        ) : (
          <>
            <div className="rounded-xl border border-border bg-card/80 px-4 py-3 text-sm">
              <span className={cn("text-muted-foreground", isTamil && "font-tamil")}>
                {isTamil ? "உள்நுழைந்துள்ளது" : "Signed in"}:
              </span>{" "}
              <span className="font-medium">{user?.phone}</span>
            </div>

            {myQuery.isLoading && (
              <p className="text-center text-sm text-muted-foreground">
                {isTamil ? "ஏற்றுகிறது…" : "Loading…"}
              </p>
            )}

            {myQuery.isError && (
              <div className="rounded-2xl border border-border bg-card p-4 text-center space-y-3">
                <p className="text-sm text-destructive">
                  {myQuery.error instanceof ApiError
                    ? myQuery.error.message
                    : isTamil
                      ? "பட்டியலை ஏற்ற முடியவில்லை"
                      : "Could not load complaints"}
                </p>
                <Button variant="outline" onClick={() => myQuery.refetch()}>
                  {isTamil ? "மீண்டும் முயற்சி" : "Retry"}
                </Button>
              </div>
            )}

            {!myQuery.isLoading && !myQuery.isError && items.length === 0 && (
              <p className={cn("text-center text-sm text-muted-foreground", isTamil && "font-tamil")}>
                {isTamil ? "புகார்கள் இல்லை" : "No complaints yet"}
              </p>
            )}

            <ul className="space-y-3">
              {items.map((item) => (
                <li key={item._id}>
                  <button
                    type="button"
                    onClick={() => setSelectedId(item._id)}
                    className={cn(
                      "w-full text-left rounded-2xl border bg-card p-4 shadow-sm transition hover:border-primary/40",
                      selectedId === item._id ? "border-primary" : "border-border",
                    )}
                  >
                    <div className="font-mono text-sm font-semibold text-primary">
                      {item.ticketNumber}
                    </div>
                    <div className="mt-1 text-xs capitalize text-muted-foreground">
                      {formatStatus(item.status)}
                    </div>
                    {item.description && (
                      <p className={cn("mt-2 line-clamp-2 text-sm", isTamil && "font-tamil")}>
                        {item.description}
                      </p>
                    )}
                  </button>
                </li>
              ))}
            </ul>

            {selectedId && detailQuery.isLoading && (
              <p className="text-center text-sm text-muted-foreground">
                {isTamil ? "விவரம் ஏற்றுகிறது…" : "Loading details…"}
              </p>
            )}

            {selectedId && detailQuery.data?.complaint && (
              <TrackResultCard
                complaint={detailQuery.data.complaint}
                timeline={detailQuery.data.timeline || []}
                isTamil={isTamil}
              />
            )}

            <button
              type="button"
              className={cn(
                "w-full text-sm font-medium text-primary hover:underline",
                isTamil && "font-tamil",
              )}
              onClick={() => setShowManual((v) => !v)}
            >
              {showManual
                ? isTamil
                  ? "கைமுறை தேடலை மறை"
                  : "Hide ticket search"
                : isTamil
                  ? "டிக்கெட் எண்ணால் தேட வேண்டுமா?"
                  : "Search by ticket number instead?"}
            </button>

            {showManual && (
              <ManualTrackForm isTamil={isTamil} defaultPhone={user?.phone || ""} />
            )}
          </>
        )}
      </main>
    </div>
  );
}
