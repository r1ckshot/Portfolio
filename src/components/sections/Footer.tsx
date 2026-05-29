import ShinyText from "@/components/ui/ShinyText";

export function Footer() {
  return (
    <footer className="py-8 text-center text-lg text-text-secondary">
      <div className="flex items-center justify-center gap-4">
        <div className="hidden md:block w-3 h-3 rounded-full bg-primary animate-pulse-glow-strong" />

        <p>
          &copy; 2026{" "}
          <ShinyText text="Mykhailo Kapustianyk" speed={5} color="#4CAF50" shineColor="#c8ffc8" />
          . All rights reserved.
        </p>

        <div className="hidden md:block w-3 h-3 rounded-full bg-primary animate-pulse-glow-strong" />
      </div>
    </footer>
  );
}
