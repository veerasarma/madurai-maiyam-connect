import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SuccessPanelProps {
  ticketNumber: string;
  isTamil: boolean;
  onAnother: () => void;
}

export function SuccessPanel({ ticketNumber, isTamil, onAnother }: SuccessPanelProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-8 shadow-sm text-center space-y-5">
      <div className="mx-auto h-1.5 w-24 rounded-full bg-primary" />
      <h2 className={cn("text-2xl font-semibold text-primary", isTamil && "font-tamil")}>
        {isTamil
          ? "உங்கள் மனு வெற்றிகரமாக பதிவு செய்யப்பட்டுள்ளது."
          : "Your petition has been successfully registered."}
      </h2>
      {ticketNumber && (
        <p className="text-lg font-mono font-semibold tracking-wide">{ticketNumber}</p>
      )}
      <p className={cn("text-sm text-muted-foreground leading-relaxed", isTamil && "font-tamil")}>
        {isTamil
          ? "மனு எண் WhatsApp / SMS மூலம் அனுப்பப்படும். அவசரத் தேவைக்கு அலுவலகத்தை நேரடியாக தொடர்பு கொள்ளவும்."
          : "Your petition number will also be shared via WhatsApp / SMS. For urgent needs, contact the office directly."}
      </p>
      <p className={cn("text-sm text-foreground/80", isTamil && "font-tamil")}>
        {isTamil
          ? "மக்கள் சேவை எங்கள் கடமை. மதுரை வடக்கின் குரல்… மக்கள் இதயத்திலிருந்து சட்டமன்றம் வரை!"
          : "Service to the people is our duty. The voice of Madurai North — from the people's hearts to the Assembly."}
      </p>
      <div className="flex flex-wrap justify-center gap-3 pt-2">
        <Button asChild variant="outline">
          <Link to="/track">{isTamil ? "மனு நிலையை பார்க்க" : "Track status"}</Link>
        </Button>
        <Button onClick={onAnother} className="btn-glow-red">
          {isTamil ? "மற்றொரு மனு பதிவு" : "Submit another"}
        </Button>
        <Button asChild variant="ghost">
          <Link to="/">{isTamil ? "முகப்பு" : "Home"}</Link>
        </Button>
      </div>
    </div>
  );
}
