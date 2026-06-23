import { ui } from "@/lib/styles";
export default function ProfileHeader() {
  return (
    <div>
      <h1 className={ui.sectionTitle}>User Profile</h1>
      <p className={ui.text}>
        Welcome to your profile page. Here you can view and edit your personal information, manage your settings, and customize your experience.
      </p>
    </div>
  );
}
