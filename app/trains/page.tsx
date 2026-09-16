import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  TrainFront,
  CalendarDays,
  MapPin,
} from "lucide-react";

import { stations } from "@/lib/stations";

type SearchParams = {
  from?: string;
  to?: string;
  date?: string;
};

type Train = {
  number: string;
  name: string;
  departure: string;
  arrival: string;
  duration: string;
  classType: string;
};

const trains: Train[] = [
  {
    number: "12344",
    name: "Darjeeling Mail",
    departure: "18:00",
    arrival: "06:00",
    duration: "12h 00m",
    classType: "SL, 3A, 2A",
  },
  {
    number: "12378",
    name: "Padatik Express",
    departure: "09:00",
    arrival: "19:30",
    duration: "10h 30m",
    classType: "SL, 3A, 2A",
  },
  {
    number: "13148",
    name: "Uttar Banga Express",
    departure: "20:00",
    arrival: "08:30",
    duration: "12h 30m",
    classType: "SL, 3A",
  },
];

function formatDate(dateString?: string) {
  if (!dateString) return "Date not selected";

  const [year, month, day] = dateString.split("-").map(Number);

  if (!year || !month || !day) {
    return "Invalid date";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(year, month - 1, day));
}

function getStation(code?: string) {
  if (!code) return null;

  return stations.find(
    (station) => station.code === code.toUpperCase()
  );
}

export default async function TrainsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;

  const fromCode = (params.from || "NJP").toUpperCase();
  const toCode = (params.to || "HWH").toUpperCase();
  const date = params.date;

  const fromStation = getStation(fromCode);
  const toStation = getStation(toCode);

  const fromName = fromStation?.name || fromCode;
  const toName = toStation?.name || toCode;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <div className="rounded-xl bg-blue-600 p-2 text-white">
              <TrainFront size={22} />
            </div>

            <span className="text-xl font-bold tracking-tight">
              RailMate <span className="text-blue-600">AI</span>
            </span>
          </a>

          {/* Back Home */}
          <a
            href="/"
            className="flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-blue-600"
          >
            <ArrowLeft size={16} />
            Back Home
          </a>
        </div>
      </header>

      {/* Main */}
      <section className="mx-auto max-w-5xl px-6 py-12">
        {/* Page Heading */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold tracking-wide text-blue-600">
            TRAIN DISCOVERY
          </p>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Available Trains
          </h1>

          <p className="mt-3 text-slate-500">
            Explore train options for your journey.
          </p>
        </div>

        {/* Journey Summary */}
        <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                From
              </p>

              <h2 className="mt-1 text-xl font-bold">
                {fromName}
              </h2>

              <p className="text-sm font-semibold text-blue-600">
                {fromCode}
              </p>
            </div>

            <ArrowRight className="mx-2 text-blue-600" size={22} />

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                To
              </p>

              <h2 className="mt-1 text-xl font-bold">
                {toName}
              </h2>

              <p className="text-sm font-semibold text-blue-600">
                {toCode}
              </p>
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

        {/* Results Count */}
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-bold">
            Train Options
          </h2>

          <span className="text-sm text-slate-500">
            {trains.length} trains
          </span>
        </div>

        {/* Train Cards */}
        <div className="space-y-5">
          {trains.map((train) => (
            <div
              key={train.number}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              {/* Train Header */}
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <TrainFront
                      size={20}
                      className="text-blue-600"
                    />

                    <h3 className="text-lg font-bold">
                      {train.name}
                    </h3>
                  </div>

                  <p className="mt-1 text-sm text-slate-500">
                    Train No. {train.number}
                  </p>
                </div>

                <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                  Demo Data
                </span>
              </div>

              {/* Timing */}
              <div className="my-6 grid gap-5 sm:grid-cols-3">
                {/* Departure */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Departure
                  </p>

                  <p className="mt-1 text-3xl font-bold">
                    {train.departure}
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-600">
                    {fromCode}
                  </p>

                  <p className="text-xs text-slate-500">
                    {fromName}
                  </p>
                </div>

                {/* Duration */}
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

                {/* Arrival */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Arrival
                  </p>

                  <p className="mt-1 text-3xl font-bold">
                    {train.arrival}
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-600">
                    {toCode}
                  </p>

                  <p className="text-xs text-slate-500">
                    {toName}
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-4">
                <div>
                  <p className="text-xs text-slate-400">
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
            </div>
          ))}
        </div>

        {/* Notice */}
        <div className="mt-8 rounded-xl border border-amber-100 bg-amber-50 p-4 text-center text-xs leading-5 text-amber-800">
          Demo train information only. Timings and availability
          are not real-time railway data.
        </div>
      </section>
    </main>
  );
}