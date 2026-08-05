'use client';
import Link from 'next/link';
import React, { useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const SignupPage = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        address: {
            label: 'Home',
            street: '',
            city: '',
            state: '',
            country: '',
            postalCode: '',
            isDefault: true,
        },
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name in formData.address) {
            setFormData((prev) => ({
                ...prev,
                address: {
                    ...prev.address,
                    [name]: value,
                },
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        const payload = {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            role: 'customer',
            addresses: [formData.address],
        };

        try {
            const response = await axios.post(`${backendUrl}/auth/register`, payload, {
                withCredentials: true,
            });
            if (response.status === 201) {
                toast.success(response.data.message as string);
                router.push('/signin')
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message ?? 'Signup failed');
                return;
            }
            toast.error((error as Error).message);
        }
    };

    return (
        <div className="relative z-10 flex min-h-dvh flex-col items-center justify-center px-4 py-10">
            <div className="auth-rise mb-6 text-center sm:mb-8">
                <p
                    className="text-4xl tracking-tight text-[var(--brand)] sm:text-5xl"
                    style={{ fontFamily: "var(--font-display), Georgia, serif" }}
                >
                    Get Started
                </p>
                <p className="auth-fade mt-2 text-sm text-[var(--muted)]">
                    Create your account to start shopping
                </p>
            </div>

            <div className="auth-panel auth-rise-delay max-w-xl">
                <h1
                    className="mb-6 text-2xl font-semibold text-[var(--brand)]"
                    style={{ fontFamily: "var(--font-display), Georgia, serif" }}
                >
                    Join Us
                </h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="sm:col-span-2">
                            <label className="auth-label" htmlFor="name">Name</label>
                            <input id="name" name="name" type="text" placeholder="Full name" value={formData.name} onChange={handleChange} required className="auth-input" />
                        </div>
                        <div>
                            <label className="auth-label" htmlFor="email">Email</label>
                            <input id="email" name="email" type="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} required className="auth-input" />
                        </div>
                        <div>
                            <label className="auth-label" htmlFor="password">Password</label>
                            <input id="password" name="password" type="password" placeholder="Create a password" value={formData.password} onChange={handleChange} required className="auth-input" />
                        </div>
                    </div>

                    <div className="mt-1 border-t border-[var(--field-border)] pt-4">
                        <p className="mb-3 text-sm font-medium text-[var(--brand)]">Shipping address</p>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div>
                                <label className="auth-label" htmlFor="label">Label</label>
                                <input id="label" name="label" type="text" placeholder="Home" value={formData.address.label} onChange={handleChange} required className="auth-input" />
                            </div>
                            <div>
                                <label className="auth-label" htmlFor="postalCode">Postal code</label>
                                <input id="postalCode" name="postalCode" type="text" placeholder="Postal code" value={formData.address.postalCode} onChange={handleChange} required className="auth-input" />
                            </div>
                            <div className="sm:col-span-2">
                                <label className="auth-label" htmlFor="street">Street</label>
                                <input id="street" name="street" type="text" placeholder="Street address" value={formData.address.street} onChange={handleChange} required className="auth-input" />
                            </div>
                            <div>
                                <label className="auth-label" htmlFor="city">City</label>
                                <input id="city" name="city" type="text" placeholder="City" value={formData.address.city} onChange={handleChange} required className="auth-input" />
                            </div>
                            <div>
                                <label className="auth-label" htmlFor="state">State</label>
                                <input id="state" name="state" type="text" placeholder="State" value={formData.address.state} onChange={handleChange} required className="auth-input" />
                            </div>
                            <div className="sm:col-span-2">
                                <label className="auth-label" htmlFor="country">Country</label>
                                <input id="country" name="country" type="text" placeholder="Country" value={formData.address.country} onChange={handleChange} required className="auth-input" />
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="auth-button">Create account</button>
                    <p className="text-center text-sm text-[var(--muted)]">
                        Already have an account?{" "}
                        <Link href="/signin" className="font-semibold text-[var(--accent)] underline-offset-2 hover:underline">
                            Sign in
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default SignupPage;
