// import { NextResponse } from "next/server";
// import { headers } from "next/headers";
// import { auth } from "@/lib/auth";
// import { connectDB } from "@/lib/mongodb";
// import { ObjectId } from "mongodb";

// type SettingsBody = {
//  theme?: "light" | "dark";
//  fontSize?: "small" | "medium" | "large";
//  language?: "en" | "sv";
//  notifications?: boolean;
// }

// type SettingsUpdate = {
//     theme?: "light" | "dark";
//     fontSize?: "small" | "medium" | "large";
//     language?: "en" | "sv";
//     notifications?: boolean;
//     updatedAt: Date;
// };

// export async function GET() {
//     try {
//         const session = await auth.api.getSession({
//         headers: await headers(),
//         });

//         if (!session) {
//             return NextResponse.json(
//                 { message: "Unauthorized" },
//                 { status: 401 }
//             );
//         }

//         const connection = (await connectDB()).connection;

//         if (!connection?.db) {
//         return NextResponse.json(
//             { message: "Database connection error" },
//             { status: 500 }
//         );
//         }

//         const db = connection.db;

//         if (!ObjectId.isValid(session.user.id)) {
//             return NextResponse.json(
//                 { message: "Invalid user id" },
//                 { status: 400 }
//             );
//         }

//         const user = await db.collection("user").findOne({
//             _id: new ObjectId(session.user.id),
//         }, {
//             projection: {
//                 theme: 1,
//                 fontSize: 1,
//                 language:1,
//                 notifications: 1,
//             },
//         })

//         if (!user) {
//         return NextResponse.json(
//             { message: "User not found" },
//             { status: 404 }
//         );
//         }

//         return NextResponse.json({
//             user,
//         });
//     } catch (error) {
//         console.error(error);
//         return NextResponse.json(
//             { message: "Server error" },
//             { status: 500 }
//         );
//     }
// }

// export async function PATCH(request: Request) {
//     try {
//         const session = await auth.api.getSession({
//             headers: await headers()
//         })

//         if (!session) {
//             return NextResponse.json(
//                 { message: "Unauthorized"},
//                 { status: 401 }
//             )
//         }

//         const { theme , fontSize , language , notifications }: SettingsBody = await request.json();

//         const allowedThemes = ["light", "dark"];
//         const allowedFontSizes = ["small", "medium", "large"];

//         if (theme && !allowedThemes.includes(theme)) {
//             return NextResponse.json(
//                 { message: "Invalid theme" },
//                 { status: 400 }
//             )
//         }

//         if (fontSize && !allowedFontSizes.includes(fontSize)) {
//             return NextResponse.json(
//                 { message: "Invalid font size" },
//                 { status: 400 }
//             )
//         }

//         const connection = (await connectDB()).connection;

//         if (!connection.db) {
//             return NextResponse.json(
//                 { message: "Database connection error" },
//                 { status: 500 }
//             );
//         }

//         if (!ObjectId.isValid(session.user.id)) {
//             return NextResponse.json(
//                 { message: "Invalid user id" },
//                 { status: 400 }
//             );
//         }

//         const updateData: SettingsUpdate = {
//             updatedAt: new Date()
//         };


//         if (theme) {
//             updateData.theme = theme;
//         }

//         if (fontSize) {
//             updateData.fontSize = fontSize;
//         }

//         if (language) {
//             updateData.language = language;
//         }

//         if (typeof notifications === "boolean") {
//             updateData.notifications = notifications;
//         }

//         await connection.db.collection("user").updateOne(
//             {
//                 _id: new ObjectId(session.user.id),
//             },
//             {
//                 $set: updateData
//             }
//         );

//         return NextResponse.json({
//             message: "Theme updated successfully",
//         });
//     } catch (error) {
//         console.error(error)

//         return NextResponse.json(
//             { message: "Server error" },
//             { status: 500 }
//         );
//     }
// }


import { NextResponse } from "next/server";
import {
  getUserSettings,
  updateUserSettings,
} from "@/lib/user-settings";
import type { Settings } from "@/types/types";

export async function GET() {
  try {
    const settings = await getUserSettings();

    if (!settings) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const body: Partial<Settings> = await req.json();

    await updateUserSettings(body);

    return NextResponse.json({
      message: "Settings updated successfully",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
