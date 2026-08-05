"use client";

import { useState } from "react";
import { toast } from "react-toastify";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [sending, setSending] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      toast.success("Thanks — we’ll get back to you soon.");
      setFormData({ name: "", email: "", message: "" });
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <main className="relative flex flex-1 flex-col overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(900px 420px at 0% 0%, rgba(13, 115, 119, 0.16), transparent 55%), radial-gradient(700px 380px at 100% 20%, rgba(20, 61, 53, 0.12), transparent 50%), linear-gradient(165deg, #eef3f0 0%, #f3f1ec 50%, #e7ebe8 100%)",
        }}
      />

      <div className="relative mx-auto grid w-full max-w-6xl flex-1 items-center gap-10 px-6 py-14 lg:grid-cols-2 lg:gap-14 sm:px-10 sm:py-20">
        <div className="home-rise relative min-h-[240px] overflow-hidden sm:min-h-[320px] lg:min-h-[520px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=80"
            alt="Quiet workspace with natural light and curated objects"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(20, 61, 53, 0.15) 0%, rgba(20, 61, 53, 0.35) 100%)",
            }}
          />
        </div>

        <div>
         
          <h1 className="home-rise-delay mt-4 text-xl font-medium text-[var(--foreground)] sm:text-2xl">
            Get in touch
          </h1>
          <p className="home-rise-delay mt-3 max-w-md text-base leading-relaxed text-[var(--muted)]">
            Questions about an order or a product? Send a note—we’re here to
            help.
          </p>

          <form
            onSubmit={handleSubmit}
            className="home-rise-delay-2 mt-8 flex w-full max-w-lg flex-col gap-4"
          >
            <div>
              <label className="auth-label" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                required
                className="auth-input"
              />
            </div>
            <div>
              <label className="auth-label" htmlFor="email">
                Email
              </label>
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
              <label className="auth-label" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="How can we help?"
                value={formData.message}
                onChange={handleChange}
                required
                className="auth-input min-h-[8rem] resize-y"
              />
            </div>
            <button
              type="submit"
              disabled={sending}
              className="auth-button mt-1 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {sending ? "Sending…" : "Send message"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
