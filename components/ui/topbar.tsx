type TopbarProps = {
    title?: string;
    onMenuClick?: () => void;
  };
  
  export default function Topbar({ title = 'Overview', onMenuClick }: TopbarProps) {
    return (
      <header className="fixed top-0 right-0 left-0 z-20 border-b border-[var(--brand)]/10 bg-[#eef3f0]/90 backdrop-blur-md lg:left-[18rem]">
        <div className="flex h-14 items-center gap-3 px-4 sm:px-6 lg:px-8">
          <button
            type="button"
            aria-label="Open menu"
            className="grid h-9 w-9 place-items-center text-[var(--muted)] transition hover:text-[var(--brand)] lg:hidden"
            onClick={onMenuClick}
          >
            {/* hamburger icon — 3 horizontal lines */}
          </button>
          <h1
            className="text-lg tracking-tight text-[var(--brand)] sm:text-xl"
            style={{ fontFamily: 'var(--font-display), Georgia, serif' }}
          >
            {title}
          </h1>
        </div>
      </header>
    );
  }