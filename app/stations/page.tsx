
"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  Building2,
  MapPin,
  Search,
  TrainFront,
  Utensils,
  Accessibility,
  BedDouble,
} from "lucide-react";

type Station = {
  code: string;
  name: string;
  city: string;
  state: string;
  zone: string;
  facilities: string[];
};

const stations: Station[] = [
  {
    code: "NJP",
    name: "New Jalpaiguri",
    city: "Siliguri",
    state: "West Bengal",
    zone: "Northeast Frontier Railway",
    facilities: ["Food", "Waiting Room", "Parking"],
  },
  {
    code: "HWH",
    name: "Howrah Junction",
    city: "Howrah",
    state: "West Bengal",
    zone: "Eastern Railway",
    facilities: ["Food", "Waiting Room", "Accessibility"],
  },
  {
    code: "SDAH",
    name: "Sealdah",
    city: "Kolkata",
    state: "West Bengal",
    zone: "Eastern Railway",
    facilities: ["Food", "Waiting Room", "Parking"],
  },
  {
    code: "NDLS",
    name: "New Delhi",
    city: "New Delhi",
    state: "Delhi",
    zone: "Northern Railway",
    facilities: ["Food", "Waiting Room", "Accessibility"],
  },
  {
    code: "KOAA",
    name: "Kolkata",
    city: "Kolkata",
    state: "West Bengal",
    zone: "Eastern Railway",
    facilities: ["Food", "Parking", "Waiting Room"],
  },
  {
    code: "BGP",
    name: "Bhagalpur",
    city: "Bhagalpur",
    state: "Bihar",
    zone: "Eastern Railway",
    facilities: ["Food", "Waiting Room"],
  },
];

const facilityIcons: Record<string, typeof Utensils> = {
  Food: Utensils,
  "Waiting Room": BedDouble,
  Parking: Building2,
  Accessibility: Accessibility,
};

export default function StationsPage() {
  const [query, setQuery] = useState("");
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);

  const filteredStations = useMemo(() => {
    const search = query.trim().toLowerCase();

    if (!search) return stations;

    return stations.filter((station) =>
      [
        station.name,
        station.code,
        station.city,
        station.state,
      ].some((value) => value.toLowerCase().includes(search))
    );
  }, [query]);

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

      {/* Page Content */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold tracking-wide text-blue-600">
            EXPLORE INDIA
          </p>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Station Explorer
          </h1>

          <p className="mt-3 max-w-2xl text-slate-500">
            Discover railway stations, station codes, and available facilities.
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-10 max-w-2xl">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search by station name, city, or code..."
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setSelectedStation(null);
            }}
            className="w-full rounded-2xl border border-slate-200 bg-white py-4 pl-12 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Station Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredStations.map((station) => (
            <button
              key={station.code}
              type="button"
              onClick={() => setSelectedStation(station)}
              className="group rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
            >
              <div className="mb-5 flex items-start justify-between">
                <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                  <TrainFront size={22} />
                </div>

                <span className="rounded-lg bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                  {station.code}
                </span>
              </div>

              <h2 className="text-lg font-bold text-slate-900">
                {station.name}
              </h2>

              <div className="mt-2 flex items-center gap-1.5 text-sm text-slate-500">
                <MapPin size={15} />
                {station.city}, {station.state}
              </div>

              <p className="mt-4 text-xs leading-5 text-slate-400">
                {station.zone}
              </p>

              <div className="mt-5 flex items-center justify-between">
                <span className="text-xs font-semibold text-blue-600">
                  View Details
                </span>

                <span className="text-slate-400 transition group-hover:translate-x-1">
                  →
                </span>
              </div>
            </button>
          ))}
        </div>

        {filteredStations.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <Search className="mx-auto mb-3 text-slate-400" size={32} />

            <h2 className="font-bold text-slate-800">
              No stations found
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Try searching with a different station name or code.
            </p>
          </div>
        )}

        {/* Selected Station Details */}
        {selectedStation && (
          <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
              <div>
                <p className="text-sm font-semibold text-blue-600">
                  STATION DETAILS
                </p>

                <h2 className="mt-2 text-2xl font-bold">
                  {selectedStation.name}
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  {selectedStation.city}, {selectedStation.state}
                </p>
              </div>

              <span className="w-fit rounded-xl bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700">
                {selectedStation.code}
              </span>
            </div>

            <div className="mt-6 border-t border-slate-100 pt-6">
              <h3 className="font-bold">Railway Zone</h3>

              <p className="mt-2 text-sm text-slate-500">
                {selectedStation.zone}
              </p>
            </div>

            <div className="mt-6">
              <h3 className="font-bold">Facilities</h3>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {selectedStation.facilities.map((facility) => {
                  const Icon = facilityIcons[facility] ?? Building2;

                  return (
                    <div
                      key={facility}
                      className="flex items-center gap-3 rounded-xl bg-slate-50 p-4"
                    >
                      <Icon size={20} className="text-blue-600" />

                      <span className="text-sm font-medium text-slate-700">
                        {facility}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <p className="mt-6 text-xs leading-5 text-slate-400">
              Demo information: Facilities and railway zone data are
              illustrative. Verify actual facilities before travelling.
            </p>
          </section>
        )}
      </section>
    </main>
  );
}