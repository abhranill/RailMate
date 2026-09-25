
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  Clock,
  TrainFront,
  CalendarDays,
  MapPin,
  SlidersHorizontal,
  RotateCcw,
} from "lucide-react";

export type Train = {
  number: string;
  name: string;
  from: string;
  to: string;
  departure: string;
  arrival: string;
  duration: string;
  fare: number;
  classType: string;
};

type Props = {
  trains: Train[];
  fromCode: string;
  toCode: string;
  fromName: string;
  toName: string;
  date?: string;
  demo?: boolean;
  errorMessage?: string;
};

type SortOption = "departure" | "fare-low" | "fare-high" | "duration";

const travelClasses = ["SL", "3A", "2A"];

function formatDate(dateString?: string) {
  if (!dateString) return "Date not selected";

  const [year, month, day] = dateString.split("-").map(Number);

  if (!year || !month || !day) return "Invalid date";

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(year, month - 1, day));
}

function timeToMinutes(time: string) {
  const [hours, minutes] = time.split(":").map(Number);
  return (hours || 0) * 60 + (minutes || 0);
}

function durationToMinutes(duration: string) {
  const hourMatch = duration.match(/(\d+)\s*h/i);
  const minuteMatch = duration.match(/(\d+)\s*m/i);

  const hours = hourMatch ? Number(hourMatch[1]) : 0;
  const minutes = minuteMatch ? Number(minuteMatch[1]) : 0;

  // Also supports values such as "10h30".
  if (!minuteMatch) {
    const compactMatch = duration.match(/(\d+)\s*h\s*(\d{1,2})/i);
    if (compactMatch) {
      return Number(compactMatch[1]) * 60 + Number(compactMatch[2]);
    }
  }

  return hours * 60 + minutes;
}

