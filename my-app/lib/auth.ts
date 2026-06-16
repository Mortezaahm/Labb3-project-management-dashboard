import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
import { headers } from "next/headers";

const MONGODB_URI = process.env.MONGODB_URI
if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local')
}

const client = new MongoClient(MONGODB_URI);
const db = client.db('projectmanager') // you can change the database name if you want, but make sure to update it in the .env.local file as well

export const auth = betterAuth({
    database: mongodbAdapter(db, {client}),
    // makes sure that user can sign in with email and password
    emailAndPassword: {
    enabled: true,
  },
   session: {
    // session lifetime, 30 days in total
    expiresIn: 60 * 60 * 24 * 30,
  },
});

export async function getSession() {
  const sessionRes = await auth.api.getSession({
    headers: await headers()
  })
  return sessionRes
}
