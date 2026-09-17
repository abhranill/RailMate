
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  Search,
  ShieldCheck,
  Ticket,
  TrainFront,
  UserRound,
} from "lucide-react";

type Passenger = {
  name: string;
  bookingStatus: string;
  currentStatus: string;
  coach: string;
  berth: string;
};

const demoPassenger: Passenger = {
  name: "Demo Passenger",
  bookingStatus: "CNF",
  currentStatus: "CNF",
  coach: "B2",
  berth: "41",
};

export default function PNRPage() {
  const [pnr, setPnr] = useState("");
  const [searchedPNR, setSearchedPNR] = useState("");
  const [passenger, setPassenger] = useState<Passenger | null>(null);
  const [error, setError] = useState("");

  const handleSearch = () => {
    const value = pnr.trim();

    setError("");
    setPassenger(null);

    if (!/^\d{10}$/.test(value)) {
      setError("Please enter a valid 10-digit PNR number.");
      return;
    }

    // Demonstration only.
    // Replace this with a real railway API later.
    setSearchedPNR(value);
    setPassenger(demoPassenger);
  };

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

      {/* Main */}
      <section className="mx-auto max-w-4xl px-6 py-12">
        {/* Heading */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold tracking-wide text-blue-600">
            PASSENGER SERVICES
          </p>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Check PNR Status
          </h1>

          <p className="mt-3 text-slate-500">
            Check your railway booking status using your 10-digit PNR number.
          </p>
        </div>

        {/* Search Card */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-5 flex items-center gap-3">
            <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
              <Ticket size={24} />
            </div>

            <div>
              <h2 className="text-lg font-bold">
                Enter your PNR
              </h2>

              <p className="text-sm text-slate-500">
                Enter the 10-digit booking reference.
              </p>
            </div>
          </div>

          <label
            htmlFor="pnr"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            PNR Number
          </label>

          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              id="pnr"
              type="text"
              inputMode="numeric"
              maxLength={10}
              placeholder="Enter 10-digit PNR"
              value={pnr}
              onChange={(event) => {
                setPnr(event.target.value.replace(/\D/g, ""));
                setError("");
              }}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            <button
              type="button"
              onClick={handleSearch}
              className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              <Search size={18} />
              Check Status
            </button>
          </div>

          {error && (
            <p className="mt-3 text-sm font-medium text-red-600">
              {error}
            </p>
          )}

          <div className="mt-5 flex items-start gap-2 rounded-xl bg-amber-50 p-4 text-xs leading-5 text-amber-800">
            <ShieldCheck size={16} className="mt-0.5 shrink-0" />
            <p>
              Demo mode: This page displays illustrative booking information.
              No real railway booking data is retrieved.
            </p>
          </div>
        </div>

        {/* PNR Result */}
        {passenger && (
          <div className="mt-8 space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">
                Booking Details
              </h2>

              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                Demo Result
              </span>
            </div>

            {/* Status Banner */}
            <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6">
              <div className="flex items-center gap-3">
                <CheckCircle2
                  size={28}
                  className="text-emerald-600"
                />

                <div>
                  <p className="text-sm font-medium text-emerald-700">
                    Current Booking Status
                  </p>

                  <h3 className="text-2xl font-bold text-emerald-800">
                    Confirmed (CNF)
                  </h3>
                </div>
              </div>

              <p className="mt-4 text-sm text-emerald-700">
                Your demo booking has been marked as confirmed.
              </p>
            </div>

            {/* PNR Information */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-lg font-bold">
                  Journey Information
                </h3>

                <Ticket size={22} className="text-blue-600" />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <InfoItem
                  label="PNR Number"
                  value={searchedPNR}
                />

                <InfoItem
                  label="Passenger"
                  value={passenger.name}
                />

                <InfoItem
                  label="Booking Status"
                  value={passenger.bookingStatus}
                />

                <InfoItem
                  label="Current Status"
                  value={passenger.currentStatus}
                />

                <InfoItem
                  label="Coach"
                  value={passenger.coach}
                />

                <InfoItem
                  label="Berth / Seat"
                  value={passenger.berth}
                />
              </div>
            </div>

            {/* Passenger Card */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-slate-100 p-3 text-slate-600">
                  <UserRound size={22} />
                </div>

                <div>
                  <h3 className="font-bold">
                    Passenger 1
                  </h3>

                  <p className="text-sm text-slate-500">
                    {passenger.name}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <span className="rounded-lg bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700">
                  Coach {passenger.coach}
                </span>

                <span className="rounded-lg bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700">
                  Berth {passenger.berth}
                </span>

                <span className="rounded-lg bg-emerald-100 px-3 py-2 text-sm font-semibold text-emerald-700">
                  Confirmed
                </span>
              </div>
            </div>

            <p className="text-center text-xs leading-5 text-slate-500">
              This is a mock result for development purposes.
              Verify actual booking information through official railway services.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}

function InfoItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-2 break-all text-sm font-bold text-slate-800">
        {value}
      </p>
    </div>
  );
}