
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  IndianRupee,
  MapPin,
  Route,
  Search,
  SlidersHorizontal,
  TrainFront,
} from "lucide-react";

import { stations, Station } from "@/lib/stations";

type TravelPreference = "fastest" | "cheapest" | "balanced";

type JourneyPlan = {
  from: Station;
  to: Station;
  date: string;
  budget: number;
  preference: TravelPreference;
};

type Recommendation = {
  name: string;
  number: string;
  departure: string;
  arrival: string;
  duration: string;
  fare: number;
  reason: string;
};

const demoRecommendations: Recommendation[] = [
  {
    name: "RailMate Express",
    number: "RM1001",
    departure: "06:30 AM",
    arrival: "04:15 PM",
    duration: "9h 45m",
    fare: 650,
    reason: "Balanced option for travel time and budget.",
  },
  {
    name: "RailMate Superfast",
    number: "RM2002",
    departure: "08:00 AM",
    arrival: "03:30 PM",
    duration: "7h 30m",
    fare: 900,
    reason: "Illustrative faster journey option.",
  },
  {
    name: "RailMate Economy",
    number: "RM3003",
    departure: "10:00 AM",
    arrival: "09:00 PM",
    duration: "11h 00m",
    fare: 450,
    reason: "Illustrative lower-fare journey option.",
  },
];

