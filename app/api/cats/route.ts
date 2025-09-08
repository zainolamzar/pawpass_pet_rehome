/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import cloudinary from "@/lib/cloudinary";

const prisma = new PrismaClient();

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
    const uploadedUrls = await Promise.all(
      files.map(async (file) => {
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
      })
    );

    const region = location.split(",")[0]?.trim() || "unknown";
    const slug = `meet-${owner_name.toLowerCase().replace(/\s+/g, "-")}-${breed.toLowerCase().replace(/\s+/g, "-")}-in-${region.toLowerCase().replace(/\s+/g, "-")}`;

    const newCat = await prisma.catInfo.create({
      data: {
        breed,
        location,
        gender,
        description,
        age,
        phoneNumber: phone_number,
        ownerName: owner_name,
        animal,
        images: uploadedUrls,
        slug,
        approvedAt: null, // initially null
      },
    });

    return NextResponse.json({ success: true, data: newCat });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

// --- GET: Fetch all cats or fetch one by slug ---
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const slug = url.searchParams.get("slug");

    if (slug) {
      // Fetch single cat by slug
      const cat = await prisma.catInfo.findUnique({
        where: { slug },
        // Only return if active & approved
      });

      if (!cat || !cat.isActive || !cat.isApproved) {
        return NextResponse.json({ success: false, error: "Cat not found or not approved" }, { status: 404 });
      }

      return NextResponse.json({ success: true, data: cat });
    }

    // Fetch all cats - only active & approved
    const cats = await prisma.catInfo.findMany({
      where: { isActive: true, isApproved: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, data: cats });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
