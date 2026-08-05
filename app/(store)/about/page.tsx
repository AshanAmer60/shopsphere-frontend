import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="flex flex-1 flex-col">
      <section className="relative min-h-[70dvh] overflow-hidden sm:min-h-[75dvh]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=2400&q=80"
          alt="Curated retail shelves with everyday essentials"
          className="home-hero-media absolute inset-0 h-full w-full object-cover object-center"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, rgba(20, 61, 53, 0.9) 0%, rgba(20, 61, 53, 0.68) 45%, rgba(20, 61, 53, 0.28) 72%, rgba(20, 61, 53, 0.1) 100%)",
          }}
        />

        <div className="relative z-10 mx-auto flex min-h-[70dvh] w-full max-w-6xl flex-col justify-center px-6 py-16 sm:min-h-[75dvh] sm:px-10 sm:py-20">
          <p
            className="home-rise text-5xl leading-[0.95] tracking-tight text-white sm:text-6xl md:text-7xl"
            style={{ fontFamily: "var(--font-display), Georgia, serif" }}
          >
            ShopSphere
          </p>
          <h1 className="home-rise-delay mt-5 max-w-lg text-xl font-medium text-white/95 sm:text-2xl">
            A calmer place to shop for what lasts.
          </h1>
          <p className="home-rise-delay mt-4 max-w-md text-base leading-relaxed text-white/75 sm:text-lg">
            We curate everyday essentials with care—so choosing well feels
            simple, not overwhelming.
          </p>
          <div className="home-rise-delay-2 mt-8">
            <Link
              href="/products"
              className="inline-block bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--accent-hover)]"
            >
              Browse products
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--brand)]/10 bg-[#eef3f0] px-6 py-20 sm:px-10 sm:py-24">
        <div className="mx-auto max-w-2xl">
          <h2
            className="text-3xl tracking-tight text-[var(--brand)] sm:text-4xl"
            style={{ fontFamily: "var(--font-display), Georgia, serif" }}
          >
            Why we exist
          </h2>
          <p className="mt-5 text-base leading-relaxed text-[var(--muted)] sm:text-lg">
            Shopping should feel considered. ShopSphere brings together quality
            products, a clear catalog, and a personal account experience—so you
            can find what you need without the noise.
          </p>
        </div>
      </section>

      <section className="relative overflow-hidden px-6 py-20 sm:px-10 sm:py-24">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(800px 360px at 10% 0%, rgba(13, 115, 119, 0.14), transparent 55%), radial-gradient(640px 320px at 100% 100%, rgba(20, 61, 53, 0.1), transparent 50%), linear-gradient(165deg, #f3f1ec 0%, #e8efeb 100%)",
          }}
        />
        <div className="relative mx-auto max-w-2xl">
          <h2
            className="text-3xl tracking-tight text-[var(--brand)] sm:text-4xl"
            style={{ fontFamily: "var(--font-display), Georgia, serif" }}
          >
            Built around you
          </h2>
          <p className="mt-5 text-base leading-relaxed text-[var(--muted)] sm:text-lg">
            From browsing to checkout, every step is designed to stay quiet and
            useful—so the focus stays on the pieces you actually want.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-block border border-[var(--brand)]/25 px-6 py-3 text-sm font-semibold text-[var(--brand)] transition hover:border-[var(--brand)] hover:bg-[var(--brand)]/5"
          >
            Get in touch
          </Link>
        </div>
      </section>
    </main>
  );
}
