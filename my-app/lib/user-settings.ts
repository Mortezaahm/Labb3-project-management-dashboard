import { auth } from "./auth";
import { headers } from "next/headers";
import { connectDB } from "./mongodb";
import mongoose from "mongoose";

export async function getUserSettings() {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session?.user?.id) {
        return {
            fontSize: "medium",
            theme: "system"
        }
    }

    await connectDB();

    const user = await mongoose.connection
    .collection("user")
    .findOne({id: session.user.id})

    return {
        fontSize: user?.fontSize ?? "medium",
        theme: user?.theme ?? "system"
    }
}
