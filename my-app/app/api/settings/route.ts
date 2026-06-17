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

        const user = await db.collection("user").findOne({
            _id: new ObjectId(session.user.id),
        }, {
            projection: {
                theme: 1,
                fontSize: 1,
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

        const { theme , fontSize } = await request.json();

        const allowedThemes = ["light", "dark"];
        const allowedFontSizes = ["small", "medium", "large"];

        if (!allowedThemes.includes(theme)) {
            return NextResponse.json(
                { message: "Invalid theme" },
                { status: 400 }
            )
        }

        if (!allowedFontSizes.includes(fontSize)) {
            return NextResponse.json(
                { message: "Invalid font size" },
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

        if (!ObjectId.isValid(session.user.id)) {
            return NextResponse.json(
                { message: "Invalid user id" },
                { status: 400 }
            );
        }

        await connection.db.collection("user").updateOne(
            {
                _id: new ObjectId(session.user.id),
            },
            {
                $set: {
                    theme,
                    fontSize,
                    updatedAt: new Date(),
                },
            }
        );

        return NextResponse.json({
            message: "Theme updated successfully",
        });
    } catch (error) {
        console.error(error)

        return NextResponse.json(
            { message: "Server error" },
            { status: 500 }
        );
    }
}
