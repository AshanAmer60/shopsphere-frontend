'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function CategoriesPage() {
    const [categories, setCategories] = useState<any[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState<{
        name: string;
        slug: string;
        description: string;
        images: File[];
    }>({
        name: "",
        slug: "",
        description: "",
        images: [],
    });

    const resetForm = () => {
        setFormData({
            name: "",
            slug: "",
            description: "",
            images: [],
        });
    };

    const handleAddCategory = () => {
        setShowForm(true);
    };

    const handleCloseForm = () => {
        setShowForm(false);
        resetForm();
    };
    const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const payload = new FormData();
        payload.append("name", formData.name);
        payload.append("slug", formData.slug);
        payload.append("description", formData.description);

        formData.images.forEach((file) => {
            payload.append("images", file); // same field name as multer: upload.array("images", 5)
        });

       
        const response = await axios.post(`${baseURL}/categories`, payload, {
            withCredentials: true,
            // do NOT set Content-Type manually — axios sets multipart boundary
        });

        handleCloseForm();
        setCategories((prev) => [...prev, response.data.data]);
    };

    const handleEditCategory = async (id: string) => {
        setFormData({
            name: categories.find((cat) => cat._id === id)?.name || "",
            slug: categories.find((cat) => cat._id === id)?.slug || "",
            description: categories.find((cat) => cat._id === id)?.description || "",
            images: categories.find((cat) => cat._id === id)?.images || [],
        });
        setShowForm(true);

        const payload = new FormData();
        payload.append("name", formData.name);
        payload.append("slug", formData.slug);
        payload.append("description", formData.description);

        formData.images.forEach((file) => {
            payload.append("images", file); // same field name as multer: upload.array("images", 5)
        });
        const response = await axios.patch(`${baseURL}/categories/${id}`, payload, {
            withCredentials: true,
        });
        console.log("response", response);
        handleCloseForm();
        setCategories((prev) => prev.map((cat) => cat._id === id ? response.data.data : cat));
    };

    useEffect(() => {
        const fetchCategories = async () => {
            const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
            const response = await axios.get(`${baseURL}/categories`, {
                withCredentials: true,
            });
            console.log("response", response);
            setCategories(response.data.data);
        };
        fetchCategories();
    }, []);

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

    return (

        <div className="p-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div className="space-y-1">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">
                        Catalog
                    </p>
                    <h1 className="text-2xl font-semibold tracking-tight text-[var(--foreground)] sm:text-3xl">
                        Categories
                    </h1>
                    <p className="text-sm text-[var(--muted)]">
                        {categories.length} categor{categories.length === 1 ? "y" : "ies"} in your store
                    </p>
                </div>
                <button
                    type="button"
                    className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-md bg-[var(--accent)] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[var(--accent-hover)]"
                    onClick={handleAddCategory}
                >
                    <span aria-hidden className="text-base leading-none">+</span>
                    Add category
                </button>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {categories.map((cat) => (
                    <article
                        key={cat._id}
                        className="overflow-hidden rounded-xl border border-[var(--field-border)] bg-[var(--surface)] shadow-[0_1px_2px_rgba(20,35,31,0.04)] backdrop-blur-sm transition hover:border-[var(--accent)]/35 hover:shadow-[0_8px_24px_rgba(20,61,53,0.08)]"
                        onClick={() => handleEditCategory(cat._id)}
                    >
                        <div className="relative aspect-[16/10] overflow-hidden bg-[rgba(20,61,53,0.06)]">
                            {cat.images?.[0] ? (
                                <img
                                    src={cat.images[0]}
                                    alt={cat.name}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <div className="flex h-full items-center justify-center text-sm text-[var(--muted)]">
                                    No image
                                </div>
                            )}
                            {cat.images?.length > 1 && (
                                <span className="absolute bottom-2 right-2 rounded-md bg-[var(--brand)]/80 px-2 py-0.5 text-xs font-medium text-white">
                                    +{cat.images.length - 1}
                                </span>
                            )}
                        </div>
                        <div className="flex flex-col gap-2 p-4">
                            <div className="flex items-start justify-between gap-3">
                                <h2 className="text-lg font-semibold tracking-tight text-[var(--foreground)]">
                                    {cat.name}
                                </h2>
                                <span className="shrink-0 rounded-md bg-[rgba(13,115,119,0.1)] px-2 py-0.5 text-xs font-medium text-[var(--accent)]">
                                    /{cat.slug}
                                </span>
                            </div>
                            <p className="line-clamp-2 text-sm leading-relaxed text-[var(--muted)]">
                                {cat.description}
                            </p>
                        </div>
                    </article>
                ))}
            </div>


            {showForm && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="create-category-title"
                >
                    <button
                        type="button"
                        aria-label="Close dialog"
                        className="absolute inset-0 bg-[var(--brand)]/35 backdrop-blur-[2px]"
                        onClick={handleCloseForm}
                    />
                    <form
                        className="relative z-10 flex w-full max-w-md flex-col gap-3 rounded-xl border border-[var(--field-border)] bg-[#faf9f6] p-5 shadow-[0_20px_50px_rgba(20,35,31,0.18)]"
                        onSubmit={handleSubmit}
                    >
                        <div className="mb-1 flex items-start justify-between gap-3">
                            <h2
                                id="create-category-title"
                                className="text-xl font-semibold tracking-tight text-[var(--foreground)]"
                            >
                                Create category
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

                        <label htmlFor="name" className="text-sm font-medium text-[var(--foreground)]">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Category name"
                            value={formData.name}
                            className="w-full rounded-md border border-[var(--field-border)] bg-white p-2.5 text-[var(--foreground)] outline-none focus:border-[var(--field-focus)]"
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />

                        <label htmlFor="slug" className="text-sm font-medium text-[var(--foreground)]">
                            Slug
                        </label>
                        <input
                            type="text"
                            id="slug"
                            name="slug"
                            placeholder="category-slug"
                            value={formData.slug}
                            className="w-full rounded-md border border-[var(--field-border)] bg-white p-2.5 text-[var(--foreground)] outline-none focus:border-[var(--field-focus)]"
                            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                            required
                        />

                        <label htmlFor="description" className="text-sm font-medium text-[var(--foreground)]">
                            Description
                        </label>
                        <input
                            type="text"
                            id="description"
                            name="description"
                            placeholder="Short description"
                            value={formData.description}
                            className="w-full rounded-md border border-[var(--field-border)] bg-white p-2.5 text-[var(--foreground)] outline-none focus:border-[var(--field-focus)]"
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            required
                        />

                        <label htmlFor="images" className="text-sm font-medium text-[var(--foreground)]">
                            Images
                        </label>
                        <input
                            type="file"
                            id="images"
                            name="images"
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
                                className="cursor-pointer rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white transition hover:bg-[var(--accent-hover)]"
                            >
                                Create category
                            </button>
                        </div>
                    </form>
                </div>
            )}

        </div>
    );
}