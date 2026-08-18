import Link from "next/link";
import { WifiOff } from "lucide-react";

export default function OfflinePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900 px-6">
      <div className="max-w-md text-center bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-10">

        <WifiOff size={72} className="mx-auto mb-6 text-blue-700" />

        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          You are Offline
        </h1>

        <p className="mt-4 text-gray-600 dark:text-gray-300">
          It looks like your internet connection is unavailable.
          Please reconnect and try again.
        </p>

        <Link
          href="/"
          className="inline-block mt-8 rounded-lg bg-blue-700 px-6 py-3 text-white transition-colors hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Back to Home
        </Link>

      </div>
    </main>
  );
}
