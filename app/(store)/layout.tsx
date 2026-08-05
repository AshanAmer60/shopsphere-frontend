import Navbar from "@/components/ui/navbar";
import Footer from "@/components/sections/footer";

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <div className="border-b border-white/10 bg-[var(--brand)] px-6 py-3 sm:px-10">
        <Navbar />
      </div>
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}