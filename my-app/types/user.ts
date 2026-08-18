import { ObjectId } from "mongodb";

export interface UserProfile {
  _id: ObjectId;

  name: string;
  email: string;

  image?: string;
  bio?: string;

  theme?: "light" | "dark";
  fontSize?: "small" | "medium" | "large";

  language?: "en" | "sv";

  notifications?: boolean;

  emailVerified: boolean;
}
