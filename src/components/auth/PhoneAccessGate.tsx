import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCitizenAuth } from "@/auth/CitizenAuthContext";
import { ApiError } from "@/api/client";
import { cn } from "@/lib/utils";

interface PhoneAccessGateProps {
  isTamil: boolean;
  title: string;
  description: string;
  className?: string;
}

export function PhoneAccessGate({
  isTamil,
  title,
  description,
  className,
}: PhoneAccessGateProps) {
  const { phoneAccess } = useCitizenAuth();
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {
    const cleaned = phone.replace(/\D/g, "");
    if (cleaned.length < 10) {
      toast.error(isTamil ? "சரியான தொலைபேசி எண்ணை உள்ளிடவும்" : "Enter a valid mobile number");
      return;
    }
    setLoading(true);
    try {
      await phoneAccess(cleaned);
      toast.success(isTamil ? "தொடரலாம்" : "Continue — you're signed in");
    } catch (e) {
      toast.error(
        e instanceof ApiError
          ? e.message
          : isTamil
            ? "உள்நுழைவு தோல்வி"
            : "Could not sign in",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn("rounded-2xl border border-border bg-card p-4 sm:p-6 shadow-sm space-y-4 sm:space-y-5", className)}>
      <div>
        <h2 className={cn("text-lg sm:text-xl font-semibold break-words", isTamil && "font-tamil")}>{title}</h2>
        <p className={cn("mt-2 text-sm text-muted-foreground break-words", isTamil && "font-tamil")}>
          {description}
        </p>
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
          maxLength={15}
        />
      </div>

      <Button onClick={handleContinue} disabled={loading} className="w-full btn-glow-red">
        {loading
          ? isTamil
            ? "தொடர்கிறது…"
            : "Continuing…"
          : isTamil
            ? "தொடரவும்"
            : "Continue"}
      </Button>
    </div>
  );
}
