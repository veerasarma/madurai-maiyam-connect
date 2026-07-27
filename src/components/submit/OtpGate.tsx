import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCitizenAuth } from "@/auth/CitizenAuthContext";
import { ApiError } from "@/api/client";
import { cn } from "@/lib/utils";

interface OtpGateProps {
  isTamil: boolean;
}

export function OtpGate({ isTamil }: OtpGateProps) {
  const { sendOtp, verifyOtp } = useCitizenAuth();
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [devHint, setDevHint] = useState<string | null>(null);

  const handleSend = async () => {
    const cleaned = phone.replace(/\D/g, "");
    if (cleaned.length < 10) {
      toast.error(isTamil ? "சரியான தொலைபேசி எண்ணை உள்ளிடவும்" : "Enter a valid mobile number");
      return;
    }
    setLoading(true);
    try {
      const result = await sendOtp(cleaned);
      setPhone(cleaned);
      setOtpSent(true);
      if (result.devOtp) setDevHint(result.devOtp);
      toast.success(isTamil ? "OTP அனுப்பப்பட்டது" : "OTP sent");
    } catch (e) {
      toast.error(e instanceof ApiError ? e.message : "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    if (otp.length !== 6) {
      toast.error(isTamil ? "6 இலக்க OTP உள்ளிடவும்" : "Enter the 6-digit OTP");
      return;
    }
    setLoading(true);
    try {
      await verifyOtp(phone, otp);
      toast.success(isTamil ? "உள்நுழைவு வெற்றி" : "Logged in successfully");
    } catch (e) {
      toast.error(e instanceof ApiError ? e.message : "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-5">
      <div>
        <h2 className={cn("text-xl font-semibold", isTamil && "font-tamil")}>
          {isTamil ? "மனு பதிவு செய்ய உள்நுழையவும்" : "Sign in to submit a grievance"}
        </h2>
        <p className={cn("mt-2 text-sm text-muted-foreground", isTamil && "font-tamil")}>
          {isTamil
            ? "மொபைல் எண்ணுக்கு OTP அனுப்பி உறுதிப்படுத்தவும். இது கைபேசி ஆப் போலவே உள்ளது."
            : "Verify your mobile with OTP — same secure flow as the Visil191 mobile app."}
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
          disabled={otpSent}
        />
      </div>

      {otpSent && (
        <div className="space-y-2">
          <Label>OTP</Label>
          <Input
            type="text"
            inputMode="numeric"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
            placeholder="123456"
            maxLength={6}
          />
          {devHint && (
            <p className="text-xs text-muted-foreground">Dev OTP: {devHint}</p>
          )}
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        {!otpSent ? (
          <Button onClick={handleSend} disabled={loading} className="btn-glow-red">
            {loading
              ? isTamil
                ? "அனுப்புகிறது…"
                : "Sending…"
              : isTamil
                ? "OTP அனுப்பு"
                : "Send OTP"}
          </Button>
        ) : (
          <>
            <Button onClick={handleVerify} disabled={loading} className="btn-glow-red">
              {loading
                ? isTamil
                  ? "சரிபார்க்கிறது…"
                  : "Verifying…"
                : isTamil
                  ? "உறுதிப்படுத்து"
                  : "Verify & Continue"}
            </Button>
            <Button
              type="button"
              variant="outline"
              disabled={loading}
              onClick={() => {
                setOtpSent(false);
                setOtp("");
                setDevHint(null);
              }}
            >
              {isTamil ? "எண்ணை மாற்று" : "Change number"}
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
