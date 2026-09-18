
import Link from "next/link";

import {
  ArrowLeft,
  ArrowRight,
  Clock,
  TrainFront,
  MapPin,
  CalendarDays,
  CheckCircle2,
} from "lucide-react";

type SearchParams = {
  from?: string;
  to?: string;
  date?: string;
};

type Train = {
  number: string;
  name: string;
  from: string;
  to: string;
  departure: string;
  arrival: string;
  duration: string;
  fare: number;
  classType?: string;
};

type ApiResponse = {
  success: boolean;
  count: number;
  data: Train[];
  demo?: boolean;
  message?: string;
};

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

function getStationName(code: string) {
  const stations: Record<string, string> = {
    NJP: "New Jalpaiguri",
    HWH: "Howrah Junction",
    SDAH: "Sealdah",
    BWN: "Barddhaman",
    MLD: "Malda Town",
  };

  return stations[code] || code;
}

export default async function TrainDetailsPage({
  params,
  searchParams,
}: {
  params: Promise<{ number: string }>;
  searchParams: Promise<SearchParams>;
}) {
  const { number } = await params;
  const query = await searchParams;

  const from = (query.from || "NJP").toUpperCase();
  const to = (query.to || "HWH").toUpperCase();
  const date = query.date;

  let train: Train | undefined;
  let apiError = false;
  let isDemoData = true;

  try {
    const apiUrl = new URL("http://localhost:3000/api/trains");

    apiUrl.searchParams.set("from", from);
    apiUrl.searchParams.set("to", to);

    const response = await fetch(apiUrl.toString(), {
      cache: "no-store",
    });

    if (!response.ok) {
      apiError = true;
    } else {
      const apiData: ApiResponse = await response.json();

      train = apiData.data?.find(
        (item) => item.number === number
      );

      isDemoData = apiData.demo ?? true;
    }
  } catch (error) {
    console.error("Train details API error:", error);
    apiError = true;
  }

  if (!train || apiError) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
        <div className="text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-500">
            <TrainFront size={30} />
          </div>

          <h1 className="text-3xl font-bold">
            {apiError ? "Unable to Load Train" : "Train Not Found"}
          </h1>

          <p className="mt-3 text-slate-500">
            {apiError
              ? "Something went wrong while fetching train details."
              : "We couldn't find details for this train."}
          </p>

          <Link
            href={`/trains?from=${from}&to=${to}&date=${date || ""}`}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            <ArrowLeft size={16} />
            Back to Trains
          </Link>
        </div>
      </main>
    );
  }

  const stops = [
    getStationName(from),
    "Intermediate Station (Demo)",
    getStationName(to),
  ];

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
            href={`/trains?from=${from}&to=${to}&date=${date || ""}`}
            className="flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-blue-600"
          >
            <ArrowLeft size={16} />
            Back to Results
          </Link>
        </div>
      </header>

      {/* Main */}
      <section className="mx-auto max-w-5xl px-6 py-12">
        {/* Heading */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold tracking-wide text-blue-600">
            TRAIN DETAILS
          </p>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {train.name}
          </h1>

          <p className="mt-2 text-slate-500">
            Train No. {train.number}
          </p>
        </div>

        {/* Journey Summary */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Journey Route
              </p>

              <h2 className="mt-2 text-2xl font-bold">
                {from} → {to}
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {getStationName(from)} to {getStationName(to)}
              </p>
            </div>

            <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
              {isDemoData ? "Demo Data" : "Available"}
            </span>
          </div>

          {/* Time Details */}
          <div className="my-8 grid gap-6 sm:grid-cols-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Departure
              </p>

              <p className="mt-2 text-3xl font-bold">
                {train.departure}
              </p>

              <p className="mt-1 text-sm text-slate-500">
                {getStationName(from)}
              </p>
            </div>

            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Clock size={16} />
                {train.duration}
              </div>

              <div className="mt-3 h-px bg-slate-200" />

              <p className="mt-2 text-xs text-slate-400">
                Estimated journey duration
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Arrival
              </p>

              <p className="mt-2 text-3xl font-bold">
                {train.arrival}
              </p>

              <p className="mt-1 text-sm text-slate-500">
                {getStationName(to)}
              </p>
            </div>
          </div>

          {/* Date, Classes and Fare */}
          <div className="grid gap-4 border-t border-slate-100 pt-6 sm:grid-cols-3">
            <div className="flex items-center gap-3">
              <CalendarDays className="text-blue-600" size={20} />

              <div>
                <p className="text-xs text-slate-400">
                  Journey Date
                </p>

                <p className="text-sm font-semibold">
                  {formatDate(date)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <TrainFront className="text-blue-600" size={20} />

              <div>
                <p className="text-xs text-slate-400">
                  Available Classes
                </p>

                <p className="text-sm font-semibold">
                  {train.classType || "SL, 3A"}
                </p>
              </div>
            </div>

            <div>
              <p className="text-xs text-slate-400">
                Starting Fare
              </p>

              <p className="text-xl font-bold text-blue-600">
                ₹{train.fare}
              </p>

              <p className="text-xs text-slate-400">
                Estimated fare
              </p>
            </div>
          </div>
        </div>

        {/* Station Stops */}
        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-6">
            <p className="text-sm font-semibold tracking-wide text-blue-600">
              ROUTE
            </p>

            <h2 className="mt-1 text-2xl font-bold">
              Station Stops
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Illustrative route information for development.
            </p>
          </div>

          <div className="relative space-y-6">
            {stops.map((stop, index) => (
              <div
                key={`${stop}-${index}`}
                className="relative flex items-start gap-4"
              >
                {/* Timeline */}
                <div className="flex flex-col items-center">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                    {index === 0 || index === stops.length - 1 ? (
                      <MapPin size={18} />
                    ) : (
                      <CheckCircle2 size={18} />
                    )}
                  </div>

                  {index !== stops.length - 1 && (
                    <div className="h-8 w-px bg-blue-100" />
                  )}
                </div>

                {/* Station */}
                <div className="pt-1">
                  <p className="font-semibold">{stop}</p>

                  <p className="mt-1 text-xs text-slate-400">
                    {index === 0
                      ? "Starting station"
                      : index === stops.length - 1
                        ? "Final station"
                        : "Intermediate stop"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
<div className="mt-8 flex flex-wrap gap-4">
  <Link
    href={`/trains?from=${from}&to=${to}&date=${date || ""}`}
    className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
  >
    <ArrowLeft size={16} />
    Back to Train Results
  </Link>

  <Link
    href={`/booking?train=${train.number}&from=${from}&to=${to}&date=${date || ""}`}
    className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
  >
    Book Now
    <ArrowRight size={16} />
  </Link>
</div>

        {/* Demo Notice */}
        <div className="mt-8 rounded-xl border border-amber-100 bg-amber-50 p-4 text-center text-xs leading-5 text-amber-800">
          Train routes, timings, fares, and stops shown here
          are mock development data. Verify details through
          official railway sources before travelling.
        </div>
      </section>
    </main>
  );
}