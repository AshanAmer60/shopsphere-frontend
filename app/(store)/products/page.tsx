"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

export default function ProductsPage() {
    const [products, setProducts] = useState<any[]>([]);
    const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await axios.get(`${baseURL}/products`, {
                withCredentials: true,
            });
            setProducts(response.data.data.products);
        };
        fetchProducts();
    }, [baseURL]);


    return (
        <div className="mx-auto w-full max-w-6xl px-6 py-10 sm:px-10 sm:py-14">
            <section className="relative overflow-hidden rounded-2xl">
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            "radial-gradient(700px 280px at 0% 0%, rgba(13, 115, 119, 0.16), transparent 55%), radial-gradient(520px 240px at 100% 100%, rgba(20, 61, 53, 0.12), transparent 50%), linear-gradient(160deg, #e8efeb 0%, #f3f1ec 55%, #e4ebe7 100%)",
                    }}
                />
                <div className="relative px-6 py-10 sm:px-10 sm:py-12">
                    <h1
                        className="home-rise max-w-xl text-4xl leading-[1.05] tracking-tight text-[var(--brand)] sm:text-5xl"
                        style={{ fontFamily: "var(--font-display), Georgia, serif" }}
                    >
                        What we have for you
                    </h1>
                    <p className="home-rise-delay mt-3 max-w-md text-base leading-relaxed text-[var(--muted)]">
                        Quality pieces for everyday living—browse and find what fits.
                    </p>
                    <label className="home-rise-delay-2 mt-8 block max-w-lg">
                        <span className="sr-only">Search products</span>
                        <input
                            type="search"
                            name="search"
                            id="search"
                            placeholder="Search products…"
                            className="w-full border border-[var(--field-border)] bg-white/90 px-4 py-3 text-sm text-[var(--foreground)] placeholder:text-[#8a9691] outline-none transition focus:border-[var(--accent)] focus:shadow-[0_0_0_3px_rgba(13,115,119,0.15)]"
                        />
                    </label>
                </div>
            </section>

            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {products.map((product: any) => {
                    const hasDiscount = product.discount > 0;
                    const finalPrice = hasDiscount
                        ? product.price * (1 - product.discount / 100)
                        : product.price;

                    return (
                        <article
                            key={product._id}
                            className="overflow-hidden rounded-xl border border-[var(--field-border)] bg-[var(--surface)] shadow-[0_1px_2px_rgba(20,35,31,0.04)] backdrop-blur-sm transition hover:border-[var(--accent)]/35 hover:shadow-[0_8px_24px_rgba(20,61,53,0.08)]"
                        >
                            <div className="relative aspect-[16/10] overflow-hidden bg-[rgba(20,61,53,0.06)]">
                                {product.images?.[0] ? (
                                    <img
                                        src={product.images[0]}
                                        alt={product.name}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-full items-center justify-center text-sm text-[var(--muted)]">
                                        No image
                                    </div>
                                )}
                                {product.images?.length > 1 && (
                                    <span className="absolute bottom-2 right-2 rounded-md bg-[var(--brand)]/80 px-2 py-0.5 text-xs font-medium text-white">
                                        +{product.images.length - 1}
                                    </span>
                                )}
                                {hasDiscount && (
                                    <span className="absolute left-2 top-2 rounded-md bg-[var(--accent)] px-2 py-0.5 text-xs font-semibold text-white">
                                        -{product.discount}%
                                    </span>
                                )}
                            </div>

                            <div className="flex flex-col gap-3 p-4">
                                <div className="flex items-start justify-between gap-3">
                                    <div className="min-w-0 space-y-1">
                                        <h2 className="truncate text-lg font-semibold tracking-tight text-[var(--foreground)]">
                                            {product.name}
                                        </h2>
                                        <p className="text-xs font-medium uppercase tracking-wide text-[var(--muted)]">
                                            {product.brand}
                                        </p>
                                    </div>
                                    <span
                                        className={`shrink-0 rounded-md px-2 py-0.5 text-xs font-medium ${product.status === "active"
                                            ? "bg-[rgba(13,115,119,0.1)] text-[var(--accent)]"
                                            : "bg-[rgba(20,35,31,0.08)] text-[var(--muted)]"
                                            }`}
                                    >
                                        {product.status}
                                    </span>
                                </div>

                                <p className="line-clamp-2 text-sm leading-relaxed text-[var(--muted)]">
                                    {product.description}
                                </p>

                                <div className="flex items-end justify-between gap-3 border-t border-[var(--field-border)] pt-3">
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-lg font-semibold text-[var(--foreground)]">
                                            ${Number(finalPrice).toFixed(2)}
                                        </span>
                                        {hasDiscount && (
                                            <span className="text-sm text-[var(--muted)] line-through">
                                                ${Number(product.price).toFixed(2)}
                                            </span>
                                        )}
                                    </div>
                                    <span className="text-xs font-medium text-[var(--muted)]">
                                        {product.stock} in stock
                                    </span>
                                </div>
                            </div>
                        </article>
                    );
                })}
            </div>


        </div>
    );
}
