"use client";
import { useState, useEffect } from "react";
import axios from "axios";

const emptyForm = {
    name: "",
    slug: "",
    description: "",
    price: "",
    discount: "0",
    category: "",
    brand: "",
    stock: "",
    tags: "",
    isFeatured: "false",
    status: "active",
    images: [] as File[],
};

export default function ProductsPage() {
    const [products, setProducts] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState(emptyForm);
    const [submitting, setSubmitting] = useState(false);
    const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

    const resetForm = () => setFormData(emptyForm);

    const handleAddProduct = () => setShowForm(true);

    const handleCloseForm = () => {
        setShowForm(false);
        resetForm();
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const payload = new FormData();
            payload.append("name", formData.name);
            payload.append("slug", formData.slug);
            payload.append("description", formData.description);
            payload.append("price", formData.price);
            payload.append("discount", formData.discount);
            payload.append("category", formData.category);
            payload.append("brand", formData.brand);
            payload.append("stock", formData.stock);
            payload.append("isFeatured", formData.isFeatured);
            payload.append("status", "active");

            formData.tags
                .split(",")
                .map((tag) => tag.trim())
                .filter(Boolean)
                .forEach((tag) => payload.append("tags", tag));

            formData.images.forEach((file) => {
                payload.append("images", file);
            });

            const response = await axios.post(`${baseURL}/products`, payload, {
                withCredentials: true,
            });

            handleCloseForm();
            setProducts((prev) => [...prev, response.data.data]);
        } catch (error) {
            console.error(error);
        } finally {
            setSubmitting(false);
        }
    };

    useEffect(() => {
        
        const fetchProducts = async () => {
            const response = await axios.get(`${baseURL}/products`, {
              withCredentials: true,
            });
            setProducts(response.data.data.items);
          };

        const fetchCategories = async () => {
            const response = await axios.get(`${baseURL}/categories`, {
                withCredentials: true,
            });
            setCategories(response.data.data);
        };

        
        fetchProducts();
        fetchCategories();
    }, [baseURL]);

    useEffect(() => {
        if (!showForm) return;

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") handleCloseForm();
        };

        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", onKeyDown);

        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", onKeyDown);
        };
    }, [showForm]);

    const fieldClass =
        "w-full rounded-md border border-[var(--field-border)] bg-white p-2.5 text-[var(--foreground)] outline-none focus:border-[var(--field-focus)]";
    const labelClass = "text-sm font-medium text-[var(--foreground)]";

    return (
        <div className="p-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div className="space-y-1">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">
                        Catalog
                    </p>
                    <h1 className="text-2xl font-semibold tracking-tight text-[var(--foreground)] sm:text-3xl">
                        Products
                    </h1>
                    <p className="text-sm text-[var(--muted)]">
                        {products.length} product{products.length === 1 ? "" : "s"} in your store
                    </p>
                </div>
                <button
                    type="button"
                    onClick={handleAddProduct}
                    className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-md bg-[var(--accent)] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[var(--accent-hover)]"
                >
                    <span aria-hidden className="text-base leading-none">
                        +
                    </span>
                    Add product
                </button>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
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
                                        className={`shrink-0 rounded-md px-2 py-0.5 text-xs font-medium ${
                                            product.status === "active"
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

            {showForm && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="create-product-title"
                >
                    <button
                        type="button"
                        aria-label="Close dialog"
                        className="absolute inset-0 bg-[var(--brand)]/35 backdrop-blur-[2px]"
                        onClick={handleCloseForm}
                    />
                    <form
                        className="scrollbar-hide relative z-10 flex max-h-[90dvh] w-full max-w-lg flex-col gap-3 overflow-y-auto rounded-xl border border-[var(--field-border)] bg-[#faf9f6] p-5 shadow-[0_20px_50px_rgba(20,35,31,0.18)]"
                        onSubmit={handleSubmit}
                    >
                        <div className="mb-1 flex items-start justify-between gap-3">
                            <h2
                                id="create-product-title"
                                className="text-xl font-semibold tracking-tight text-[var(--foreground)]"
                            >
                                Create product
                            </h2>
                            <button
                                type="button"
                                aria-label="Close"
                                onClick={handleCloseForm}
                                className="rounded-md px-2 py-1 text-[var(--muted)] transition hover:bg-[rgba(20,61,53,0.06)] hover:text-[var(--foreground)]"
                            >
                                ✕
                            </button>
                        </div>

                        <label htmlFor="name" className={labelClass}>
                            Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Product name"
                            value={formData.name}
                            className={fieldClass}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />

                        <label htmlFor="slug" className={labelClass}>
                            Slug
                        </label>
                        <input
                            id="slug"
                            type="text"
                            placeholder="product-slug"
                            value={formData.slug}
                            className={fieldClass}
                            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                            required
                        />

                        <label htmlFor="description" className={labelClass}>
                            Description
                        </label>
                        <textarea
                            id="description"
                            placeholder="Product description"
                            value={formData.description}
                            rows={6}
                            className={`${fieldClass} min-h-36 resize-y`}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            required
                        />

                        <div className="grid grid-cols-2 gap-3">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="price" className={labelClass}>
                                    Price
                                </label>
                                <input
                                    id="price"
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    placeholder="0.00"
                                    value={formData.price}
                                    className={fieldClass}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="discount" className={labelClass}>
                                    Discount (%)
                                </label>
                                <input
                                    id="discount"
                                    type="number"
                                    min="0"
                                    max="100"
                                    value={formData.discount}
                                    className={fieldClass}
                                    onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="stock" className={labelClass}>
                                    Stock
                                </label>
                                <input
                                    id="stock"
                                    type="number"
                                    min="0"
                                    placeholder="0"
                                    value={formData.stock}
                                    className={fieldClass}
                                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="brand" className={labelClass}>
                                    Brand
                                </label>
                                <input
                                    id="brand"
                                    type="text"
                                    placeholder="Brand name"
                                    value={formData.brand}
                                    className={fieldClass}
                                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <label htmlFor="category" className={labelClass}>
                            Category
                        </label>
                        <div className="relative">
                            <select
                                id="category"
                                value={formData.category}
                                className={`${fieldClass} appearance-none pr-10 ${
                                    formData.category ? "text-[var(--foreground)]" : "text-[var(--muted)]"
                                }`}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                required
                            >
                                <option value="" disabled>
                                    Select category
                                </option>
                                {categories.map((cat) => (
                                    <option key={cat._id} value={cat._id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                            <span
                                aria-hidden
                                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--accent)]"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                    <path
                                        d="M6 9l6 6 6-6"
                                        stroke="currentColor"
                                        strokeWidth="1.75"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </span>
                        </div>

                        <label htmlFor="tags" className={labelClass}>
                            Tags
                        </label>
                        <input
                            id="tags"
                            type="text"
                            placeholder="summer, sale, new"
                            value={formData.tags}
                            className={fieldClass}
                            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                            required
                        />

                        <div className="grid grid-cols-2 gap-3">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="status" className={labelClass}>
                                    Status
                                </label>
                                <input
                                    id="status"
                                    type="text"
                                    value="active"
                                    readOnly
                                    className={`${fieldClass} cursor-default bg-[rgba(20,61,53,0.04)] text-[var(--muted)]`}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className={labelClass}>Featured</span>
                                <div
                                    className="grid grid-cols-2 gap-1 rounded-md border border-[var(--field-border)] bg-white p-1"
                                    role="group"
                                    aria-label="Featured"
                                >
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, isFeatured: "false" })}
                                        className={`cursor-pointer rounded-md px-3 py-2 text-sm font-medium transition ${
                                            formData.isFeatured === "false"
                                                ? "bg-[var(--accent)] text-white shadow-sm"
                                                : "text-[var(--muted)] hover:bg-[rgba(20,61,53,0.04)] hover:text-[var(--foreground)]"
                                        }`}
                                    >
                                        No
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, isFeatured: "true" })}
                                        className={`cursor-pointer rounded-md px-3 py-2 text-sm font-medium transition ${
                                            formData.isFeatured === "true"
                                                ? "bg-[var(--accent)] text-white shadow-sm"
                                                : "text-[var(--muted)] hover:bg-[rgba(20,61,53,0.04)] hover:text-[var(--foreground)]"
                                        }`}
                                    >
                                        Yes
                                    </button>
                                </div>
                            </div>
                        </div>

                        <label htmlFor="images" className={labelClass}>
                            Images
                        </label>
                        <input
                            id="images"
                            type="file"
                            accept="image/*"
                            multiple
                            className="w-full rounded-md border border-[var(--field-border)] bg-white p-2.5 text-sm text-[var(--muted)] file:mr-3 file:rounded-md file:border-0 file:bg-[rgba(13,115,119,0.12)] file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-[var(--accent)]"
                            onChange={(e) => {
                                const files = e.target.files ? Array.from(e.target.files) : [];
                                setFormData({ ...formData, images: files });
                            }}
                            required
                        />
                        {formData.images.length > 0 && (
                            <p className="text-xs text-[var(--muted)]">
                                {formData.images.length} file{formData.images.length > 1 ? "s" : ""} selected
                            </p>
                        )}

                        <div className="mt-2 flex justify-end gap-2">
                            <button
                                type="button"
                                className="cursor-pointer rounded-md border border-[var(--field-border)] px-4 py-2 text-sm font-medium text-[var(--muted)] transition hover:bg-[rgba(20,61,53,0.04)]"
                                onClick={handleCloseForm}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={submitting}
                                className="cursor-pointer rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white transition hover:bg-[var(--accent-hover)] disabled:opacity-60"
                            >
                                {submitting ? "Creating..." : "Create product"}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}
