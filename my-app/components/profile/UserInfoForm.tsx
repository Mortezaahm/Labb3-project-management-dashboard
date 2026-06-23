"use client";
import { useState } from "react";
import { ui } from "@/lib/styles";
import Input from "@/components/ui/Input";
import Button from "../ui/Button";

type UserInfoFormProps = {
    user: {
        name: string
        email: string
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
        <h2 className={ui.subtitle}>Personal Information</h2>
        <label
            htmlFor="name"
            className={ui.label}>
            Name
        </label>
        <Input
            id="name"
            value={name}
            onChange={(e) => {setName(e.target.value)}}
        />
        <label
            htmlFor="email"
            className={ui.label}>
            Email
        </label>
        <Input
            id="email"
            value={user.email}
            readOnly
        />
        <label
            htmlFor="bio"
            className={ui.label}>
                Bio
        </label>
        <textarea
            id="bio"
            className={ui.input}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
        />
        <Button
            onClick={handleSubmit}
            disabled={loading}
        >
          {loading ? "Saving..." : "Save Changes"}
        </Button>
        {message && (
            <p className="mt-2 text-sm">{message}</p>
        )}
        </>
    )
}
