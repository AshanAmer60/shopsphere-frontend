'use client';
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { MdDashboard } from "react-icons/md";
import { GoPackage } from "react-icons/go";
import { MdCategory } from "react-icons/md";
import { MdReceiptLong } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import Image from "next/image";

function CloseIcon() {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
            />
        </svg>
    );
}

const NAV_ITEMS = [
    { label: "Overview", href: "/dashboard", icon: <MdDashboard /> },
    { label: "Products", href: "/dashboard/products", icon: <GoPackage /> },
    { label: "Categories", href: "/dashboard/categories", icon: <MdCategory /> },
    { label: "Orders", href: "/dashboard/orders", icon: <MdReceiptLong /> },
    { label: "Wishlist", href: "/dashboard/wishlist", icon: <MdFavorite /> },
] as const;

export default function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
    const [user, setUser] = useState<{
        name?: string;
        email?: string;
        role?: string;
    } | null>(null);
    const router = useRouter();
    const pathname = usePathname();
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${backendUrl}/auth/me`, {
                    withCredentials: true,
                });
                setUser(response.data.data);
            } catch {
                router.replace("/signin");
            }
        };
        fetchData();
    }, [backendUrl, router]);

    return (
        <aside
            className={`dash-sidebar fixed inset-y-0 left-0 z-40 flex w-[min(18rem,88vw)] flex-col border-r border-[var(--brand)]/10 bg-[#eef3f0]/95 backdrop-blur-md transition-transform duration-300 ease-out lg:translate-x-0 ${
                open ? "translate-x-0" : "-translate-x-full"
            }`}
        >
            <div className="flex items-center justify-between px-5 py-6">
                <Link
                    href="/"
                    className="text-xl tracking-tight text-[var(--brand)] flex items-center gap-2 "
                    style={{ fontFamily: "var(--font-display), Georgia, serif" }}
                >
                    <Image src="/logo.png" alt="ShopSphere" width={50} height={50} />
                    ShopSphere
                </Link>
                <button
                    type="button"
                    aria-label="Close menu"
                    className="grid h-9 w-9 place-items-center text-[var(--muted)] transition hover:text-[var(--brand)] lg:hidden"
                    onClick={onClose}
                >
                    <CloseIcon />
                </button>
            </div>

            <nav className="dash-nav flex flex-1 flex-col gap-1 px-3">
                {NAV_ITEMS.map((item) => {
                    const isActive =
                        item.href === "/dashboard"
                            ? pathname === "/dashboard"
                            : pathname.startsWith(item.href);

                    return (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={`dash-nav-link flex items-center gap-2 text-sm font-medium ${
                                isActive
                                    ? "dash-nav-link-active text-[var(--brand)]"
                                    : "text-[var(--muted)]"
                            }`}
                            onClick={onClose}
                        >
                            {item.icon}
                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="mt-auto border-t border-[var(--brand)]/10 p-4">
                <div className="flex items-center gap-3">
                    <div
                        className="grid h-10 w-10 shrink-0 place-items-center bg-[var(--brand)] text-sm font-semibold text-white"
                        aria-hidden
                    >
                        {user?.name?.charAt(0)}
                    </div>
                    <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-[var(--brand)]">
                            {user?.name ?? "Loading…"}
                        </p>
                        <p className="truncate text-xs text-[var(--muted)]">
                            {user?.email ?? "—"}
                        </p>
                    </div>
                </div>
                <button
                    type="button"
                    onClick={() => router.replace("/signin")}
                    className="mt-4 w-full cursor-pointer border border-[var(--brand)]/15 px-3 py-2 text-sm font-medium text-[var(--brand)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                >
                    Log out
                </button>
            </div>
        </aside>
    );
}
