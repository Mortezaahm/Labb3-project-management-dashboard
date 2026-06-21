"use client"
import { useState } from "react";
import Image from "next/image";

type AvatarSectionProps = {
  user: {
    name: string;
    image?: string | null;
  };
};

export default function AvatarSection({user}: AvatarSectionProps) {
  const [image, setImage] = useState(user.image || "");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSave = async () => {
    try {
      setLoading(true)
      setMessage("")

      const response = await fetch ("/api/avatar", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          image
        })
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message)
      }

      setMessage("Avatar updated successfully")
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong"
      );
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Image
        src={image || "/default-avatar.png"}
        alt={`${user.name} avatar`}
        width={96}
        height={96}
        className="border-2 border-amber-500 rounded-full mb-4"
      />
      <label
        htmlFor="avatar-upload"
        className="block text-sm font-medium text-gray-700 mb-1"> Choose an Avatar... </label>
      <input
        id="avatar-upload"
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        placeholder="Avatar URL"
        className="w-full border rounded py-2 px-4 mr-2 mb-4"
      />
      <button
        onClick={handleSave}
        className="mb-4 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400">
          {loading ? "Changing..." : "Change Avatar" }
      </button>
      {message && (
        <p className="mt-2 text-sm">{message}</p>
      )}
    </>
  )
}
