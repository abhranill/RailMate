
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, TrainFront } from "lucide-react";

export default function Home() {
  const router = useRouter();

  // Search form state
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");

  // Handle train search
  const handleSearch = () => {
    if (!from.trim() || !to.trim() || !date) {
      alert("Please fill in all search fields.");
      return;
    }

    if (from.trim().toLowerCase() === to.trim().toLowerCase()) {
      alert("From and To stations cannot be the same.");
      return;
    }

    // Create URL parameters
    const params = new URLSearchParams({
      from: from.trim(),
      to: to.trim(),
      date,
    });

    // Navigate to train results page
    router.push(`/trains?${params.toString()}`);
  };

  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-900">
      {/* Navbar */}
      <nav className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="rounded-xl bg-blue-600 p-2 text-white">
              <TrainFront size={22} />
            </div>

            <span className="text-xl font-bold tracking-tight">
              RailMate <span className="text-blue-600">AI</span>
            </span>
          </div>

          <div className="hidden items-center gap-8 text-sm font-medium md:flex">
            <a href="/" className="text-blue-600">
              Home
            </a>

            <a
              href="/trains"
              className="transition hover:text-blue-600"
            >
              Trains
            </a>

            <a
              href="/pnr"
              className="transition hover:text-blue-600"
            >
              PNR Status
            </a>

            <a
              href="/stations"
              className="transition hover:text-blue-600"
            >
              Stations
            </a>

            <a
              href="/planner"
              className="transition hover:text-blue-600"
            >
              Planner
            </a>
          </div>

          <a
            href="/assistant"
            className="hidden rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-600 sm:block"
          >
            Ask RailMate AI
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-6 pb-20 pt-16">
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
            <TrainFront size={16} />
            Your intelligent railway companion
          </div>

          <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Explore India.
            <br />
            <span className="text-blue-600">
              Travel smarter.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Discover trains, explore stations, plan your journey,
            and get intelligent railway assistance — all in one place.
          </p>
        </div>

        {/* Search Card */}
        <div className="mt-12 rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">
                Search for trains
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Find your next journey across India.
              </p>
            </div>

            <TrainFront
              className="hidden text-blue-600 sm:block"
              size={28}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* From Station */}
            <div>
              <label
                htmlFor="from"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                From
              </label>

              <input
                id="from"
                type="text"
                placeholder="e.g. NJP"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* To Station */}
            <div>
              <label
                htmlFor="to"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                To
              </label>

              <input
                id="to"
                type="text"
                placeholder="e.g. HWH"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Journey Date */}
            <div>
              <label
                htmlFor="date"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Journey Date
              </label>

              <input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Search Button */}
            <div className="flex items-end">
              <button
                type="button"
                onClick={handleSearch}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                Search Trains
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <FeatureCard
            icon="🚆"
            title="Train Search"
            description="Explore train routes and schedules."
          />

          <FeatureCard
            icon="🎫"
            title="PNR Status"
            description="Check your booking information."
          />

          <FeatureCard
            icon="📍"
            title="Station Explorer"
            description="Discover railway stations and facilities."
          />

          <FeatureCard
            icon="🤖"
            title="RailMate AI"
            description="Get intelligent railway assistance."
          />
        </div>
      </section>
    </main>
  );
}

// Reusable Feature Card Component
function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:shadow-lg">
      <div className="mb-4 text-2xl">{icon}</div>

      <h3 className="font-bold">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-slate-500">
        {description}
      </p>
    </div>
  );
}