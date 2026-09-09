"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

interface Category {
  _id: string;
  name: string;
  slug?: string;
  description?: string;
  images: string[];
}

function CategoryCard({ category }: { category: Category }) {
  const imageSrc = category.images?.[0];
  const href = category.slug
    ? `/products?category=${encodeURIComponent(category.slug)}`
    : "/products";

  return (
    <Link
      href={href}
      className="group relative block overflow-hidden rounded-xl border border-[var(--field-border)] bg-[var(--surface)] shadow-[0_1px_2px_rgba(20,35,31,0.04)] backdrop-blur-sm transition hover:border-[var(--accent)]/35 hover:shadow-[0_12px_32px_rgba(20,61,53,0.12)]"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-[rgba(20,61,53,0.06)]">
        {imageSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageSrc}
            alt={category.name}
            className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-[var(--muted)]">
            No image
          </div>
        )}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(20, 61, 53, 0) 0%, rgba(20, 61, 53, 0.18) 42%, rgba(20, 61, 53, 0.82) 78%, rgba(20, 61, 53, 0.94) 100%)",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
          <h3
            className="text-2xl tracking-tight text-white sm:text-[1.65rem]"
            style={{ fontFamily: "var(--font-display), Georgia, serif" }}
          >
            {category.name}
          </h3>
          {category.description && (
            <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-white/80">
              {category.description}
            </p>
          )}
          <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white transition group-hover:gap-3">
            Explore
            <FaArrowRight className="h-3 w-3" />
          </span>
        </div>
      </div>
    </Link>
  );
}

function CategorySkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-[var(--field-border)] bg-[var(--surface)]">
      <div className="aspect-[4/5] animate-pulse bg-[rgba(20,61,53,0.08)]" />
    </div>
  );
}

export default function ShopByCategory() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/categories`,
        );
        setCategories(response.data.data ?? []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <section className="relative overflow-hidden px-6 py-20 sm:px-10 sm:py-24">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(800px 360px at 8% 0%, rgba(13, 115, 119, 0.12), transparent 55%), radial-gradient(640px 320px at 100% 100%, rgba(20, 61, 53, 0.08), transparent 50%), linear-gradient(165deg, #f3f1ec 0%, #e8efeb 100%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-6xl">
        <header className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
            Collections
          </p>
          <h2
            className="mt-3 text-3xl tracking-tight text-[var(--brand)] sm:text-4xl"
            style={{ fontFamily: "var(--font-display), Georgia, serif" }}
          >
            Shop by category
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-[var(--muted)]">
            Browse curated collections and find pieces that fit your home and
            wardrobe.
          </p>
        </header>

        {loading ? (
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <CategorySkeleton />
            <CategorySkeleton />
            <CategorySkeleton />
          </div>
        ) : categories.length === 0 ? (
          <div className="mx-auto mt-12 max-w-md rounded-xl border border-[var(--field-border)] bg-[var(--surface)] px-6 py-12 text-center backdrop-blur-sm">
            <p className="text-base font-medium text-[var(--foreground)]">
              No categories yet
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
              Collections will appear here as they are added to the store.
            </p>
            <Link
              href="/products"
              className="mt-6 inline-flex items-center gap-2 bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--accent-hover)]"
            >
              Browse products
              <FaArrowRight className="h-3 w-3" />
            </Link>
          </div>
        ) : (
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <CategoryCard key={category._id} category={category} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
