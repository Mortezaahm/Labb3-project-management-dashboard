import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { connectDB } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import type { UserProfile } from "@/types/user";

import ProfileHeader from "@/components/profile/ProfileHeader";
import AvatarSection from "@/components/profile/AvatarSection";
import UserInfoForm from "@/components/profile/UserInfoForm";
import SettingsSection from "@/components/profile/SettingsSection";
import AccessibilitySection from "@/components/profile/AccessibilitySection";

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session) {
    return <div>Unauthorized</div>
  }

  const connection = (await connectDB()).connection;

  if (!connection.db) {
    return <div>Database connection error</div>
  }

  if (!ObjectId.isValid(session.user.id)) {
    return <div>Invalid user</div>
  }

  const user = await connection.db
  .collection<UserProfile>("user")
  .findOne({
    _id: new ObjectId(session.user.id),
  });

  if (!user) {
    return <div>User not found</div>
  }

  // const user = session.user

  return (
    <div className="container py-8">
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <ProfileHeader />
        <AvatarSection user={user} />
        <UserInfoForm user={user} />
      </div>
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <SettingsSection user={user}/>
      </div>
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <AccessibilitySection user={user}/>
      </div>
    </div>
  );
}
