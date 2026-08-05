import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[var(--brand)]">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(700px 280px at 0% 0%, rgba(13, 115, 119, 0.28), transparent 55%), radial-gradient(520px 240px at 100% 100%, rgba(255, 255, 255, 0.06), transparent 50%)",
        }}
      />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-12 sm:px-10 sm:py-14">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-sm">
            <Link
              href="/"
              className="text-2xl tracking-tight text-white transition hover:text-white/90 sm:text-3xl"
              style={{ fontFamily: "var(--font-display), Georgia, serif" }}
            >
              ShopSphere
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-white/65">
              Everyday essentials, thoughtfully curated.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/75">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} ShopSphere. All rights reserved.</p>
          <Link href="/contact" className="transition hover:text-white/70">
            Get in touch
          </Link>
        </div>
      </div>
    </footer>
  );
}
