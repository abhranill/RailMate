
import { NextRequest, NextResponse } from "next/server";

type Booking = {
  bookingId: string;
  trainNumber: string;
  from: string;
  to: string;
  date: string;
  name: string;
  age: number;
  gender: string;
  phone: string;
  classType: string;
  createdAt: string;
};

const bookings: Booking[] = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      trainNumber,
      from,
      to,
      date,
      name,
      age,
      gender,
      phone,
      classType,
    } = body;

    if (
      !trainNumber ||
      !from ||
      !to ||
      !date ||
      !name ||
      !age ||
      !gender ||
      !phone ||
      !classType
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "All booking fields are required.",
        },
        { status: 400 }
      );
    }

    if (!/^[0-9]{10}$/.test(String(phone))) {
      return NextResponse.json(
        {
          success: false,
          message: "Phone number must contain 10 digits.",
        },
        { status: 400 }
      );
    }

    const passengerAge = Number(age);

    if (
      !Number.isInteger(passengerAge) ||
      passengerAge < 1 ||
      passengerAge > 120
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide a valid age.",
        },
        { status: 400 }
      );
    }

    const bookingId = `RM${Date.now()
      .toString()
      .slice(-8)}`;

    const newBooking: Booking = {
      bookingId,
      trainNumber: String(trainNumber),
      from: String(from),
      to: String(to),
      date: String(date),
      name: String(name),
      age: passengerAge,
      gender: String(gender),
      phone: String(phone),
      classType: String(classType),
      createdAt: new Date().toISOString(),
    };

    bookings.push(newBooking);

    return NextResponse.json(
      {
        success: true,
        message: "Demo booking created successfully.",
        data: newBooking,
        demo: true,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Booking API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Invalid request data.",
      },
      { status: 400 }
    );
  }
}