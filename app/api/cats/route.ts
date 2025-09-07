/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import mongoose from "mongoose";

// --- MongoDB Connection ---
if (!process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined in .env.local");
}
mongoose.connect(process.env.MONGODB_URI);

// --- Schema ---
const CatInfoSchema = new mongoose.Schema({
  breed: String,
  location: String,
  gender: String,
  description: String,
  age: String,
  phone_number: String,
  owner_name: String,
  animal: String,
  isActive: { type: Boolean, default: false }, // 👈 default to false
  images: [String],
  createdAt: { type: Date, default: Date.now },
});

const CatInfo =
  mongoose.models.CatInfo || mongoose.model("catInfo", CatInfoSchema);

// --- POST: Add new cat ---
export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const breed = formData.get("breed") as string;
    const location = formData.get("location") as string;
    const gender = formData.get("gender") as string;
    const description = formData.get("description") as string;
    const age = formData.get("age") as string;
    const phone_number = formData.get("phone_number") as string;
    const owner_name = formData.get("owner_name") as string;
    const animal = formData.get("animal") as string;

    const files = formData.getAll("images") as File[];
    const uploadPromises = files.map(async (file) => {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      return new Promise<string>((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "cats_rehome" }, (err, result) => {
            if (err || !result) reject(err);
            else resolve(result.secure_url);
          })
          .end(buffer);
      });
    });

    const uploadedUrls = await Promise.all(uploadPromises);

    const newCat = await CatInfo.create({
      breed,
      location,
      gender,
      description,
      age,
      phone_number,
      owner_name,
      animal,
      images: uploadedUrls,
    });

    return NextResponse.json({ success: true, data: newCat });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}

// --- GET: Fetch only active cats ---
export async function GET() {
  try {
    const cats = await CatInfo.find({ isActive: true }).sort({
      createdAt: -1,
    });
    return NextResponse.json({ success: true, data: cats });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}