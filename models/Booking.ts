
import mongoose, { Schema, Model } from "mongoose";

export interface IBooking {
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
  createdAt?: Date;
  updatedAt?: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    bookingId: {
      type: String,
      required: true,
      unique: true,
      default: () => `RM${Date.now()}${Math.floor(Math.random() * 1000)}`,
    },

    trainNumber: {
      type: String,
      required: true,
    },

    from: {
      type: String,
      required: true,
    },

    to: {
      type: String,
      required: true,
    },

    date: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    age: {
      type: Number,
      required: true,
      min: 1,
      max: 120,
    },

    gender: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
      match: /^[0-9]{10}$/,
    },

    classType: {
      type: String,
      required: true,
      enum: ["SL", "3A", "2A"],
    },
  },
  {
    timestamps: true,
  }
);

const Booking: Model<IBooking> =
  mongoose.models.Booking ||
  mongoose.model<IBooking>("Booking", BookingSchema);

export default Booking;