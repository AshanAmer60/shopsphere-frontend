"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { user, loading, logout: authLogout } = useAuth();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const logout = async () => {
    setMenuOpen(false);
    await authLogout();
    router.push("/");
  };

  useEffect(() => {
    if (!menuOpen) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  const initials = user?.name?.trim()?.charAt(0).toUpperCase() ?? "?";

  return (
    <header className="flex items-center justify-between gap-4">
      <Link href="/" className="flex min-w-0 items-center gap-3">
        <Image
          src="/logo.png"
          alt="ShopSphere"
          width={48}
          height={48}
          priority
          className="h-12 w-12 shrink-0 rounded-full object-cover"
        />
        <span
          className="truncate text-lg tracking-tight text-white sm:text-xl"
          style={{ fontFamily: "var(--font-display), Georgia, serif" }}
        >
          ShopSphere
        </span>
      </Link>

      <nav className="hidden items-center gap-6 text-sm text-white/85 md:flex">
        <Link href="/" className="transition hover:text-white">Home</Link>
        <Link href="/products" className="transition hover:text-white">Products</Link>
        <Link href="/about" className="transition hover:text-white">About</Link>
        <Link href="/contact" className="transition hover:text-white">Contact</Link>
      </nav>

      <div className="flex items-center gap-3 text-sm text-white/85">
        {loading ? (
          <div className="h-9 w-9 animate-pulse rounded-full bg-white/20" aria-hidden />
        ) : user ? (
          <div className="relative" ref={menuRef}>
            <button
              type="button"
              aria-haspopup="menu"
              aria-expanded={menuOpen}
              aria-label="Open profile menu"
              onClick={() => setMenuOpen((open) => !open)}
              className="grid h-9 w-9 cursor-pointer place-items-center rounded-full bg-white text-sm font-semibold text-[var(--brand)] transition hover:bg-white/90"
            >
              {initials}
            </button>

            {menuOpen && (
              <div
                role="menu"
                className="absolute right-0 z-50 mt-2 w-48 overflow-hidden rounded-xl border border-[var(--field-border)] bg-white py-1 shadow-[0_12px_32px_rgba(20,61,53,0.16)]"
              >
                <p className="truncate px-3 py-2.5 text-sm font-semibold text-[var(--brand)]">
                  {user.name}
                </p>
                <button
                  type="button"
                  role="menuitem"
                  onClick={logout}
                  className="w-full cursor-pointer border-t border-[var(--field-border)] px-3 py-2.5 text-left text-sm font-medium text-[var(--brand)] transition hover:bg-[rgba(13,115,119,0.08)] hover:text-[var(--accent)]"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link href="/signin" className="transition hover:text-white">
              Sign in
            </Link>
            <Link
              href="/signup"
              className="border border-white/35 px-3 py-1.5 transition hover:border-white hover:bg-white/10"
            >
              Sign up
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
