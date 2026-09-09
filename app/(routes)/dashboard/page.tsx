import Link from "next/link";
const backendURL = process.env.BACKEND_URL ?? "http://localhost:4000";

export const dynamic = "force-dynamic";

async function getProductMetrics() {
    const res = await fetch(`${backendURL}/api/v1/products/metrics`, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to load product metrics");
    }

    const json = await res.json();

    return (json.data?.totalProducts as number) ?? 0;
}

export default async function DashboardPage() {

    const totalProducts = await getProductMetrics();

    return (
        <div className="pt-14">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">
                Overview
            </p>
            <h1
                className="mt-1 text-2xl font-semibold tracking-tight text-[var(--brand)] sm:text-3xl"
                style={{ fontFamily: "var(--font-display), Georgia, serif" }}
            >
                Dashboard
            </h1>
            <p className="mt-1 text-sm text-[var(--muted)]">
                A snapshot of what’s live in your catalog.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                <Link
                    href="/dashboard/products"
                    className="group rounded-xl border border-[var(--field-border)] bg-[var(--surface)] p-5 shadow-[0_1px_2px_rgba(20,35,31,0.04)] backdrop-blur-sm transition hover:border-[var(--accent)]/35 hover:shadow-[0_8px_24px_rgba(20,61,53,0.08)]"
                >
                    <div className="flex items-start justify-between gap-3">
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
                            Total products
                        </p>
                        <span
                            className="grid h-9 w-9 place-items-center rounded-md bg-[rgba(13,115,119,0.12)] text-[var(--accent)]"
                            aria-hidden
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                <path
                                    d="M4 8.5L12 4l8 4.5M4 8.5v7L12 20m-8-11.5L12 13m0 7l8-4.5v-7M12 20v-7m8-4.5L12 13"
                                    stroke="currentColor"
                                    strokeWidth="1.6"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </span>
                    </div>
                    <p className="mt-4 text-4xl font-semibold tracking-tight text-[var(--brand)]">
                        {totalProducts}
                    </p>
                    <p className="mt-2 text-sm text-[var(--muted)] group-hover:text-[var(--accent)]">
                        View catalog →
                    </p>
                </Link>
            </div>
        </div>
    );
}