function getAvailableClasses(classType: string) {
  return classType
    .toUpperCase()
    .split(/[,/| ]+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export default function TrainResults({
  trains,
  fromCode,
  toCode,
  fromName,
  toName,
  date,
  demo,
  errorMessage,
}: Props) {
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("departure");

  const filteredTrains = useMemo(() => {
    const filtered = trains.filter((train) => {
      if (selectedClasses.length === 0) return true;

      const available = getAvailableClasses(train.classType);

      return selectedClasses.some((className) =>
        available.includes(className)
      );
    });

    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "fare-low":
          return a.fare - b.fare;
        case "fare-high":
          return b.fare - a.fare;
        case "duration":
          return durationToMinutes(a.duration) - durationToMinutes(b.duration);
        case "departure":
        default:
          return timeToMinutes(a.departure) - timeToMinutes(b.departure);
      }
    });
  }, [trains, selectedClasses, sortBy]);

  function toggleClass(className: string) {
    setSelectedClasses((current) =>
      current.includes(className)
        ? current.filter((item) => item !== className)
        : [...current, className]
    );
  }

  function clearFilters() {
    setSelectedClasses([]);
    setSortBy("departure");
  }

  const hasFilters = selectedClasses.length > 0 || sortBy !== "departure";

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
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

      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-12">
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold tracking-wide text-blue-600">
            TRAIN DISCOVERY
          </p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Available Trains
          </h1>
          <p className="mt-3 text-slate-500">
            Explore and compare train options for your journey.
          </p>
        </div>

        <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-wrap items-center gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                From
              </p>
              <h2 className="mt-1 text-xl font-bold">{fromName}</h2>
              <p className="text-sm font-semibold text-blue-600">{fromCode}</p>
            </div>

            <ArrowRight className="mx-2 text-blue-600" size={22} />

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                To
              </p>
              <h2 className="mt-1 text-xl font-bold">{toName}</h2>
              <p className="text-sm font-semibold text-blue-600">{toCode}</p>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-4 border-t border-slate-100 pt-4 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <CalendarDays size={16} />
              <span>{formatDate(date)}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={16} />
              <span>Indian Railways</span>
            </div>
          </div>
        </div>

        {errorMessage && (
          <div className="mb-5 rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-700">
            {errorMessage}
          </div>
        )}

        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold">Train Options</h2>
            <p className="mt-1 text-sm text-slate-500">
              Showing {filteredTrains.length} of {trains.length} trains
            </p>
          </div>

          {hasFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-600 transition hover:border-blue-200 hover:text-blue-600"
            >
              <RotateCcw size={15} />
              Clear filters
            </button>
          )}
        </div>

        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <SlidersHorizontal size={18} className="text-blue-600" />
            <h3 className="font-bold">Filter and sort</h3>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <p className="mb-3 text-sm font-semibold text-slate-700">
                Travel class
              </p>
              <div className="flex flex-wrap gap-2">
                {travelClasses.map((className) => {
                  const selected = selectedClasses.includes(className);

                  return (
                    <button
                      key={className}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => toggleClass(className)}
                      className={`rounded-xl border px-4 py-2 text-sm font-semibold transition ${
                        selected
                          ? "border-blue-600 bg-blue-600 text-white"
                          : "border-slate-200 bg-white text-slate-600 hover:border-blue-300"
                      }`}
                    >
                      {className}
                    </button>
                  );
                })}
              </div>
              <p className="mt-2 text-xs text-slate-400">
                Select one or more classes. Leave all unselected to show every class.
              </p>
            </div>

            <div>
              <label
                htmlFor="train-sort"
                className="mb-3 block text-sm font-semibold text-slate-700"
              >
                Sort results by
              </label>
              <select
                id="train-sort"
                value={sortBy}
                onChange={(event) =>
                  setSortBy(event.target.value as SortOption)
                }
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="departure">Departure time</option>
                <option value="fare-low">Fare: Low to high</option>
                <option value="fare-high">Fare: High to low</option>
                <option value="duration">Journey duration</option>
              </select>
            </div>
          </div>
        </div>

        {filteredTrains.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-10">
            <TrainFront size={44} className="mx-auto text-slate-300" />
            <h3 className="mt-4 text-xl font-bold">
              {trains.length === 0 ? "No trains found" : "No matching trains"}
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              {trains.length === 0
                ? "We couldn't find any trains for this route. Try searching for another station pair."
                : "Try selecting another travel class or clearing your filters."}
            </p>

            {trains.length > 0 ? (
              <button
                type="button"
                onClick={clearFilters}
                className="mt-5 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Clear filters
              </button>
            ) : (
              <Link
                href="/"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Search Another Route
                <ArrowRight size={16} />
              </Link>
            )}
          </div>
        ) : (
          <div className="space-y-5">
            {filteredTrains.map((train) => (
              <article
                key={train.number}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md sm:p-6"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <TrainFront size={20} className="text-blue-600" />
                      <h3 className="text-lg font-bold">{train.name}</h3>
                    </div>
                    <p className="mt-1 text-sm text-slate-500">
                      Train No. {train.number}
                    </p>
                  </div>

                  <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                    {demo ? "Demo Data" : "Available"}
                  </span>
                </div>

                <div className="my-6 grid gap-5 sm:grid-cols-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Departure
                    </p>
                    <p className="mt-1 text-3xl font-bold">{train.departure}</p>
                    <p className="mt-1 text-sm font-semibold text-slate-600">
                      {fromCode}
                    </p>
                    <p className="text-xs text-slate-500">{fromName}</p>
                  </div>

                  <div className="flex flex-col justify-center">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <Clock size={16} />
                      <span>{train.duration}</span>
                    </div>
                    <div className="mt-3 h-px bg-slate-200" />
                    <p className="mt-2 text-xs text-slate-400">
                      Journey duration
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Arrival
                    </p>
                    <p className="mt-1 text-3xl font-bold">{train.arrival}</p>
                    <p className="mt-1 text-sm font-semibold text-slate-600">
                      {toCode}
                    </p>
                    <p className="text-xs text-slate-500">{toName}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-4">
                  <div>
                    <p className="text-xs text-slate-400">Fare (Demo)</p>
                    <p className="mt-1 text-sm font-semibold text-slate-600">
                      ₹{train.fare}
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      Available classes
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-600">
                      {train.classType}
                    </p>
                  </div>

                  <Link
                    href={`/trains/${train.number}?from=${fromCode}&to=${toCode}&date=${date || ""}`}
                    className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                  >
                    View Details
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="mt-8 rounded-xl border border-amber-100 bg-amber-50 p-4 text-center text-xs leading-5 text-amber-800">
          Demo train information only. Timings, fares, and availability are not real-time railway data.
        </div>
      </section>
    </main>
  );
}