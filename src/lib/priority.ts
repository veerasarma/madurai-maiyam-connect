/** Map Google-Form style priority values to backend SLA enum (same as backend helper). */
export function mapFormPriorityToApi(value: unknown): "normal" | "urgent" | "emergency" {
  const raw = String(value ?? "").trim().toLowerCase();
  if (raw === "emergency" || raw === "very_urgent") return "emergency";
  if (raw === "urgent" || raw === "action_24h" || raw === "action_3days" || raw === "24h") {
    return "urgent";
  }
  return "normal";
}
