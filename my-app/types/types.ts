
export interface User {
  id: string
  name: string
  email: string
  emailVerified: boolean
  image?: string
  role: string
  bio: string
  theme: string
  fontSize: string
}

export type FontSize = "small" | "medium" | "large"
export type Theme = "light" | "dark"
export type Language = "en" | "sv"


export interface Settings {
  theme: Theme
  fontSize: FontSize
  language: Language
  notifications: boolean
}
