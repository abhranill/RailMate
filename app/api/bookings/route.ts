
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Booking from "@/models/Booking";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

   

    // Read request body
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

    // Validate required fields
    if (
      !trainNumber ||
      !from ||
      !to ||
      !date ||
      !name ||
      age === undefined ||
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

    // Validate phone number
    if (!/^[0-9]{10}$/.test(String(phone))) {
      return NextResponse.json(
        {
          success: false,
          message: "Phone number must contain exactly 10 digits.",
        },
        { status: 400 }
      );
    }

    // Validate age
    const numericAge = Number(age);

    if (
      !Number.isInteger(numericAge) ||
      numericAge < 1 ||
      numericAge > 120
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Age must be between 1 and 120.",
        },
        { status: 400 }
      );
    }

    // Create booking in MongoDB
    const booking = await Booking.create({
      trainNumber: String(trainNumber),
      from: String(from),
      to: String(to),
      date: String(date),
      name: String(name).trim(),
      age: numericAge,
      gender: String(gender),
      phone: String(phone),
      classType: String(classType),
    });

    return NextResponse.json(
      {
        success: true,
        message: "Booking created successfully.",
        data: {
          bookingId: booking.bookingId,
          trainNumber: booking.trainNumber,
          from: booking.from,
          to: booking.to,
          date: booking.date,
          name: booking.name,
          age: booking.age,
          gender: booking.gender,
          phone: booking.phone,
          classType: booking.classType,
        },
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    // Print the actual error in the VS Code terminal
    console.error("BOOKING API ERROR:", error);

    const errorMessage =
      error instanceof Error
        ? error.message
        : "An unknown server error occurred.";

    return NextResponse.json(
      {
        success: false,
        message: errorMessage,
      },
      { status: 500 }
    );
  }
}