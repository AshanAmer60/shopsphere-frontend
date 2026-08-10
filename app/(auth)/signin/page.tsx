'use client';
import axios from 'axios';
import Link from 'next/link';
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

type User = {
    _id: string;
    name: string;
    email: string;
    role: 'admin' | 'customer';
}

const SigninPage = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const { setUser } = useAuth();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
        try {

            const response = await axios.post(`${backendUrl}/auth/login`, formData, { withCredentials: true });
            if (response.status === 200) {
                const user = response.data.data.user as User;
                setUser(user);
                toast.success(response.data.message as string);
                router.push(user.role === 'admin' ? '/dashboard' : '/');
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error((error.response?.data?.message as string) || error.message);
            } else {
                toast.error((error as Error).message);
            }
        }
    };
    return (
        <div className="relative z-10 flex min-h-dvh flex-col items-center justify-center px-4 py-10">
            <div className="auth-rise mb-8 text-center">
                <p
                    className="text-4xl tracking-tight text-[var(--brand)] sm:text-5xl"
                    style={{ fontFamily: "var(--font-display), Georgia, serif" }}
                >
                    Sign-in
                </p>
                <p className="auth-fade mt-2 text-sm text-[var(--muted)]">
                    Sign in to continue shopping
                </p>
            </div>

            <div className="auth-panel auth-rise-delay">
                <h1
                    className="mb-6 text-2xl font-semibold text-[var(--brand)]"
                    style={{ fontFamily: "var(--font-display), Georgia, serif" }}
                >
                    Welcome back
                </h1>
                <form method="post" onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label className="auth-label" htmlFor="email">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="auth-input"
                        />
                    </div>
                    <div>
                        <label className="auth-label" htmlFor="password">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Your password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="auth-input"
                        />
                    </div>
                    <button type="submit" className="auth-button">Sign in</button>

                    <p className="text-center text-sm text-[var(--muted)]">
                        Don&apos;t have an account?{" "}
                        <Link href="/signup" className="font-semibold text-[var(--accent)] underline-offset-2 hover:underline">
                            Sign up
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default SigninPage;
