import { z } from "zod";

const registerSchema = z.object({
  name: z.string()
  .min(3, "Must be at least 3 characters long")
  .trim()
  .regex(/^[a-zA-Z\s'\-\.]+$/, "Name can only contain letters, spaces, hyphens, apostrophes and periods"),
  email: z.email({message: "Invalid email"}),
  password: z.string()
  .min(8, "Must be at least 8 characters long"),
})

export default registerSchema
