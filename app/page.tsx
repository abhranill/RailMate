
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  TrainFront,
  MapPin,
  Search,
} from "lucide-react";

import { stations, Station } from "@/lib/stations";

export default function Home() {
  const router = useRouter();

  // Search input states
  const [fromQuery, setFromQuery] = useState("");
  const [toQuery, setToQuery] = useState("");

  // Selected station states
  const [fromStation, setFromStation] = useState<Station | null>(null);
  const [toStation, setToStation] = useState<Station | null>(null);

  // Journey date
  const [date, setDate] = useState("");

  // Minimum journey date
  const [minDate, setMinDate] = useState("");

  // Set minimum date after component mounts
  useEffect(() => {
    const today = new Date();

    const formattedDate = [
      today.getFullYear(),
      String(today.getMonth() + 1).padStart(2, "0"),
      String(today.getDate()).padStart(2, "0"),
    ].join("-");

    setMinDate(formattedDate);
  }, []);

  // Handle train search
  const handleSearch = () => {
    if (!fromStation || !toStation || !date) {
      alert("Please select From, To stations and journey date.");
      return;
    }

    if (fromStation.code === toStation.code) {
      alert("From and To stations cannot be the same.");
      return;
    }

    const params = new URLSearchParams({
      from: fromStation.code,
      to: toStation.code,
      date,
    });

    router.push(`/trains?${params.toString()}`);
  };

  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-900">
      {/* Navbar */}
      <nav className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <div className="rounded-xl bg-blue-600 p-2 text-white">
              <TrainFront size={22} />
            </div>

            <span className="text-xl font-bold tracking-tight">
              RailMate <span className="text-blue-600">AI</span>
            </span>
          </a>

          {/* Navigation */}
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

          {/* AI Button */}
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
            <StationAutocomplete
              label="From"
              placeholder="Search departure station"
              value={fromQuery}
              selectedStation={fromStation}
              onChange={(value) => {
                setFromQuery(value);
                setFromStation(null);
              }}
              onSelect={(station) => {
                setFromStation(station);
                setFromQuery(`${station.name} (${station.code})`);
              }}
            />

            {/* To Station */}
            <StationAutocomplete
              label="To"
              placeholder="Search arrival station"
              value={toQuery}
              selectedStation={toStation}
              onChange={(value) => {
                setToQuery(value);
                setToStation(null);
              }}
              onSelect={(station) => {
                setToStation(station);
                setToQuery(`${station.name} (${station.code})`);
              }}
            />

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
                min={minDate || undefined}
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

/* =========================================
   Station Autocomplete Component
========================================= */

type StationAutocompleteProps = {
  label: string;
  placeholder: string;
  value: string;
  selectedStation: Station | null;
  onChange: (value: string) => void;
  onSelect: (station: Station) => void;
};

function StationAutocomplete({
  label,
  placeholder,
  value,
  selectedStation,
  onChange,
  onSelect,
}: StationAutocompleteProps) {
  const [isFocused, setIsFocused] = useState(false);

  const searchTerm = value.trim().toLowerCase();

  const filteredStations = stations
    .filter((station) => {
      if (!searchTerm) return true;

      return (
        station.name.toLowerCase().includes(searchTerm) ||
        station.code.toLowerCase().includes(searchTerm) ||
        station.city.toLowerCase().includes(searchTerm) ||
        station.state.toLowerCase().includes(searchTerm)
      );
    })
    .slice(0, 6);

  const showSuggestions =
    isFocused && !selectedStation && filteredStations.length > 0;

  return (
    <div className="relative">
      <label
        htmlFor={label}
        className="mb-2 block text-sm font-semibold text-slate-700"
      >
        {label}
      </label>

      {/* Input */}
      <div className="relative">
        <Search
          size={17}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          id={label}
          type="text"
          placeholder={placeholder}
          value={value}
          autoComplete="off"
          onFocus={() => setIsFocused(true)}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && (
        <div className="absolute left-0 right-0 z-50 mt-2 max-h-72 overflow-y-auto rounded-xl border border-slate-200 bg-white p-2 shadow-xl">
          {filteredStations.map((station) => (
            <button
              key={station.code}
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                onSelect(station);
                setIsFocused(false);
              }}
              className="flex w-full items-start gap-3 rounded-lg px-3 py-3 text-left transition hover:bg-blue-50"
            >
              <MapPin
                size={18}
                className="mt-1 shrink-0 text-blue-600"
              />

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-semibold text-slate-900">
                    {station.name}
                  </p>

                  <span className="rounded bg-slate-100 px-1.5 py-0.5 text-xs font-bold text-slate-600">
                    {station.code}
                  </span>
                </div>

                <p className="mt-1 text-xs text-slate-500">
                  {station.city}, {station.state}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Selected Station Indicator */}
      {selectedStation && (
        <p className="mt-1 text-xs font-medium text-green-600">
          ✓ Station selected: {selectedStation.code}
        </p>
      )}
    </div>
  );
}

/* =========================================
   Feature Card Component
========================================= */

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