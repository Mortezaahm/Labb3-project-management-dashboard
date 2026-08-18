import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { connectDB } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import type { UserProfile } from "@/types/user";

import Card from "@/components/ui/Card";

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
  }, {
    projection: {
      name: 1,
      email: 1,
      image: 1,
      bio: 1,
      theme: 1,
      fontSize: 1,
      language: 1,
      notifications: 1
    }
  });

  if (!user) {
    return <div>User not found</div>
  }

  // const user = session.user
  const userData = {
    name: user.name,
    email: user.email,
    image: user.image,
    bio: user.bio,
    theme: user.theme,
    fontSize: user.fontSize,
    language: user.language,
    notifications: user.notifications,
  }

  return (
    <div className="container mx-auto py-8">
      <Card>
        <ProfileHeader />
        <AvatarSection user={userData} />
        <UserInfoForm user={userData} />
      </Card>
      <Card>
        <SettingsSection user={userData}/>
      </Card>
      <Card>
        <AccessibilitySection user={userData}/>
      </Card>
    </div>
  );
}
