/*
Settings

Notifications

Language

Theme
*/
export default function SettingsSection() {
    return (
        <>
        <h2 className="text-xl font-semibold mb-4">Settings</h2>
        <p className="text-gray-600 mb-2">Here you can manage your account settings, privacy preferences, and notification options.</p>
        <p className="text-gray-600 mb-2">Notifications: <span className="font-semibold"><input type="checkbox" /> Enabled</span></p>
        <p className="text-gray-600 mb-2">Language: <span className="font-semibold">
            <select>
                <option>English</option>
                <option>Swedish</option>
            </select></span>
        </p>
        <p className="text-gray-600 mb-2">Theme: <span className="font-semibold">Light</span></p>
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Manage Settings
        </button>
        </>
    )
}
