
import { NextRequest, NextResponse } from "next/server";

type Train = {
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

const trains: Train[] = [
  {
    number: "12344",
    name: "Darjeeling Mail",
    from: "NJP",
    to: "HWH",
    departure: "18:00",
    arrival: "06:00",
    duration: "12h 00m",
    fare: 650,
    classType: "SL, 3A, 2A",
  },
  {
    number: "12378",
    name: "Padatik Express",
    from: "NJP",
    to: "HWH",
    departure: "09:00",
    arrival: "19:30",
    duration: "10h 30m",
    fare: 900,
    classType: "SL, 3A, 2A",
  },
  {
    number: "13148",
    name: "Uttar Banga Express",
    from: "NJP",
    to: "HWH",
    departure: "20:00",
    arrival: "08:30",
    duration: "12h 30m",
    fare: 450,
    classType: "SL, 3A",
  },
  {
    number: "RM1001",
    name: "RailMate Express",
    from: "NJP",
    to: "SDAH",
    departure: "06:30",
    arrival: "16:15",
    duration: "9h 45m",
    fare: 650,
    classType: "SL, 3A",
  },
  {
    number: "RM1002",
    name: "RailMate Superfast",
    from: "SDAH",
    to: "NJP",
    departure: "08:00",
    arrival: "17:30",
    duration: "9h 30m",
    fare: 900,
    classType: "SL, 3A",
  },
  {
    number: "RM1003",
    name: "RailMate Economy",
    from: "NJP",
    to: "SDAH",
    departure: "10:00",
    arrival: "21:00",
    duration: "11h",
    fare: 450,
    classType: "SL",
  },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const from = searchParams.get("from")?.trim().toUpperCase();
  const to = searchParams.get("to")?.trim().toUpperCase();

  if (!from || !to) {
    return NextResponse.json(
      {
        success: false,
        message: "From and To station codes are required.",
      },
      { status: 400 }
    );
  }

  if (from === to) {
    return NextResponse.json(
      {
        success: false,
        message: "From and To stations cannot be the same.",
      },
      { status: 400 }
    );
  }

  const results = trains.filter(
    (train) => train.from === from && train.to === to
  );

  return NextResponse.json({
    success: true,
    count: results.length,
    data: results,
    demo: true,
  });
}