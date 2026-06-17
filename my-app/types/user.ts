import { ObjectId } from "mongodb";

export interface UserProfile {
  _id: ObjectId;

  name: string;
  email: string;

  image?: string;

  bio?: string;

  theme?: string;

  fontSize?: string;

  emailVerified: boolean;
}
