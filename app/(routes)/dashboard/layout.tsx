'use client';
import { useEffect, useState } from 'react';
import Sidebar from '@/components/ui/sidebar';
import Topbar from '@/components/ui/topbar';
import { useAuth } from '@/context/AuthContext';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      // Stale cookie: clear it so middleware can redirect next time
      void fetch("/api/auth/logout", { method: "POST", credentials: "include" }).finally(() => {
        window.location.replace("/signin");
      });
    }
  }, [loading, user]);

  if (loading || !user) {
    return null;
  }

  return (
    <div className="dash-shell flex min-h-dvh">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          className="fixed inset-0 z-30 bg-[var(--brand)]/20 backdrop-blur-[1px] lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <div className="flex min-h-dvh flex-1 flex-col lg:pl-[18rem]">
        <Topbar onMenuClick={() => setSidebarOpen(true)} title="Overview" />
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
