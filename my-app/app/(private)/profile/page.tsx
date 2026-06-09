import {mockUser} from "@/data/mockUser";
import ProfileHeader from "@/components/profile/ProfileHeader";
// import AvatarSection from "@/components/profile/AvatarSection";
// import SettingsSection from "@/components/profile/SettingsSection";


export default function ProfilePage() {
  return (
    <div className="container mx-auto py-8">
      <ProfileHeader />
      <p className="text-gray-600 mb-4">Welcome to your profile page. Here you can view and edit your personal information, manage your settings, and customize your experience.
      </p>
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
        <p className="text-gray-600 mb-2"><strong>Name:</strong> {mockUser.name}</p>
        <p className="text-gray-600 mb-2"><strong>Email:</strong> {mockUser.email}</p>
        <p className="text-gray-600 mb-2"><strong>Role:</strong> {mockUser.role}</p>
      </div>
    </div>
  );
}
