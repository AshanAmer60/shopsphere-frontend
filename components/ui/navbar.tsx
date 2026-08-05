"use client";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Navbar() {

  const { user, loading, setUser } = useAuth();
  const router = useRouter();

  if (loading) {
    return <div>Loading...</div>;
  }

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;


  const logout = async () => {
    await axios.post(`${backendUrl}/auth/logout`, {}, { withCredentials: true });
    router.push('/');
    console.log('Logged out successfully');
    setUser(null);
  }

  return (
    <header className="flex items-center justify-between gap-4">
      <Link href="/" className="flex items-center gap-3 min-w-0">
        <Image
          src="/logo.png"
          alt="ShopSphere"
          width={48}
          height={48}
          priority
          className="h-12 w-12 shrink-0 rounded-full object-cover"
        />
        <span
          className="truncate text-lg tracking-tight text-white sm:text-xl"
          style={{ fontFamily: "var(--font-display), Georgia, serif" }}
        >
          ShopSphere
        </span>
      </Link>

      <nav className="hidden items-center gap-6 text-sm text-white/85 md:flex">
        <Link href="/" className="transition hover:text-white">Home</Link>
        <Link href="/products" className="transition hover:text-white">Products</Link>
        <Link href="/about" className="transition hover:text-white">About</Link>
        <Link href="/contact" className="transition hover:text-white">Contact</Link>
      </nav>

      <div className="flex items-center gap-3 text-sm text-white/85">
        {user && user.role === 'customer' ? (
          <>
            <span className="transition hover:text-white">
              {user.name}
            </span>
            <button
              onClick={logout}
              className="transition hover:text-white cursor-pointer"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/signin" className="transition hover:text-white">
              Sign in
            </Link>
            <Link
              href="/signup"
              className="border border-white/35 px-3 py-1.5 transition hover:border-white hover:bg-white/10"
            >
              Sign up
            </Link>
          </>
        )}
      </div>
    </header>
  );
}