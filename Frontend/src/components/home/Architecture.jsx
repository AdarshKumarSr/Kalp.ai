export default function Architecture() {
  return (
    <section className="w-full px-6 py-24 bg-muted text-main">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-12">

        {/* ===== Title ===== */}
        <h2 className="text-3xl md:text-4xl font-serif italic">
          How the Platform Works
        </h2>

        {/* ===== Diagram Card ===== */}
        <div className="w-full bg-card rounded-[2.5rem] border border-app px-8 py-16 relative">

          {/* Horizontal line */}
          <div className="absolute left-0 right-0 top-1/2 h-px bg-border-app" />

          {/* Nodes */}
          <div className="relative z-10 grid grid-cols-4 gap-6 items-center">

            {/* Researcher */}
            <div className="flex flex-col items-center gap-4">
              <div className="size-4 rounded-full bg-card border-4 border-primary" />
              <span className="text-xs tracking-widest font-bold uppercase">
                Researcher
              </span>
            </div>

            {/* Publish */}
            <div className="flex flex-col items-center gap-4">
              <div className="size-4 rounded-full bg-card border-4 border-muted" />
              <span className="text-xs tracking-widest font-bold uppercase text-muted">
                Publish Research
              </span>
            </div>

            {/* Explorer */}
            <div className="flex flex-col items-center gap-4">
              <div className="size-4 rounded-full bg-card border-4 border-muted" />
              <span className="text-xs tracking-widest font-bold uppercase text-muted">
                Explorer
              </span>
            </div>

            {/* Read */}
            <div className="flex flex-col items-center gap-4">
              <div className="size-4 rounded-full bg-card border-4 border-muted" />
              <span className="text-xs tracking-widest font-bold uppercase text-muted">
                Read & Discover
              </span>
            </div>

          </div>
        </div>

        {/* ===== Description ===== */}
        <p className="text-muted max-w-lg leading-relaxed">
          Researchers publish their work, while explorers read and discover research shared by the community.
        </p>

      </div>
    </section>
  );
}
