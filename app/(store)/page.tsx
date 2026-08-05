"use client";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
export default function Home() {
  const { loading } = useAuth();
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="flex flex-1 flex-col">
      <section className="relative min-h-dvh overflow-hidden">
        {/* Full-bleed hero image */}
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=2400&q=80"
            alt="Sunlit retail space with curated clothing and lifestyle goods"
            className="home-hero-media h-full w-full object-cover object-center"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(105deg, rgba(20, 61, 53, 0.88) 0%, rgba(20, 61, 53, 0.62) 42%, rgba(20, 61, 53, 0.2) 70%, rgba(20, 61, 53, 0.08) 100%)",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto flex min-h-dvh w-full max-w-6xl flex-col px-6 py-8 sm:px-10">

          <div className="flex flex-1 flex-col justify-center pb-16 pt-20 sm:max-w-xl sm:pb-24">
            <p
              className="home-rise text-5xl leading-[0.95] tracking-tight text-white sm:text-6xl md:text-7xl"
              style={{ fontFamily: "var(--font-display), Georgia, serif" }}
            >
              ShopSphere
            </p>
            <h1 className="home-rise-delay mt-5 text-xl font-medium text-white/95 sm:text-2xl">
              Everyday essentials, thoughtfully curated.
            </h1>
            <p className="home-rise-delay mt-4 max-w-md text-base leading-relaxed text-white/75 sm:text-lg">
              A calmer way to discover quality pieces for your home and wardrobe.
            </p>
            <div className="home-rise-delay-2 mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/signup"
                className="bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--accent-hover)]"
              >
                Get Started
              </Link>

            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--brand)]/10 bg-[#eef3f0] px-6 py-20 sm:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            className="text-3xl tracking-tight text-[var(--brand)] sm:text-4xl"
            style={{ fontFamily: "var(--font-display), Georgia, serif" }}
          >
            Built for modern living
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[var(--muted)] leading-relaxed">
            ShopSphere brings together products, secure checkout, and a personal
            account experience—so finding what you need feels simple from the
            first visit.
          </p>
        </div>
      </section>
    </main>
  );
}
