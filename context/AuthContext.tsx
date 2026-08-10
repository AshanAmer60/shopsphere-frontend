'use client';

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';
import axios from 'axios';

type User = {
    _id: string;
    name: string;
    email: string;
    role: 'customer' | 'admin';
};

type AuthContextValue = {
    user: User | null;
    loading: boolean;
    setUser: (user: User | null) => void;
    logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    useEffect(() => {
        const loadUser = async () => {
            try {
                const res = await axios.get(`${backendUrl}/auth/me`, {
                    withCredentials: true,
                    timeout: 5000,
                });
                setUser(res.data.data);
            } catch {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        loadUser();
    }, [backendUrl]);

    const logout = useCallback(async () => {
        try {
            // Clear cookies on the Next origin (middleware reads these)
            await axios.post("/api/auth/logout", {}, { withCredentials: true });
        } finally {
            setUser(null);
        }
    }, []);

    const value = useMemo(
        () => ({ user, loading, setUser, logout }),
        [user, loading, logout]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
    return ctx;
}