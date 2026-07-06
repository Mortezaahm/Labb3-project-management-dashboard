import { auth } from "./auth";
import { headers } from "next/headers";
import { connectDB } from "./mongodb";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";
import type { Settings } from "@/types/types";

async function getCurrentUserId() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  if (!ObjectId.isValid(session.user.id)) {
    throw new Error("Invalid user id");
  }

  return session.user.id;
}

export async function getUserSettings(): Promise<Settings | null> {
  try {
    const userId = await getCurrentUserId();

    await connectDB();

    const user = await mongoose.connection
      .collection("user")
      .findOne(
        { _id: new ObjectId(userId) },
        {
          projection: {
            theme: 1,
            fontSize: 1,
            language: 1,
            notifications: 1,
          },
        }
      );

    if (!user) return null;

    return {
      theme: user.theme ?? "light",
      fontSize: user.fontSize ?? "medium",
      language: user.language ?? "en",
      notifications: user.notifications ?? true,
    };
  } catch {
    return null;
  }
}

export async function updateUserSettings(
  settings: Partial<Settings>
) {
  const userId = await getCurrentUserId();

  await connectDB();

  await mongoose.connection.collection("user").updateOne(
    {
      _id: new ObjectId(userId),
    },
    {
      $set: {
        ...settings,
        updatedAt: new Date(),
      },
    }
  );

  return true;
}
