import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { citizenApi, uploadEvidenceFile } from "@/api/citizen";
import { ApiError } from "@/api/client";
import type { FormField, FormSection } from "@/api/types";
import { useCitizenAuth } from "@/auth/CitizenAuthContext";
import { DynamicField } from "@/components/submit/DynamicField";
import { SuccessPanel } from "@/components/submit/SuccessPanel";
import { mapFormPriorityToApi } from "@/lib/priority";
import { cn } from "@/lib/utils";

const STEP_SECTION_KEYS = [
  "petitioner_details",
  "grievance_category",
  "complaint_details",
  "priority_and_proof",
  "contact_preference",
  "consent",
] as const;

function labelForSection(section: FormSection | undefined, key: string, isTamil: boolean): string {
  if (section) return isTamil ? section.titleTa : section.title;
  const fallback: Record<string, [string, string]> = {
    petitioner_details: ["Petitioner Basic Details", "மனுதாரர் அடிப்படை விவரங்கள்"],
    grievance_category: ["Public Grievance Section", "மக்கள் கோரிக்கை பிரிவு"],
    complaint_details: ["Request / Complaint Details", "கோரிக்கை / குறை விவரம்"],
    priority_and_proof: ["Urgency & Proof", "அவசர நிலை / ஆதாரம்"],
    contact_preference: ["People's Feedback", "மக்கள் கருத்து"],
    consent: ["Consent", "உறுதிமொழி"],
  };
  const pair = fallback[key];
  return pair ? (isTamil ? pair[1] : pair[0]) : key;
}

function validateField(field: FormField, value: unknown, evidenceFile: File | null): string | null {
  if (!field.required) {
    if (field.type === "url" && value) {
      try {
        // eslint-disable-next-line no-new
        new URL(String(value));
      } catch {
        return "Must be a valid URL";
      }
    }
    return null;
  }

  if (field.type === "file") {
    if (!evidenceFile) return "Please upload a proof file";
    if (evidenceFile.size > 10 * 1024 * 1024) return "File must be 10 MB or less";
    return null;
  }

  if (field.type === "checkbox") {
    return value === true ? null : "Confirmation is required";
  }

  if (field.type === "multi_checkbox") {
    return Array.isArray(value) && value.length > 0 ? null : "Select at least one option";
  }

  if (field.type === "number") {
    const n = Number(value);
    if (!Number.isFinite(n)) return "Required";
    if (field.validation?.min != null && n < field.validation.min) return "Invalid value";
    if (field.validation?.max != null && n > field.validation.max) return "Invalid value";
    return null;
  }

  if (field.type === "phone") {
    const digits = String(value ?? "").replace(/\D/g, "");
    return digits.length >= 10 ? null : "Enter a valid phone number";
  }

  if (field.type === "url" && value) {
    try {
      // eslint-disable-next-line no-new
      new URL(String(value));
      return null;
    } catch {
      return "Must be a valid URL";
    }
  }

  const text = String(value ?? "").trim();
  if (!text) return "Required";
  if (field.key === "description" && text.length < 10) {
    return "Please write at least 10 characters";
  }
  return null;
}

interface SubmitWizardProps {
  isTamil: boolean;
}

