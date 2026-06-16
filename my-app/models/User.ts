export interface User {
  id: string
  name: string
  email: string
  emailVerified: boolean
  image?: string
  bio?: string
  phone?: string
  theme?: string
  fontSize?: string
  createdAt: Date
  updatedAt: Date
}
