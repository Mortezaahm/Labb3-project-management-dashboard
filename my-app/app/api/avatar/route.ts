import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

import path from "path";
import fs from "fs/promises";


export async function GET() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const connection = (await connectDB()).connection;

    if (!connection?.db) {
      return NextResponse.json(
        { message: "Database connection error" },
        { status: 500 }
      );
    }

    const db = connection.db;

    if (!ObjectId.isValid(session.user.id)) {
        return NextResponse.json(
            { message: "Invalid user id" },
            { status: 400 }
        );
    }

    const user = await db
      .collection("user")
      .findOne({
         _id: new ObjectId(session.user.id),
      }, {
        projection: {
            image: 1,
        },
      })

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      user,
    });
  } catch (error) {

    console.error(error);

    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        })

        if (!session) {
            return NextResponse.json(
                { message: "Unauthorized"},
                { status: 401 }
            )
        }

        const formData = await request.formData();

        const file = formData.get("avatar") as File;

        if (!file) {
            return NextResponse.json(
                { message: "Avatar file is required" },
                { status: 400 }
            )
        }

        // const { image } = await request.json();

        // if (!image || typeof image !== "string") {
        //     return NextResponse.json(
        //         { message: "Image is required" },
        //         { status: 400 }
        //     )
        // }

        const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];

        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json(
                { message: "Invalid file type. Please upload a JPEG, PNG, GIF, or WebP image." },
                { status: 400 }
            );
        }

        const extension = file.name.split(".").pop();

        const fileName = `${session.user.id}-${Date.now()}.${extension}`;

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const uploadDir = path.join(process.cwd(), "public", "uploads");

        await fs.mkdir(uploadDir, { recursive: true });
        await fs.writeFile(path.join(uploadDir, fileName), buffer);

        const imagePath = `/uploads/${fileName}`;

        const connection = (await connectDB()).connection;

        if (!connection.db) {
            return NextResponse.json(
                { message: "Database connection error" },
                { status: 500 }
            );
        }

        if (!ObjectId.isValid(session.user.id)) {
            return NextResponse.json(
                { message: "Invalid user id" },
                { status: 400 }
            );
        }


        // Check if the file is empty
        if (file.size === 0) {
          return NextResponse.json(
            { message: "Empty file" },
            { status: 400 }
          );
        }

        // Check if the file size exceeds the limit (e.g., 5MB)
        const MAX_SIZE = 5 * 1024 * 1024;

        if (file.size > MAX_SIZE) {
          return NextResponse.json(
            { message: "File too large" },
            { status: 400 }
          );
        }

        await connection.db.collection("user").updateOne(
            {
            _id: new ObjectId(session.user.id),
            },
            {
            $set: {
                image: imagePath,
                updatedAt: new Date(),
            },
            }
        );

        return NextResponse.json({
        message: "Avatar updated successfully",
        });

    } catch (error) {
        console.error(error)
        return NextResponse.json(
            { message: "Server error" },
            { status: 500 }
        );
    }
}
