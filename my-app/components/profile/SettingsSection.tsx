"use client"

import { useState } from "react";

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
        <h2 className="text-xl font-semibold mb-4">Settings</h2>
        <p className="text-gray-600 mb-2">Here you can manage your account settings, privacy preferences, and notification options.</p>
        <p className="text-gray-600 mb-2">Notifications:
          <span className="font-semibold">
            <input
              type="checkbox"
              checked={notifications}
              onChange={(e) => setNotifications(e.target.checked)}
            />
            Enabled
          </span>
        </p>
        <p className="text-gray-600 mb-2">Language: <span className="font-semibold">
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
          disabled={loading}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {loading ? "Saving..." : "Save Settings"}
        </button>
        {message && (
          <p className="mt-2 text-sm">{message}</p>
        )}
      </>
    )
}
