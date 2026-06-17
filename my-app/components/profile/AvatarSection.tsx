import Image from "next/image";

type AvatarSectionProps = {
  user: {
    name: string;
    image?: string | null;
  };
};

export default function AvatarSection({user}: AvatarSectionProps) {
    return (
        <>
        <Image src={user.image || "/default-avatar.png"} alt={`${user.name} avatar`} width={96} height={96} className="border-2 border-amber-500 rounded-full mb-4" />
            <label htmlFor="avatar-upload" className="block text-sm font-medium text-gray-700 mb-1">Choose an Avatar</label>
            <input id="avatar-upload" type="file" className="w-full border rounded py-2 px-4 mr-2 mb-4" />
            <button className="mb-4 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400">Change Avatar</button>
        </>
    )
}
