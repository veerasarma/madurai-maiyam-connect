import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { FormField, WardOption } from "@/api/types";
import { cn } from "@/lib/utils";

interface DynamicFieldProps {
  field: FormField;
  value: unknown;
  onChange: (value: unknown) => void;
  isTamil: boolean;
  wards?: WardOption[];
  error?: string;
  onFileChange?: (file: File | null) => void;
  fileName?: string | null;
}

export function DynamicField({
  field,
  value,
  onChange,
  isTamil,
  wards = [],
  error,
  onFileChange,
  fileName,
}: DynamicFieldProps) {
  const label = isTamil ? field.labelTa : field.label;
  const requiredMark = field.required ? (
    <span className="text-destructive" aria-hidden>
      {" "}
      *
    </span>
  ) : null;

  if (field.type === "radio" && field.options?.length) {
    return (
      <fieldset className="space-y-3">
        <legend className={cn("text-sm font-semibold", isTamil && "font-tamil")}>
          {label}
          {requiredMark}
        </legend>
        <RadioGroup
          value={String(value ?? "")}
          onValueChange={onChange}
          className="gap-2"
        >
          {field.options.map((opt) => (
            <label
              key={opt.value}
              className={cn(
                "flex cursor-pointer items-center gap-3 rounded-lg border border-border bg-card px-4 py-3 transition-colors",
                value === opt.value && "border-primary bg-primary/5",
              )}
            >
              <RadioGroupItem value={opt.value} id={`${field.key}-${opt.value}`} />
              <span className={cn("text-sm", isTamil && "font-tamil")}>
                {isTamil ? opt.labelTa : opt.label}
              </span>
            </label>
          ))}
        </RadioGroup>
        {error && <p className="text-sm text-destructive">{error}</p>}
      </fieldset>
    );
  }

  if (field.type === "select" && field.options?.length) {
    return (
      <div className="space-y-2 w-full">
        <Label className={cn("block", isTamil && "font-tamil")}>
          {label}
          {requiredMark}
        </Label>
        <Select value={String(value ?? "") || undefined} onValueChange={onChange}>
          <SelectTrigger className="w-full bg-background">
            <SelectValue placeholder={isTamil ? "தேர்வு செய்க" : "Select"} />
          </SelectTrigger>
          <SelectContent>
            {field.options.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                <span className={cn(isTamil && "font-tamil")}>
                  {isTamil ? opt.labelTa : opt.label}
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>
    );
  }

  if (field.type === "multi_checkbox" && field.options?.length) {
    const selected = Array.isArray(value) ? (value as string[]) : [];
    return (
      <fieldset className="space-y-3">
        <legend className={cn("text-sm font-semibold", isTamil && "font-tamil")}>
          {label}
          {requiredMark}
        </legend>
        <div className="space-y-2">
          {field.options.map((opt) => {
            const checked = selected.includes(opt.value);
            return (
              <label
                key={opt.value}
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-lg border border-border bg-card px-4 py-3",
                  checked && "border-primary bg-primary/5",
                )}
              >
                <Checkbox
                  checked={checked}
                  onCheckedChange={(next) => {
                    if (next) onChange([...selected, opt.value]);
                    else onChange(selected.filter((v) => v !== opt.value));
                  }}
                />
                <span className={cn("text-sm", isTamil && "font-tamil")}>
                  {isTamil ? opt.labelTa : opt.label}
                </span>
              </label>
            );
          })}
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
      </fieldset>
    );
  }

  if (field.type === "checkbox") {
    return (
      <div className="space-y-2">
        <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-border bg-card px-4 py-4">
          <Checkbox
            checked={Boolean(value)}
            onCheckedChange={(next) => onChange(Boolean(next))}
            className="mt-0.5"
          />
          <span className={cn("text-sm leading-relaxed", isTamil && "font-tamil")}>
            {label}
            {requiredMark}
          </span>
        </label>
        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>
    );
  }

  if (field.type === "ward_picker") {
    return (
      <div className="space-y-2">
        <Label className={cn(isTamil && "font-tamil")}>
          {label}
          {requiredMark}
        </Label>
        <Select value={String(value ?? "") || undefined} onValueChange={onChange}>
          <SelectTrigger className="w-full bg-card">
            <SelectValue placeholder={isTamil ? "வார்டு தேர்வு" : "Select ward"} />
          </SelectTrigger>
          <SelectContent>
            {wards.map((w) => (
              <SelectItem key={w.geographyId} value={w.geographyId}>
                <span className={cn(isTamil && "font-tamil")}>
                  {isTamil ? w.nameTa : w.name}
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>
    );
  }

  if (field.type === "file") {
    return (
      <div className="space-y-2 w-full">
        <Label className={cn("block leading-snug", isTamil && "font-tamil")}>
          {label}
          {requiredMark}
        </Label>
        <label
          className={cn(
            "flex w-full cursor-pointer items-center gap-3 rounded-lg border border-input bg-background px-3 py-2.5 transition-colors",
            "hover:border-primary/40 hover:bg-muted/40",
            error && "border-destructive",
          )}
        >
          <span className="inline-flex shrink-0 items-center justify-center rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground">
            {isTamil ? "கோப்பை தேர்வு" : "Choose file"}
          </span>
          <span
            className={cn(
              "min-w-0 flex-1 truncate text-sm",
              fileName ? "text-foreground" : "text-muted-foreground",
              isTamil && "font-tamil",
            )}
          >
            {fileName || (isTamil ? "கோப்பு தேர்வு செய்யவில்லை" : "No file chosen")}
          </span>
          <input
            type="file"
            accept=".pdf,.doc,.docx,image/*,video/mp4,video/quicktime"
            className="sr-only"
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              onFileChange?.(file);
              onChange(file ? file.name : "");
            }}
          />
        </label>
        <p className={cn("text-xs text-muted-foreground", isTamil && "font-tamil")}>
          {isTamil
            ? "PDF, ஆவணம், படம் அல்லது வீடியோ — அதிகபட்சம் 10 MB"
            : "PDF, document, image, or video — max 10 MB"}
        </p>
        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>
    );
  }

  if (field.type === "textarea") {
    return (
      <div className="space-y-2">
        <Label className={cn(isTamil && "font-tamil")}>
          {label}
          {requiredMark}
        </Label>
        <Textarea
          value={String(value ?? "")}
          onChange={(e) => onChange(e.target.value)}
          rows={5}
          className={cn("bg-card resize-y", isTamil && "font-tamil")}
        />
        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>
    );
  }

  const inputType =
    field.type === "number" ? "number" : field.type === "phone" ? "tel" : field.type === "url" ? "url" : "text";

  return (
    <div className="space-y-2">
      <Label className={cn(isTamil && "font-tamil")}>
        {label}
        {requiredMark}
      </Label>
      <Input
        type={inputType}
        value={String(value ?? "")}
        onChange={(e) =>
          onChange(field.type === "number" ? Number(e.target.value) : e.target.value)
        }
        className={cn("bg-card", isTamil && "font-tamil")}
        min={field.validation?.min}
        max={field.validation?.max}
      />
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
