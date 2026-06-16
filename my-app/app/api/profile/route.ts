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


    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }


    const connection = (await connectDB()).connection;

    // console.log("DB NAME:", connection.name);

    // console.log(
    // "COLLECTIONS:",
    // await connection.db?.listCollections().toArray()
    // );

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
