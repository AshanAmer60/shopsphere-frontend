"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import axios from "axios";

type ProductCategory = {
    _id?: string;
    name: string;
    slug: string;
};

type Product = {
    _id: string;
    name: string;
    slug: string;
    description: string;
    price: number;
    discount: number;
    category?: ProductCategory | string;
    brand: string;
    images: string[];
    stock: number;
    tags: string[];
    rating: number;
    isFeatured: boolean;
    status: string;
};

function categoryOf(product: Product): ProductCategory | null {
    if (!product.category || typeof product.category === "string") return null;
    return product.category;
}

function StarRating({ value }: { value: number }) {
    const rounded = Math.round(value);

    return (
        <div className="flex items-center gap-2" aria-label={`Rated ${value} out of 5`}>
            <div className="flex items-center gap-0.5" aria-hidden>
                {Array.from({ length: 5 }, (_, i) => (
                    <svg
                        key={i}
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        className={i < rounded ? "text-[var(--accent)]" : "text-[var(--field-border)]"}
                    >
                        <path
                            d="M12 3.2l2.35 4.76 5.25.76-3.8 3.7.9 5.23L12 15.18 7.3 17.65l.9-5.23-3.8-3.7 5.25-.76L12 3.2z"
                            fill="currentColor"
                        />
                    </svg>
                ))}
            </div>
            <span className="text-sm text-[var(--muted)]">{value.toFixed(1)}</span>
        </div>
    );
}

function ProductSkeleton() {
    return (
        <div className="grid gap-8 md:grid-cols-2 md:gap-10 lg:gap-14">
            <div className="space-y-3">
                <div className="aspect-[4/5] animate-pulse rounded-2xl bg-[rgba(20,61,53,0.08)]" />
                <div className="grid grid-cols-4 gap-2">
                    {Array.from({ length: 4 }, (_, i) => (
                        <div
                            key={i}
                            className="aspect-square animate-pulse rounded-lg bg-[rgba(20,61,53,0.08)]"
                        />
                    ))}
                </div>
            </div>
            <div className="space-y-4 pt-2">
                <div className="h-3 w-24 animate-pulse rounded bg-[rgba(20,61,53,0.1)]" />
                <div className="h-10 w-3/4 animate-pulse rounded bg-[rgba(20,61,53,0.1)]" />
                <div className="h-5 w-40 animate-pulse rounded bg-[rgba(20,61,53,0.08)]" />
                <div className="h-8 w-32 animate-pulse rounded bg-[rgba(20,61,53,0.1)]" />
                <div className="h-24 w-full animate-pulse rounded-xl bg-[rgba(20,61,53,0.06)]" />
            </div>
        </div>
    );
}

