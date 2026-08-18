"use client"

import { useState } from "react";

import { ui } from "@/lib/styles";

type SettingsSectionProps = {
  user: {
    language?: "en" | "sv";
    notifications?: boolean;
    fontSize?: "small" | "medium" | "large";
  };
};

export default function SettingsSection({user}: SettingsSectionProps) {

  const [language, setLanguage] = useState(user.language || "en")
  const [notifications, setNotifications] = useState(user.notifications ?? true)

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleSave = async () => {
    try {
      setLoading (true)
      setMessage("")

      const response = await fetch("/api/settings", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          language,
          notifications,
        })
      })
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setMessage("Settings updated successfully");
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
      <h2 className={ui.subtitle}>Settings</h2>
      <p className={ui.text}>Here you can manage your account settings, privacy preferences, and notification options.</p>
      <p className={ui.text}>Notifications:
        <span className="font-semibold ml-2">
          <input
            type="checkbox"
            checked={notifications}
            onChange={(e) => setNotifications(e.target.checked)}
          />
          Enabled
        </span>
      </p>
      <p className={ui.text}>Language: <span className="font-semibold ml-2">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as "en" | "sv")}
          >
            <option value="en">English</option>
            <option value="sv">Swedish</option>
          </select></span>
      </p>

      <button
        onClick={handleSave}
        className={ui.buttonPrimary}
      >
        {loading ? "Saving..." : "Save Settings"}
      </button>
      {message && (
        <p className={ui.text}>{message}</p>
      )}
    </>
  )
}
