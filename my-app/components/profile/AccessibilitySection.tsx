"use client"
import { useState } from "react";
import { ui } from "@/lib/styles";
import { useSettings } from "@/hooks/useSettings";
import { useRouter } from "next/navigation";

type AccessibilitySectionProps = {
    user: {
        theme?: "light" | "dark";
        fontSize?: "small" | "medium" | "large";
    }
}

export default function AccessibilitySection( user: AccessibilitySectionProps) {

    const { theme, fontSize, setTheme, setFontSize } = useSettings()

    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")
    console.log(user)
    const router = useRouter();

    const handleSave = async () => {
        try {
            setLoading(true)
            setMessage("")

            const response = await fetch("/api/settings", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    theme,
                    fontSize
                })
            })

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message)
            }

            setMessage("Updated successfully")
            router.refresh();
        } catch (error) {
            setMessage(
                error instanceof Error ? error.message : "Something went wrong"
            )
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <h2 className={ui.subtitle}>Accessibility</h2>
            <p className={ui.text}>
                Here you can manage your accessibility preferences and customize your experience.
            </p>
            <h4 className={ui.subtitle}>Text Size</h4>
            <select
                value={fontSize}
                onChange={(e) => setFontSize(e.target.value as "small" | "medium" | "large")}
                className="border rounded py-2 px-4 mb-4"
            >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
            </select>

            <h4 className={ui.subtitle}>Change Theme</h4>
            <label className={ui.label}>
                <input
                    type="radio"
                    name="theme"
                    value="dark"
                    checked={theme === "dark"}
                    // onChange={(e) => setTheme(e.target.value as "light" | "dark")}
                    onChange={() => setTheme("dark")}
                    className="m-2"
                />
                Dark Mode
            </label>

            <label className={ui.label}>
                <input
                    type="radio"
                    name="theme"
                    value="light"
                    checked={theme === "light"}
                    // onChange={(e) => setTheme(e.target.value as "light" | "dark")}
                    onChange={() => setTheme("light")}
                    className="m-2"
                />
                Light Mode
            </label>

            <button
                onClick={handleSave}
                disabled={loading}
                className={ui.buttonPrimary}>
            {loading ? "Saving..." : "Save Changes"}
            </button>
            {message && (
                <p className={ui.messageText}>{message}</p>
            )}
        </>

    )
}
