"use client"
import { useState , useRef , useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

type AvatarSectionProps = {
  user: {
    name: string;
    image?: string | null;
  };
};

export default function AvatarSection({user}: AvatarSectionProps) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [preview, setPreview] = useState(user.image || "");

  const fileInputRef = useRef<HTMLInputElement>(null);

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

  useEffect(() => {
    return () => {
      if (preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <>
      <Image
        src={preview || user.image || "/default-avatar.png"}
        alt={`${user.name} avatar`}
        width={96}
        height={96}
        className="border-2 border-amber-500 rounded-full mb-4"
      />

      <input
        ref={fileInputRef}
        id="avatar-upload"
        type="file"
        accept="image/*"
        onChange={(e) => {
          const selectedFile = e.target.files?.[0];
          if (!selectedFile) return;

          setFile(selectedFile);

          const previewUrl = URL.createObjectURL(selectedFile);
          setPreview(previewUrl);
        }}
        className="hidden"
      />
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="mb-4 mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
      >
        Choose Avatar
      </button>
      <button
        onClick={handleUpload}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          {loading ? "Changing..." : "Change Avatar" }
      </button>
      {message && (
        <p className="mt-2 text-sm">{message}</p>
      )}
    </>
  )
}
