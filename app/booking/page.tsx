
"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  Loader2,
  TrainFront,
} from "lucide-react";

type BookingResponse = {
  success?: boolean;
  message?: string;
  data?: {
    bookingId?: string;
    trainNumber?: string;
    from?: string;
    to?: string;
    date?: string;
    name?: string;
    age?: number;
    gender?: string;
    phone?: string;
    classType?: string;
  };
};

export default function BookingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const trainNumber = searchParams.get("train") || "";
  const from = searchParams.get("from") || "";
  const to = searchParams.get("to") || "";
  const journeyDate = searchParams.get("date") || "";

  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [classType, setClassType] = useState("SL");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");

    if (!trainNumber || !from || !to || !journeyDate) {
      setError("Missing train or journey details. Please search again.");
      return;
    }

    if (!fullName.trim() || !age || !gender || !phone || !classType) {
      setError("Please fill in all required fields.");
      return;
    }

    if (!/^[0-9]{10}$/.test(phone)) {
      setError("Phone number must contain exactly 10 digits.");
      return;
    }

    const numericAge = Number(age);

    if (
      !Number.isInteger(numericAge) ||
      numericAge < 1 ||
      numericAge > 120
    ) {
      setError("Age must be between 1 and 120.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          trainNumber,
          from,
          to,
          date: journeyDate,
          name: fullName.trim(),
          age: numericAge,
          gender,
          phone,
          classType,
        }),
      });

      // Read the response as text first.
      // This prevents JSON parsing errors for empty responses.
      const responseText = await response.text();

      let result: BookingResponse;

      try {
        result = responseText
          ? JSON.parse(responseText)
          : {
              success: false,
              message: "The server returned an empty response.",
            };
      } catch (parseError) {
        console.error("Invalid API response:", responseText);
        console.error("JSON parsing error:", parseError);

        setError(
          "The server returned an invalid response. Check the terminal."
        );

        return;
      }

      if (!response.ok || !result.success) {
        setError(result.message || "Booking failed. Please try again.");
        return;
      }

      const bookingData = result.data;

      if (!bookingData) {
        setError("Booking was created, but booking details are missing.");
        return;
      }

      // Prepare confirmation page query parameters.
      const confirmationParams = new URLSearchParams({
        bookingId: bookingData.bookingId || "",
        train: bookingData.trainNumber || trainNumber,
        from: bookingData.from || from,
        to: bookingData.to || to,
        date: bookingData.date || journeyDate,
        name: bookingData.name || fullName,
        age: String(bookingData.age ?? numericAge),
        gender: bookingData.gender || gender,
        phone: bookingData.phone || phone,
        classType: bookingData.classType || classType,
      });

      router.push(
        `/booking/confirmation?${confirmationParams.toString()}`
      );
    } catch (error) {
      console.error("Booking request error:", error);

      setError(
        "Unable to connect to the server. Please check your connection and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-bold"
          >
            <div className="rounded-xl bg-blue-600 p-2 text-white">
              <TrainFront size={22} />
            </div>

            <span>
              RailMate <span className="text-blue-600">AI</span>
            </span>
          </Link>

          <span className="text-sm font-medium text-slate-500">
            Passenger Booking
          </span>
        </div>
      </header>

      {/* Main Content */}
      <section className="mx-auto max-w-5xl px-6 py-10">
        {/* Back Button */}
        <Link
          href={`/trains/${trainNumber}?from=${encodeURIComponent(
            from
          )}&to=${encodeURIComponent(to)}&date=${encodeURIComponent(
            journeyDate
          )}`}
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-blue-600"
        >
          <ArrowLeft size={18} />
          Back to Train Details
        </Link>

        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          {/* Booking Form */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-8">
              <h1 className="text-2xl font-bold sm:text-3xl">
                Passenger Details
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                Enter your details to create a demo booking.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full Name */}
              <div>
                <label
                  htmlFor="fullName"
                  className="mb-2 block text-sm font-semibold"
                >
                  Full Name *
                </label>

                <input
                  id="fullName"
                  type="text"
                  placeholder="Enter passenger name"
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Age and Gender */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="age"
                    className="mb-2 block text-sm font-semibold"
                  >
                    Age *
                  </label>

                  <input
                    id="age"
                    type="number"
                    min="1"
                    max="120"
                    placeholder="Enter age"
                    value={age}
                    onChange={(event) => setAge(event.target.value)}
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="gender"
                    className="mb-2 block text-sm font-semibold"
                  >
                    Gender *
                  </label>

                  <select
                    id="gender"
                    value={gender}
                    onChange={(event) => setGender(event.target.value)}
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-semibold"
                >
                  Phone Number *
                </label>

                <input
                  id="phone"
                  type="tel"
                  inputMode="numeric"
                  maxLength={10}
                  placeholder="10-digit phone number"
                  value={phone}
                  onChange={(event) => {
                    const onlyDigits = event.target.value
                      .replace(/\D/g, "")
                      .slice(0, 10);

                    setPhone(onlyDigits);
                  }}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Class Type */}
              <div>
                <label
                  htmlFor="classType"
                  className="mb-2 block text-sm font-semibold"
                >
                  Travel Class *
                </label>

                <select
                  id="classType"
                  value={classType}
                  onChange={(event) => setClassType(event.target.value)}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="SL">Sleeper (SL)</option>
                  <option value="3A">AC 3 Tier (3A)</option>
                  <option value="2A">AC 2 Tier (2A)</option>
                </select>
              </div>

              {/* Error Message */}
              {error && (
                <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                  <span className="font-bold">!</span>
                  <p>{error}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin" size={19} />
                    Processing Booking...
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={19} />
                    Confirm Booking
                  </>
                )}
              </button>

              <p className="text-center text-xs text-slate-500">
                This is a demo booking system. No actual railway ticket will
                be issued.
              </p>
            </form>
          </div>

          {/* Journey Summary */}
          <aside className="h-fit rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-2">
              <TrainFront size={21} className="text-blue-600" />

              <h2 className="text-lg font-bold">Journey Summary</h2>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Train Number
                </p>

                <p className="mt-1 text-lg font-bold">
                  {trainNumber || "Not available"}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    From
                  </p>

                  <p className="mt-1 text-lg font-bold">
                    {from || "N/A"}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    To
                  </p>

                  <p className="mt-1 text-lg font-bold">
                    {to || "N/A"}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Journey Date
                </p>

                <p className="mt-1 font-semibold">
                  {journeyDate || "Not selected"}
                </p>
              </div>

              <div className="border-t border-slate-100 pt-4">
                <p className="text-xs leading-5 text-slate-500">
                  Your booking details will be saved in the RailMate MongoDB
                  database after successful submission.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}