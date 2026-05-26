export function CTA() {
  return (
    <section id="submit" className="relative py-24">
      <div className="container mx-auto px-6">
        <div className="relative overflow-hidden rounded-[2.5rem] glass-gold p-12 md:p-20 text-center">
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-primary/40 blur-[100px]" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-gold/40 blur-[100px]" />
          <div className="relative">
            <div className="text-xs uppercase tracking-[0.3em] text-gold mb-4">Your Voice Matters</div>
            <h2 className="font-display text-4xl md:text-6xl leading-tight mb-6 max-w-3xl mx-auto">
              Have an issue in your ward? <span className="text-gradient-red">Tell us now.</span>
            </h2>
            <p className="text-lg text-foreground/75 max-w-2xl mx-auto mb-10">
              Every submission is logged, routed and tracked until it's solved. No
              passing the parcel — just service.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="#" className="btn-glow-red px-8 py-4 rounded-full font-semibold">Submit Your Issue</a>
              <a href="#" className="btn-glow-gold px-8 py-4 rounded-full font-semibold">Track Status</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
