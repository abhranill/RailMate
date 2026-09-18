
"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  TrainFront,
  UserRound,
} from "lucide-react";

export default function BookingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const trainNumber = searchParams.get("train") || "";
  const from = searchParams.get("from") || "NJP";
  const to = searchParams.get("to") || "HWH";
  const date = searchParams.get("date") || "";

  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [classType, setClassType] = useState("SL");
  const [phone, setPhone] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const params = new URLSearchParams({
      train: trainNumber,
      from,
      to,
      date,
      name: fullName,
      age,
      gender,
      phone,
      classType,
    });

    router.push(`/booking/confirmation?${params.toString()}`);
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="rounded-xl bg-blue-600 p-2 text-white">
              <TrainFront size={22} />
            </div>

            <span className="text-xl font-bold tracking-tight">
              RailMate <span className="text-blue-600">AI</span>
            </span>
          </Link>

          {/* Back Button */}
          <Link
            href={`/trains?from=${encodeURIComponent(
              from
            )}&to=${encodeURIComponent(to)}&date=${encodeURIComponent(
              date
            )}`}
            className="flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-blue-600"
          >
            <ArrowLeft size={16} />
            Back
          </Link>
        </div>
      </header>

      {/* Main */}
      <section className="mx-auto max-w-5xl px-6 py-12">
        {/* Heading */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold tracking-wide text-blue-600">
            PASSENGER BOOKING
          </p>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Enter Passenger Details
          </h1>

          <p className="mt-2 text-slate-500">
            Complete the form to continue with your demo booking.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
          {/* Journey Summary */}
          <div className="h-fit rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                <TrainFront size={22} />
              </div>

              <div>
                <h2 className="font-bold">Journey Summary</h2>

                <p className="text-sm text-slate-500">
                  Selected train
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {/* Train Number */}
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-400">
                  Train Number
                </p>

                <p className="mt-1 font-semibold">
                  {trainNumber || "Not selected"}
                </p>
              </div>

              {/* Route */}
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-400">
                  Route
                </p>

                <p className="mt-1 text-lg font-bold">
                  {from} → {to}
                </p>
              </div>

              {/* Journey Date */}
              <div className="flex items-center gap-2">
                <CalendarDays size={18} className="text-blue-600" />

                <div>
                  <p className="text-xs text-slate-400">
                    Journey Date
                  </p>

                  <p className="text-sm font-semibold">
                    {date || "Not selected"}
                  </p>
                </div>
              </div>

              {/* Booking Type */}
              <div className="flex items-center gap-2">
                <UserRound size={18} className="text-blue-600" />

                <div>
                  <p className="text-xs text-slate-400">
                    Booking Type
                  </p>

                  <p className="text-sm font-semibold">
                    Demo Booking
                  </p>
                </div>
              </div>
            </div>

            {/* Demo Notice */}
            <div className="mt-6 rounded-xl border border-amber-100 bg-amber-50 p-4 text-xs leading-5 text-amber-800">
              This project currently uses mock data. It is
              not connected to the official railway booking
              system.
            </div>
          </div>

          {/* Passenger Form */}
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
          >
            <h2 className="text-xl font-bold">
              Passenger Information
            </h2>

            <div className="mt-6 space-y-5">
              {/* Full Name */}
              <div>
                <label
                  htmlFor="fullName"
                  className="mb-2 block text-sm font-semibold"
                >
                  Full Name
                </label>

                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(event) =>
                    setFullName(event.target.value)
                  }
                  placeholder="Enter passenger name"
                  required
                  maxLength={100}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Age and Gender */}
              <div className="grid gap-5 sm:grid-cols-2">
                {/* Age */}
                <div>
                  <label
                    htmlFor="age"
                    className="mb-2 block text-sm font-semibold"
                  >
                    Age
                  </label>

                  <input
                    id="age"
                    type="number"
                    min="1"
                    max="120"
                    value={age}
                    onChange={(event) =>
                      setAge(event.target.value)
                    }
                    placeholder="Enter age"
                    required
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* Gender */}
                <div>
                  <label
                    htmlFor="gender"
                    className="mb-2 block text-sm font-semibold"
                  >
                    Gender
                  </label>

                  <select
                    id="gender"
                    value={gender}
                    onChange={(event) =>
                      setGender(event.target.value)
                    }
                    required
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-semibold"
                >
                  Phone Number
                </label>

                <input
                  id="phone"
                  type="tel"
                  inputMode="numeric"
                  value={phone}
                  onChange={(event) =>
                    setPhone(event.target.value)
                  }
                  placeholder="Enter phone number"
                  pattern="[0-9]{10}"
                  maxLength={10}
                  required
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

                <p className="mt-1 text-xs text-slate-400">
                  Enter a 10-digit phone number.
                </p>
              </div>

              {/* Travel Class */}
              <div>
                <label
                  htmlFor="classType"
                  className="mb-2 block text-sm font-semibold"
                >
                  Travel Class
                </label>

                <select
                  id="classType"
                  value={classType}
                  onChange={(event) =>
                    setClassType(event.target.value)
                  }
                  required
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="SL">
                    Sleeper (SL)
                  </option>

                  <option value="3A">
                    AC 3 Tier (3A)
                  </option>

                  <option value="2A">
                    AC 2 Tier (2A)
                  </option>
                </select>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Continue Booking
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}