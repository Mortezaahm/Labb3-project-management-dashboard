"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

type AvatarSectionProps = {
  user: {
    name: string;
    image?: string | null;
  };
};

export default function AvatarSection({user}: AvatarSectionProps) {
  // const [image, setImage] = useState(user.image || "");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const router = useRouter();

  const handleUpload = async () => {
    try {
      setMessage("")
      if (!file) {
        setMessage("Please select a file to upload");
        return;
      }

      setLoading(true)

      const formData = new FormData();
      formData.append("avatar", file);

      const response = await fetch ("/api/avatar", {
        method: "PATCH",
        body: formData
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message)
      }

      setMessage("Avatar updated successfully")
      router.refresh();
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
        src={user.image || "/default-avatar.png"}
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
        type="file"
        accept="image/*"
        onChange={(e) => {
          setFile(e.target.files?.[0] || null);
        }}
        className="w-full border rounded py-2 px-4 mr-2 mb-4"
      />
      <button
        onClick={handleUpload}
        className="mb-4 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400">
          {loading ? "Changing..." : "Change Avatar" }
      </button>
      {message && (
        <p className="mt-2 text-sm">{message}</p>
      )}
    </>
  )
}
