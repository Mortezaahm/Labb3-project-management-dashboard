"use client";
export default function AccessibilitySection() {
    return (
        <>
        <h2 className="text-xl font-semibold mb-4">Accessibility</h2>
        <p className="text-gray-600 mb-2">Here you can manage your accessibility preferences and customize your experience.</p>
        <h4 className="text-lg font-semibold mb-2">Text Size</h4>
        <select className="border rounded py-2 px-4 mb-4">
          <option value="small">Small</option>
          <option value="medium">Medium</option>
            <option value="large">Large</option>
        </select>
        <h4 className="text-lg font-semibold mb-2">Change Theme</h4>
        <label htmlFor="darkMode" className="form-label">
            Dark Mode
        </label>
        <input
            id="darkMode"
            type="checkbox"
            className="m-2"
            />
        <label htmlFor="lightMode" className="form-label">
            Light Mode
        </label>
        <input
            id="lightMode"
            type="checkbox"
            className="m-2"
            />
        </>

    )
}