export default function ProductPage() {
    const { slug: slugParam } = useParams<{ slug: string }>();
    const slug = Array.isArray(slugParam) ? slugParam[0] : slugParam;
    const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<"not-found" | "error" | null>(null);
    const [activeImage, setActiveImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [added, setAdded] = useState(false);

    useEffect(() => {
        if (!slug) return;

        const fetchProduct = async () => {
            setLoading(true);
            setError(null);
            setProduct(null);
            setActiveImage(0);
            setQuantity(1);
            setAdded(false);

            try {
                const response = await axios.get(`${baseURL}/products/${slug}`, {
                    withCredentials: true,
                });
                setProduct(response.data.data);
            } catch (err) {
                const status = axios.isAxiosError(err) ? err.response?.status : undefined;
                setError(status === 404 ? "not-found" : "error");
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [baseURL, slug]);

    const category = product ? categoryOf(product) : null;
    const hasDiscount = Boolean(product && product.discount > 0);
    const inStock = Boolean(product && product.stock > 0);
    const finalPrice = useMemo(() => {
        if (!product) return 0;
        return hasDiscount
            ? product.price * (1 - product.discount / 100)
            : product.price;
    }, [product, hasDiscount]);

    const images = product?.images?.filter(Boolean) ?? [];
    const mainImage = images[activeImage] ?? images[0];

    const handleQuantity = (next: number) => {
        if (!product) return;
        const max = Math.max(product.stock, 1);
        setQuantity(Math.min(max, Math.max(1, next)));
    };

    const handleAddToBag = () => {
        if (!inStock) return;
        setAdded(true);
        window.setTimeout(() => setAdded(false), 1800);
    };

    return (
        <div className="relative overflow-hidden">
            <div
                className="pointer-events-none absolute inset-0"
                style={{
                    background:
                        "radial-gradient(800px 360px at 0% 0%, rgba(13, 115, 119, 0.12), transparent 55%), radial-gradient(640px 320px at 100% 8%, rgba(20, 61, 53, 0.08), transparent 50%), linear-gradient(165deg, #f3f1ec 0%, #e8efeb 100%)",
                }}
            />

            <div className="relative mx-auto w-full max-w-6xl px-6 py-10 sm:px-10 sm:py-14">
                <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-[var(--muted)]">
                    <Link href="/products" className="transition hover:text-[var(--accent)]">
                        Products
                    </Link>
                    {category && (
                        <>
                            <span aria-hidden>/</span>
                            <Link
                                href={`/products?category=${encodeURIComponent(category.slug)}`}
                                className="transition hover:text-[var(--accent)]"
                            >
                                {category.name}
                            </Link>
                        </>
                    )}
                    {product && (
                        <>
                            <span aria-hidden>/</span>
                            <span className="text-[var(--foreground)]">{product.name}</span>
                        </>
                    )}
                </nav>

                {loading && <ProductSkeleton />}

                {!loading && error === "not-found" && (
                    <div className="mx-auto max-w-md rounded-2xl border border-[var(--field-border)] bg-[var(--surface)] px-6 py-14 text-center backdrop-blur-sm">
                        <p
                            className="text-2xl tracking-tight text-[var(--brand)]"
                            style={{ fontFamily: "var(--font-display), Georgia, serif" }}
                        >
                            Product not found
                        </p>
                        <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                            This piece may have been removed or is no longer available.
                        </p>
                        <Link
                            href="/products"
                            className="mt-6 inline-flex items-center justify-center bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--accent-hover)]"
                        >
                            Back to products
                        </Link>
                    </div>
                )}

                {!loading && error === "error" && (
                    <div className="mx-auto max-w-md rounded-2xl border border-[var(--field-border)] bg-[var(--surface)] px-6 py-14 text-center backdrop-blur-sm">
                        <p
                            className="text-2xl tracking-tight text-[var(--brand)]"
                            style={{ fontFamily: "var(--font-display), Georgia, serif" }}
                        >
                            Couldn’t load this product
                        </p>
                        <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                            Check your connection and try again.
                        </p>
                        <button
                            type="button"
                            onClick={() => window.location.reload()}
                            className="mt-6 inline-flex cursor-pointer items-center justify-center bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--accent-hover)]"
                        >
                            Try again
                        </button>
                    </div>
                )}

                {!loading && product && (
                    <div className="grid items-start gap-8 md:grid-cols-2 md:gap-10 lg:gap-14">
                        <section className="home-rise space-y-3 md:sticky md:top-6">
                            <div className="relative overflow-hidden rounded-2xl border border-[var(--field-border)] bg-[rgba(20,61,53,0.06)]">
                                <div className="relative aspect-square">
                                    {mainImage ? (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img
                                            src={mainImage}
                                            alt={product.name}
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-full items-center justify-center text-sm text-[var(--muted)]">
                                            No image
                                        </div>
                                    )}
                                </div>

                                {hasDiscount && (
                                    <span className="absolute left-3 top-3 rounded-md bg-[var(--accent)] px-2.5 py-1 text-xs font-semibold text-white">
                                        -{product.discount}%
                                    </span>
                                )}
                                {product.isFeatured && (
                                    <span className="absolute right-3 top-3 rounded-md bg-[var(--brand)]/85 px-2.5 py-1 text-xs font-medium text-white">
                                        Featured
                                    </span>
                                )}
                            </div>

                            {images.length > 1 && (
                                <div className="grid grid-cols-4 gap-2 sm:grid-cols-5">
                                    {images.map((src, index) => {
                                        const selected = index === activeImage;
                                        return (
                                            <button
                                                key={`${src}-${index}`}
                                                type="button"
                                                onClick={() => setActiveImage(index)}
                                                aria-label={`View image ${index + 1}`}
                                                aria-pressed={selected}
                                                className={`overflow-hidden rounded-lg border bg-[rgba(20,61,53,0.04)] transition ${
                                                    selected
                                                        ? "border-[var(--accent)] ring-2 ring-[var(--accent)]/25"
                                                        : "border-[var(--field-border)] hover:border-[var(--accent)]/50"
                                                }`}
                                            >
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img
                                                    src={src}
                                                    alt=""
                                                    className="aspect-square h-full w-full object-cover"
                                                />
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </section>

                        <section className="home-rise-delay flex flex-col">
                            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                                {product.brand}
                            </p>
                            <h1
                                className="mt-2 text-4xl leading-[1.05] tracking-tight text-[var(--brand)] sm:text-5xl"
                                style={{ fontFamily: "var(--font-display), Georgia, serif" }}
                            >
                                {product.name}
                            </h1>

                            <div className="mt-4 flex flex-wrap items-center gap-3">
                                {product.rating > 0 && <StarRating value={product.rating} />}
                                <span
                                    className={`rounded-md px-2 py-0.5 text-xs font-medium ${
                                        inStock
                                            ? "bg-[rgba(13,115,119,0.1)] text-[var(--accent)]"
                                            : "bg-[rgba(20,35,31,0.08)] text-[var(--muted)]"
                                    }`}
                                >
                                    {inStock ? `${product.stock} in stock` : "Out of stock"}
                                </span>
                            </div>

                            <div className="mt-6 flex items-baseline gap-3">
                                <span className="text-3xl font-semibold tracking-tight text-[var(--foreground)]">
                                    ${Number(finalPrice).toFixed(2)}
                                </span>
                                {hasDiscount && (
                                    <span className="text-base text-[var(--muted)] line-through">
                                        ${Number(product.price).toFixed(2)}
                                    </span>
                                )}
                            </div>

                            <p className="mt-6 max-w-lg text-base leading-relaxed text-[var(--muted)]">
                                {product.description}
                            </p>

                            {product.tags?.length > 0 && (
                                <ul className="mt-5 flex flex-wrap gap-2">
                                    {product.tags.map((tag) => (
                                        <li
                                            key={tag}
                                            className="rounded-full border border-[var(--field-border)] bg-white/70 px-3 py-1 text-xs font-medium uppercase tracking-wide text-[var(--muted)]"
                                        >
                                            {tag}
                                        </li>
                                    ))}
                                </ul>
                            )}

                            <div className="sticky bottom-4 z-10 mt-8 flex flex-wrap items-center gap-3 rounded-xl border border-[var(--field-border)] bg-white/95 p-3 shadow-[0_8px_24px_rgba(20,61,53,0.1)] backdrop-blur-sm md:static md:border-0 md:bg-transparent md:p-0 md:shadow-none">
                                <div className="inline-flex items-center rounded-md border border-[var(--field-border)] bg-white">
                                    <button
                                        type="button"
                                        aria-label="Decrease quantity"
                                        disabled={!inStock || quantity <= 1}
                                        onClick={() => handleQuantity(quantity - 1)}
                                        className="grid h-11 w-11 cursor-pointer place-items-center text-lg text-[var(--brand)] transition hover:bg-[rgba(13,115,119,0.08)] disabled:cursor-not-allowed disabled:opacity-40"
                                    >
                                        −
                                    </button>
                                    <span className="min-w-10 text-center text-sm font-semibold tabular-nums text-[var(--foreground)]">
                                        {quantity}
                                    </span>
                                    <button
                                        type="button"
                                        aria-label="Increase quantity"
                                        disabled={!inStock || quantity >= product.stock}
                                        onClick={() => handleQuantity(quantity + 1)}
                                        className="grid h-11 w-11 cursor-pointer place-items-center text-lg text-[var(--brand)] transition hover:bg-[rgba(13,115,119,0.08)] disabled:cursor-not-allowed disabled:opacity-40"
                                    >
                                        +
                                    </button>
                                </div>

                                <button
                                    type="button"
                                    disabled={!inStock}
                                    onClick={handleAddToBag}
                                    className="inline-flex min-w-[10.5rem] cursor-pointer items-center justify-center bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--accent-hover)] disabled:cursor-not-allowed disabled:bg-[var(--muted)]"
                                >
                                    {added ? "Added" : inStock ? "Add to bag" : "Out of stock"}
                                </button>
                            </div>
                        </section>
                    </div>
                )}
            </div>
        </div>
    );
}
