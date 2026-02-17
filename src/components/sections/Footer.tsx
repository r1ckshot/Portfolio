export function Footer() {
  return (
    <footer className="py-8 text-center text-lg text-text-secondary">
      <div className="flex items-center justify-center gap-4">
        {/* Left particle */}
        <div className="hidden md:block w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_12px_var(--primary),0_0_20px_var(--primary)]" />

        <p>
          &copy; 2026{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-light">
            Mykhailo Kapustianyk
          </span>
          . All rights reserved.
        </p>

        {/* Right particle */}
        <div className="hidden md:block w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_12px_var(--primary),0_0_20px_var(--primary)]" />
      </div>
    </footer>
  );
}
