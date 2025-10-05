import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";

export async function GET() {
  try {
    await connectDB(); // connect to MongoDB
    return NextResponse.json({ message: "MongoDB connection successful" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "MongoDB connection failed" }, { status: 500 });
  }
}
