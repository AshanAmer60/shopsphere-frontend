export default function ModernLiving() {
    return (
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
    )
}