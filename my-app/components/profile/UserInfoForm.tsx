"use client";
import { useState } from "react";

type UserInfoFormProps = {
    user: {
        name: string
        email: string
        role: string
        bio?: string
    }
}

export default function UserInfoForm( {user} : UserInfoFormProps) {
    const [name, setName] = useState(user.name)
    const [bio, setBio] = useState(user.bio || "")

    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")

    const handleSubmit = async () => {
        try {
            setLoading(true)
            setMessage("")

            const response = await fetch("/api/profile", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    bio
                })
            })

            const data = await response.json();
            if (!response.ok) {
                throw new Error (data.message)
            }
            setMessage("Profile updated successfully")
        } catch (error) {
            setMessage(
                error instanceof Error ? error.message : "Something went wrong"
            )
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
        <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
        <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1">
            Name
        </label>
        <input
            id="name"
            className="w-full border rounded py-2 px-4 mr-2 mb-4"
            value={name}
            onChange={(e) => {setName(e.target.value)}}
        />
        <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1">
                Email
        </label>
        <input
            id="email"
            className="w-full border rounded py-2 px-4 mr-2 mb-4"
            defaultValue={user.email}
            readOnly
        />
        <label
            htmlFor="bio"
            className="block text-sm font-medium text-gray-700 mb-1">
                Bio
        </label>
        <textarea
            id="bio"
            className="w-full border rounded py-2 px-4 mr-2 mb-4"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
        />
        <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          {loading ? "Saving..." : "Save Changes"}
        </button>
        {message && (
            <p className="mt-2 text-sm">{message}</p>
        )}
        </>
    )
}