export function SubmitWizard({ isTamil }: SubmitWizardProps) {
  const { isAuthenticated, user, logout } = useCitizenAuth();
  const [step, setStep] = useState(0);
  const [formValues, setFormValues] = useState<Record<string, unknown>>({});
  const [subCategoryId, setSubCategoryId] = useState("");
  const [evidenceFile, setEvidenceFile] = useState<File | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [ticketNumber, setTicketNumber] = useState<string | null>(null);

  const schemaQuery = useQuery({
    queryKey: ["complaint-schema"],
    queryFn: () => citizenApi.getComplaintSchema(),
  });

  const wardsQuery = useQuery({
    queryKey: ["ward-options"],
    queryFn: () => citizenApi.getWardOptions(),
  });

  const sections = schemaQuery.data?.sections || [];
  const categories = schemaQuery.data?.categories || [];
  const wards = wardsQuery.data || [];

  const sectionByKey = useMemo(() => {
    const map = new Map<string, FormSection>();
    for (const s of sections) map.set(s.key, s);
    return map;
  }, [sections]);

  const availableSteps = useMemo(() => {
    return STEP_SECTION_KEYS.filter((key) => {
      if (key === "grievance_category") return true;
      const section = sectionByKey.get(key);
      return Boolean(section?.fields?.length);
    });
  }, [sectionByKey]);

  const currentKey = availableSteps[step] || STEP_SECTION_KEYS[0];
  const currentSection = sectionByKey.get(currentKey);
  const progress = ((step + 1) / availableSteps.length) * 100;

  const setValue = (key: string, value: unknown) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
    setFieldErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const validateStep = (): boolean => {
    const errors: Record<string, string> = {};

    if (currentKey === "grievance_category") {
      if (!subCategoryId) {
        toast.error(isTamil ? "ஒரு பிரிவைத் தேர்ந்தெடுக்கவும்" : "Please select a category");
        return false;
      }
      return true;
    }

    const fields = currentSection?.fields || [];
    for (const field of fields) {
      const err = validateField(field, formValues[field.key], evidenceFile);
      if (err) errors[field.key] = err;
    }

    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) {
      toast.error(isTamil ? "தேவையான புலங்களை நிரப்பவும்" : "Please fill the required fields");
      return false;
    }
    return true;
  };

  const validateAllSteps = (): boolean => {
    const errors: Record<string, string> = {};

    if (!subCategoryId) {
      toast.error(isTamil ? "ஒரு பிரிவைத் தேர்ந்தெடுக்கவும்" : "Please select a category");
      return false;
    }

    for (const stepKey of availableSteps) {
      if (stepKey === "grievance_category") continue;
      const section = sectionByKey.get(stepKey);
      for (const field of section?.fields || []) {
        const err = validateField(field, formValues[field.key], evidenceFile);
        if (err) errors[field.key] = err;
      }
    }

    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) {
      toast.error(isTamil ? "தேவையான புலங்களை நிரப்பவும்" : "Please fill the required fields");
      return false;
    }
    return true;
  };

  const goNext = () => {
    if (!validateStep()) return;
    setStep((s) => Math.min(s + 1, availableSteps.length - 1));
  };

  const goBack = () => setStep((s) => Math.max(s - 1, 0));

  const handleSubmit = async () => {
    if (!validateAllSteps()) return;
    setSubmitting(true);
    try {
      const phone = String(formValues.mobile || "").replace(/\D/g, "");
      const name = String(formValues.name || "");

      let mediaIds: string[] = [];
      const requiresEvidence = (sectionByKey.get("priority_and_proof")?.fields || []).some(
        (field) => field.key === "evidence_file" && field.required,
      );

      if (requiresEvidence && !evidenceFile) {
        throw new Error(isTamil ? "ஆதார கோப்பை பதிவேற்றவும்" : "Please upload a proof file.");
      }

      if (evidenceFile) {
        const mediaId = await uploadEvidenceFile(evidenceFile, { phone, name });
        mediaIds = [mediaId];
      }

      const wardId = String(formValues.address_ward || "");
      const mapsLink = String(formValues.maps_link || "").trim();
      const priorityRaw = formValues.priority;

      const result = await citizenApi.submitComplaint({
        formResponses: Object.entries(formValues)
          .filter(([key]) => key !== "evidence_file")
          .map(([fieldKey, value]) => ({ fieldKey, value })),
        subCategoryId,
        description: String(formValues.description || "").trim(),
        incidentLocationText: String(formValues.incident_location || "").trim(),
        mapsLink: mapsLink || undefined,
        hierarchy: wardId ? { wardId } : undefined,
        mediaIds,
        priority: mapFormPriorityToApi(priorityRaw),
      });

      setTicketNumber(result.ticketNumber || "");
      toast.success(isTamil ? "மனு பதிவு செய்யப்பட்டது" : "Complaint submitted");
    } catch (e) {
      toast.error(e instanceof ApiError ? e.message : "Submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setStep(0);
    setFormValues({});
    setSubCategoryId("");
    setEvidenceFile(null);
    setFieldErrors({});
    setTicketNumber(null);
  };

  if (ticketNumber !== null) {
    return (
      <SuccessPanel
        ticketNumber={ticketNumber}
        isTamil={isTamil}
        onAnother={resetForm}
      />
    );
  }

  if (schemaQuery.isLoading || wardsQuery.isLoading) {
    return (
      <div className="rounded-2xl border border-border bg-card p-8 text-center text-muted-foreground">
        {isTamil ? "படிவம் ஏற்றப்படுகிறது…" : "Loading form…"}
      </div>
    );
  }

  if (schemaQuery.isError) {
    return (
      <div className="rounded-2xl border border-destructive/30 bg-card p-8 text-center space-y-4">
        <p className="text-destructive">
          {isTamil ? "படிவத்தை ஏற்ற முடியவில்லை" : "Could not load the complaint form"}
        </p>
        <Button onClick={() => schemaQuery.refetch()}>
          {isTamil ? "மீண்டும் முயற்சி" : "Retry"}
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {isAuthenticated && user ? (
        <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground">
          <span className={cn(isTamil && "font-tamil")}>
            {isTamil ? "உள்நுழைந்துள்ளது" : "Signed in"}: {user.phone}
          </span>
          <button
            type="button"
            onClick={logout}
            className="text-primary underline-offset-4 hover:underline"
          >
            {isTamil ? "வெளியேறு" : "Sign out"}
          </button>
        </div>
      ) : null}

      <div className="space-y-2">
        <div className="flex justify-between gap-3 text-xs text-muted-foreground">
          <span className="shrink-0">
            {isTamil ? "படி" : "Step"} {step + 1} / {availableSteps.length}
          </span>
          <span className={cn("font-medium text-foreground text-right min-w-0 truncate", isTamil && "font-tamil")}>
            {labelForSection(currentSection, currentKey, isTamil)}
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <div className="rounded-2xl border border-border bg-card/80 p-4 sm:p-6 shadow-sm space-y-5">
        <h2 className={cn("text-base sm:text-lg font-semibold text-primary break-words", isTamil && "font-tamil")}>
          {labelForSection(currentSection, currentKey, isTamil)}
        </h2>

        {currentKey === "grievance_category" && (
          <div className="space-y-5">
            <p className={cn("text-sm text-muted-foreground", isTamil && "font-tamil")}>
              {isTamil
                ? "8. உங்கள் கோரிக்கை எந்த பிரிவைச் சார்ந்தது? ஒரே ஒரு துணைப் பிரிவைத் தேர்ந்தெடுக்கவும்."
                : "8. Which section does your request belong to? Select one subcategory from any group."}
            </p>
            {categories.map((cat) => (
              <div key={cat._id} className="space-y-2">
                <Label className={cn("text-primary font-semibold", isTamil && "font-tamil")}>
                  {isTamil ? cat.nameTa : cat.name}
                </Label>
                <Select
                  value={
                    cat.subCategories.some((s) => s._id === subCategoryId)
                      ? subCategoryId
                      : undefined
                  }
                  onValueChange={(v) => {
                    if (v) setSubCategoryId(v);
                  }}
                >
                  <SelectTrigger className="w-full bg-background">
                    <SelectValue placeholder={isTamil ? "தேர்வு செய்க" : "Choose"} />
                  </SelectTrigger>
                  <SelectContent>
                    {cat.subCategories.map((sub) => (
                      <SelectItem key={sub._id} value={sub._id}>
                        <span className={cn(isTamil && "font-tamil")}>
                          {isTamil ? sub.nameTa : sub.name}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ))}
          </div>
        )}

        {currentKey !== "grievance_category" && (
          <div className="space-y-5">
            {(currentSection?.fields || []).map((field) => (
              <DynamicField
                key={field._id || field.key}
                field={field}
                value={formValues[field.key]}
                onChange={(v) => setValue(field.key, v)}
                isTamil={isTamil}
                wards={wards}
                error={fieldErrors[field.key]}
                onFileChange={(file) => {
                  setEvidenceFile(file);
                  setValue(field.key, file?.name || "");
                }}
                fileName={evidenceFile?.name}
              />
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button type="button" variant="outline" onClick={goBack} disabled={step === 0 || submitting} className="w-full sm:w-auto">
          {isTamil ? "பின்செல்" : "Back"}
        </Button>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              setFormValues({});
              setSubCategoryId("");
              setEvidenceFile(null);
              setFieldErrors({});
              setStep(0);
            }}
            disabled={submitting}
            className="w-full sm:w-auto"
          >
            {isTamil ? "படிவத்தை அழி" : "Clear form"}
          </Button>
          {step < availableSteps.length - 1 ? (
            <Button type="button" onClick={goNext} className="btn-glow-red w-full sm:min-w-28 sm:w-auto">
              {isTamil ? "அடுத்து" : "Next"}
            </Button>
          ) : (
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={submitting}
              className="btn-glow-red w-full sm:min-w-28 sm:w-auto"
            >
              {submitting
                ? isTamil
                  ? "சமர்ப்பிக்கிறது…"
                  : "Submitting…"
                : isTamil
                  ? "சமர்ப்பி"
                  : "Submit"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
