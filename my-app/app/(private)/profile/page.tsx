// import {mockUser} from "@/data/mockUser";
import ProfileHeader from "@/components/profile/ProfileHeader";
import AvatarSection from "@/components/profile/AvatarSection";
import UserInfoForm from "@/components/profile/UserInfoForm";
import SettingsSection from "@/components/profile/SettingsSection";
import AccessibilitySection from "@/components/profile/AccessibilitySection";



export default function ProfilePage() {
  return (
    <div className="container py-8">
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <ProfileHeader />
        <AvatarSection />
        <UserInfoForm />
      </div>
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <SettingsSection />
      </div>
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <AccessibilitySection />
      </div>
    </div>
  );
}
