"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Download,
  MapPin,
  TrainFront,
  UserRound,
} from "lucide-react";

export default function BookingConfirmationPage() {
  const searchParams = useSearchParams();

  const bookingId =
    searchParams.get("bookingId") || "N/A";

  const trainNumber =
    searchParams.get("train") || "N/A";

  const from =
    searchParams.get("from") || "N/A";

  const to =
    searchParams.get("to") || "N/A";

  const date =
    searchParams.get("date") || "Not selected";

  const name =
    searchParams.get("name") || "Passenger";

  const age =
    searchParams.get("age") || "N/A";

  const gender =
    searchParams.get("gender") || "N/A";

  const phone =
    searchParams.get("phone") || "N/A";

  const classType =
    searchParams.get("classType") || "SL";

  function handlePrint() {
    window.print();
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-900">
      {/* Header */}
      <header className="mx-auto flex max-w-5xl items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2"
        >
          <div className="rounded-xl bg-blue-600 p-2 text-white">
            <TrainFront size={22} />
          </div>

          <span className="text-xl font-bold tracking-tight">
            RailMate{" "}
            <span className="text-blue-600">
              AI
            </span>
          </span>
        </Link>

        <Link
          href="/"
          className="text-sm font-semibold text-slate-600 transition hover:text-blue-600"
        >
          Home
        </Link>
      </header>

      {/* Main Content */}
      <section className="mx-auto mt-10 max-w-3xl">
        {/* Success */}
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
            <CheckCircle2 size={36} />
          </div>

          <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
            Booking Confirmed
          </h1>

          <p className="mt-2 text-slate-500">
            Your demo booking has been created successfully.
          </p>
        </div>

        {/* Ticket */}
        <div
          id="ticket"
          className="mt-10 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
        >
          {/* Ticket Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-blue-600 px-6 py-5 text-white sm:px-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-blue-100">
                RailMate AI
              </p>

              <h2 className="mt-1 text-xl font-bold">
                Demo E-Ticket
              </h2>
            </div>

            <div className="text-right">
              <p className="text-xs text-blue-100">
                Booking Reference
              </p>

              <p className="text-lg font-bold tracking-wider">
                {bookingId}
              </p>
            </div>
          </div>

          {/* Route */}
          <div className="border-b border-dashed border-slate-200 px-6 py-7 sm:px-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Journey Route
            </p>

            <div className="mt-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-2xl font-bold">
                  {from}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Boarding Station
                </p>
              </div>

              <div className="flex flex-1 items-center justify-center gap-2 text-blue-600">
                <div className="h-px flex-1 bg-blue-100" />

                <TrainFront size={22} />

                <div className="h-px flex-1 bg-blue-100" />
              </div>

              <div className="text-right">
                <p className="text-2xl font-bold">
                  {to}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Destination
                </p>
              </div>
            </div>
          </div>

          {/* Journey Details */}
          <div className="grid gap-6 border-b border-dashed border-slate-200 px-6 py-7 sm:grid-cols-2 sm:px-8">
            {/* Train */}
            <div className="flex items-center gap-3">
              <TrainFront
                className="text-blue-600"
                size={20}
              />

              <div>
                <p className="text-xs text-slate-400">
                  Train Number
                </p>

                <p className="text-sm font-semibold">
                  {trainNumber}
                </p>
              </div>
            </div>

            {/* Date */}
            <div className="flex items-center gap-3">
              <CalendarDays
                className="text-blue-600"
                size={20}
              />

              <div>
                <p className="text-xs text-slate-400">
                  Journey Date
                </p>

                <p className="text-sm font-semibold">
                  {date}
                </p>
              </div>
            </div>

            {/* Class */}
            <div className="flex items-center gap-3">
              <MapPin
                className="text-blue-600"
                size={20}
              />

              <div>
                <p className="text-xs text-slate-400">
                  Travel Class
                </p>

                <p className="text-sm font-semibold">
                  {classType}
                </p>
              </div>
            </div>

            {/* Passenger */}
            <div className="flex items-center gap-3">
              <UserRound
                className="text-blue-600"
                size={20}
              />

              <div>
                <p className="text-xs text-slate-400">
                  Passenger
                </p>

                <p className="text-sm font-semibold">
                  {name}
                </p>
              </div>
            </div>
          </div>

          {/* Passenger Details */}
          <div className="px-6 py-7 sm:px-8">
            <h3 className="text-lg font-bold">
              Passenger Details
            </h3>

            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              <div>
                <p className="text-xs text-slate-400">
                  Full Name
                </p>

                <p className="mt-1 text-sm font-semibold">
                  {name}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-400">
                  Age
                </p>

                <p className="mt-1 text-sm font-semibold">
                  {age}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-400">
                  Gender
                </p>

                <p className="mt-1 text-sm font-semibold">
                  {gender}
                </p>
              </div>
            </div>

            <div className="mt-5">
              <p className="text-xs text-slate-400">
                Phone Number
              </p>

              <p className="mt-1 text-sm font-semibold">
                {phone}
              </p>
            </div>
          </div>

          {/* Demo Notice */}
          <div className="border-t border-slate-100 bg-amber-50 px-6 py-5 text-center sm:px-8">
            <p className="text-sm font-semibold text-amber-800">
              Demo Booking — Not a Real Railway Ticket
            </p>

            <p className="mt-1 text-xs leading-5 text-amber-700">
              This ticket is generated for development
              purposes. No actual reservation or payment
              has been completed.
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex flex-wrap justify-center gap-4 print:hidden">
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            <Download size={16} />
            Print Ticket
          </button>

          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>
      </section>
    </main>
  );
}