export default function PlannerPage() {
  const [fromCode, setFromCode] = useState("");
  const [toCode, setToCode] = useState("");
  const [date, setDate] = useState("");
  const [budget, setBudget] = useState("1000");
  const [preference, setPreference] =
    useState<TravelPreference>("balanced");

  const [plan, setPlan] = useState<JourneyPlan | null>(null);
  const [error, setError] = useState("");

  const fromStation = useMemo(
    () => stations.find((station) => station.code === fromCode) ?? null,
    [fromCode]
  );

  const toStation = useMemo(
    () => stations.find((station) => station.code === toCode) ?? null,
    [toCode]
  );

  const handlePlanJourney = () => {
    setError("");
    setPlan(null);

    const numericBudget = Number(budget);

    if (!fromStation || !toStation || !date) {
      setError("Please select your stations and journey date.");
      return;
    }

    if (fromStation.code === toStation.code) {
      setError("From and To stations cannot be the same.");
      return;
    }

    if (!Number.isFinite(numericBudget) || numericBudget <= 0) {
      setError("Please enter a valid budget.");
      return;
    }

    setPlan({
      from: fromStation,
      to: toStation,
      date,
      budget: numericBudget,
      preference,
    });
  };

  const visibleRecommendations = useMemo(() => {
    if (!plan) return [];

    const sorted = [...demoRecommendations];

    if (plan.preference === "cheapest") {
      sorted.sort((a, b) => a.fare - b.fare);
    } else if (plan.preference === "fastest") {
      sorted.sort((a, b) => {
        const durationA = a.duration === "7h 30m" ? 450 : a.duration === "9h 45m" ? 585 : 660;
        const durationB = b.duration === "7h 30m" ? 450 : b.duration === "9h 45m" ? 585 : 660;
        return durationA - durationB;
      });
    } else {
      sorted.sort((a, b) => {
        const aScore = Math.abs(a.fare - plan.budget) + (a.duration === "9h 45m" ? 0 : 100);
        const bScore = Math.abs(b.fare - plan.budget) + (b.duration === "9h 45m" ? 0 : 100);
        return aScore - bScore;
      });
    }

    return sorted;
  }, [plan]);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link href="/" className="flex items-center gap-2">
            <div className="rounded-xl bg-blue-600 p-2 text-white">
              <TrainFront size={22} />
            </div>

            <span className="text-xl font-bold tracking-tight">
              RailMate <span className="text-blue-600">AI</span>
            </span>
          </Link>

          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-blue-600"
          >
            <ArrowLeft size={16} />
            Back Home
          </Link>
        </div>
      </header>

      {/* Page */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-10">
          <p className="mb-2 text-sm font-semibold tracking-wide text-blue-600">
            SMART TRAVEL
          </p>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Journey Planner
          </h1>

          <p className="mt-3 max-w-2xl text-slate-500">
            Plan your railway journey based on your travel preferences,
            budget, and schedule.
          </p>
        </div>

        {/* Planner Form */}
        <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                <Route size={24} />
              </div>

              <div>
                <h2 className="text-lg font-bold">
                  Plan your journey
                </h2>

                <p className="text-sm text-slate-500">
                  Choose your travel requirements.
                </p>
              </div>
            </div>

            <div className="space-y-5">
              {/* From */}
              <div>
                <label
                  htmlFor="from"
                  className="mb-2 block text-sm font-semibold"
                >
                  From Station
                </label>

                <div className="relative">
                  <MapPin
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <select
                    id="from"
                    value={fromCode}
                    onChange={(event) => {
                      setFromCode(event.target.value);
                      setPlan(null);
                    }}
                    className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pl-11 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="">Select departure station</option>

                    {stations.map((station) => (
                      <option key={station.code} value={station.code}>
                        {station.name} ({station.code})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* To */}
              <div>
                <label
                  htmlFor="to"
                  className="mb-2 block text-sm font-semibold"
                >
                  To Station
                </label>

                <div className="relative">
                  <MapPin
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <select
                    id="to"
                    value={toCode}
                    onChange={(event) => {
                      setToCode(event.target.value);
                      setPlan(null);
                    }}
                    className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pl-11 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="">Select destination station</option>

                    {stations.map((station) => (
                      <option key={station.code} value={station.code}>
                        {station.name} ({station.code})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Date */}
              <div>
                <label
                  htmlFor="date"
                  className="mb-2 block text-sm font-semibold"
                >
                  Journey Date
                </label>

                <div className="relative">
                  <CalendarDays
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="date"
                    type="date"
                    value={date}
                    onChange={(event) => {
                      setDate(event.target.value);
                      setPlan(null);
                    }}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pl-11 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              {/* Budget */}
              <div>
                <label
                  htmlFor="budget"
                  className="mb-2 block text-sm font-semibold"
                >
                  Maximum Budget (₹)
                </label>

                <div className="relative">
                  <IndianRupee
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="budget"
                    type="number"
                    min="1"
                    placeholder="1000"
                    value={budget}
                    onChange={(event) => {
                      setBudget(event.target.value);
                      setPlan(null);
                    }}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pl-11 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              {/* Preference */}
              <div>
                <label
                  htmlFor="preference"
                  className="mb-2 block text-sm font-semibold"
                >
                  Travel Preference
                </label>

                <div className="relative">
                  <SlidersHorizontal
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <select
                    id="preference"
                    value={preference}
                    onChange={(event) => {
                      setPreference(event.target.value as TravelPreference);
                      setPlan(null);
                    }}
                    className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pl-11 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="balanced">
                      Balanced Journey
                    </option>

                    <option value="fastest">
                      Fastest Journey
                    </option>

                    <option value="cheapest">
                      Cheapest Journey
                    </option>
                  </select>
                </div>
              </div>

              {error && (
                <p className="rounded-xl bg-red-50 p-3 text-sm font-medium text-red-600">
                  {error}
                </p>
              )}

              <button
                type="button"
                onClick={handlePlanJourney}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                <Search size={18} />
                Plan My Journey
              </button>
            </div>
          </div>

          {/* Planning Summary */}
          <div className="flex flex-col gap-5">
            <div className="rounded-3xl bg-slate-900 p-6 text-white shadow-sm sm:p-8">
              <div className="mb-6 flex items-center gap-3">
                <div className="rounded-xl bg-white/10 p-3">
                  <TrainFront size={24} />
                </div>

                <h2 className="text-lg font-bold">
                  Your Journey
                </h2>
              </div>

              {fromStation && toStation ? (
                <div className="space-y-5">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                      Departure
                    </p>

                    <p className="mt-1 text-xl font-bold">
                      {fromStation.code}
                    </p>

                    <p className="text-sm text-slate-400">
                      {fromStation.name}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 text-slate-400">
                    <ArrowRight size={18} />
                    <span className="text-xs">Journey Route</span>
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                      Destination
                    </p>

                    <p className="mt-1 text-xl font-bold">
                      {toStation.code}
                    </p>

                    <p className="text-sm text-slate-400">
                      {toStation.name}
                    </p>
                  </div>

                  <div className="border-t border-white/10 pt-5">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400">Budget</span>
                      <span className="font-semibold">
                        ₹{Number(budget) > 0 ? Number(budget).toLocaleString("en-IN") : "—"}
                      </span>
                    </div>

                    <div className="mt-3 flex items-center justify-between text-sm">
                      <span className="text-slate-400">Preference</span>
                      <span className="font-semibold capitalize">
                        {preference}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-8 text-center">
                  <Route className="mx-auto mb-4 text-slate-500" size={40} />

                  <p className="text-sm leading-6 text-slate-400">
                    Select your departure and destination stations
                    to preview your journey.
                  </p>
                </div>
              )}
            </div>

            <div className="rounded-3xl border border-blue-100 bg-blue-50 p-6">
              <div className="flex items-start gap-3">
                <CheckCircle2
                  size={22}
                  className="mt-0.5 shrink-0 text-blue-600"
                />

                <div>
                  <h3 className="font-bold text-blue-900">
                    Smart Planning
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-blue-800">
                    Future versions will connect this planner
                    to railway APIs and AI-powered recommendations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        {plan && (
          <section className="mt-12">
            <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold tracking-wide text-blue-600">
                  JOURNEY OPTIONS
                </p>

                <h2 className="mt-1 text-2xl font-bold">
                  Suggested Journeys
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  {plan.from.code} → {plan.to.code} · {plan.date}
                </p>
              </div>

              <span className="w-fit rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                Demo Data
              </span>
            </div>

            <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-800">
              These are illustrative journey options, not actual train
              schedules or live fares. No real railway availability is being
              checked.
            </div>

            <div className="grid gap-5 lg:grid-cols-3">
              {visibleRecommendations.map((recommendation) => {
                const withinBudget =
                  recommendation.fare <= plan.budget;

                return (
                  <article
                    key={recommendation.number}
                    className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                  >
                    <div className="mb-5 flex items-start justify-between gap-3">
                      <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                        <TrainFront size={22} />
                      </div>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          withinBudget
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {withinBudget ? "Within Budget" : "Over Budget"}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold">
                      {recommendation.name}
                    </h3>

                    <p className="mt-1 text-xs text-slate-400">
                      {recommendation.number}
                    </p>

                    <div className="mt-5 grid grid-cols-2 gap-3">
                      <div className="rounded-xl bg-slate-50 p-3">
                        <p className="text-xs text-slate-400">
                          Departure
                        </p>

                        <p className="mt-1 text-sm font-bold">
                          {recommendation.departure}
                        </p>
                      </div>

                      <div className="rounded-xl bg-slate-50 p-3">
                        <p className="text-xs text-slate-400">
                          Arrival
                        </p>

                        <p className="mt-1 text-sm font-bold">
                          {recommendation.arrival}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
                      <Clock3 size={16} />
                      {recommendation.duration}
                    </div>

                    <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-5">
                      <div>
                        <p className="text-xs text-slate-400">
                          Estimated Fare
                        </p>

                        <p className="mt-1 text-xl font-bold text-slate-900">
                          ₹{recommendation.fare}
                        </p>
                      </div>

                      <IndianRupee size={20} className="text-slate-300" />
                    </div>

                    <p className="mt-4 text-xs leading-5 text-slate-500">
                      {recommendation.reason}
                    </p>
                  </article>
                );
              })}
            </div>
          </section>
        )}
      </section>
    </main>
  );
}