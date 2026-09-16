
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  TrainFront,
} from "lucide-react";

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
    month: "short",
    year: "numeric",
  }).format(new Date(year, month - 1, day));
}

export default async function TrainsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;

  const from = params.from || "NJP";
  const to = params.to || "HWH";
  const date = params.date;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <a href="/" className="flex items-center gap-2">
            <div className="rounded-xl bg-blue-600 p-2 text-white">
              <TrainFront size={22} />
            </div>

            <span className="text-xl font-bold">
              RailMate <span className="text-blue-600">AI</span>
            </span>
          </a>

          <a
            href="/"
            className="flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-blue-600"
          >
            <ArrowLeft size={16} />
            Back Home
          </a>
        </div>
      </header>

      {/* Main Content */}
      <section className="mx-auto max-w-5xl px-6 py-12">
        {/* Page Heading */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold text-blue-600">
            TRAIN DISCOVERY
          </p>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Available Trains
          </h1>

          <p className="mt-3 text-slate-500">
            Explore train options for your journey.
          </p>
        </div>

        {/* Dynamic Journey Summary */}
        <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-wrap items-center gap-3 text-lg font-bold">
            <span>{from.toUpperCase()}</span>

            <ArrowRight className="text-blue-600" size={20} />

            <span>{to.toUpperCase()}</span>
          </div>

          <p className="mt-2 text-sm text-slate-500">
            {from.toUpperCase()} → {to.toUpperCase()}
          </p>

          <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
            <Clock size={16} />
            Journey Date: {formatDate(date)}
          </div>
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

                    <h2 className="font-bold">{train.name}</h2>
                  </div>

                  <p className="mt-1 text-sm text-slate-500">
                    Train No. {train.number}
                  </p>
                </div>

                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                  Demo
                </span>
              </div>

              {/* Timing Information */}
              <div className="my-6 grid gap-4 sm:grid-cols-3">
                {/* Departure */}
                <div>
                  <p className="text-xs font-medium text-slate-500">
                    Departure
                  </p>

                  <p className="mt-1 text-2xl font-bold">
                    {train.departure}
                  </p>

                  <p className="text-sm text-slate-500">
                    {from.toUpperCase()}
                  </p>
                </div>

                {/* Duration */}
                <div className="flex flex-col justify-center">
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Clock size={16} />
                    {train.duration}
                  </div>

                  <div className="mt-2 h-px bg-slate-200" />
                </div>

                {/* Arrival */}
                <div>
                  <p className="text-xs font-medium text-slate-500">
                    Arrival
                  </p>

                  <p className="mt-1 text-2xl font-bold">
                    {train.arrival}
                  </p>

                  <p className="text-sm text-slate-500">
                    {to.toUpperCase()}
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-4">
                <p className="text-sm text-slate-500">
                  Classes: {train.classType}
                </p>

                <button
                  type="button"
                  className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  View Details
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Demo Notice */}
        <p className="mt-8 text-center text-xs text-slate-400">
          Demo train data for development only. Not real-time
          schedules or availability.
        </p>
      </section>
    </main>
  );
}