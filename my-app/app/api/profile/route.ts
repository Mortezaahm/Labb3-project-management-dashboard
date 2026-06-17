import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { ObjectId } from "mongodb";


export async function GET() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    console.log("SESSION:", session);

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
            name: 1,
            email:1,
            image:1,
            bio:1,
            emailVerified: 1,
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

        const { name , bio } = await request.json();

        if (!name || typeof name !== "string") {
            return NextResponse.json(
                { message: "Name is required"},
                { status: 400 }
            )
        }

        const connection = (await connectDB()).connection;

        if (!connection.db) {
            return NextResponse.json(
                { message: "Database connection error" },
                { status: 500 }
            );
        }

        if (name.trim().length < 2) {
            return NextResponse.json(
                { message: "Name must be at least 2 characters" },
                { status: 400 }
            );
        }

        if (!ObjectId.isValid(session.user.id)) {
            return NextResponse.json(
                { message: "Invalid user id" },
                { status: 400 }
            );
        }

        const result = await connection.db
        .collection("user")
        .updateOne(
            {
            _id: new ObjectId(session.user.id),
            },
            {
            $set: {
                name: name.trim(),
                bio: typeof bio === "string" ? bio?.trim() : "",
                updatedAt: new Date(),
            },
            }
        );


        if (result.matchedCount === 0) {
        return NextResponse.json(
            { message: "User not found" },
            { status: 404 }
        );
        }

        return NextResponse.json({
        message: "Profile updated successfully",
        });
    } catch (error) {
        console.error(error)

        return NextResponse.json(
            { message: "Server error" },
            { status: 500 }
        );
    }
}
