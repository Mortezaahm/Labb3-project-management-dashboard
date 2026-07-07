import Link from "next/link";

type Action = {
  title: string;
  description: string;
  href: string;
};

type QuickActionProps = {
  actions: Action[];
};

export default function QuickAction({actions}: QuickActionProps) {

  return (
    <div className="mt-8">

      <h2 className="text-xl font-bold mb-4 dark:text-white">
        Quick Actions
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {actions.map((action) => (
          <Link
            key={action.title}
            href={action.href}
            className="bg-white dark:bg-gray-700 rounded-xl shadow-md p-5 transition-all duration-200 hover:shadow-xl hover:-translate-y-1 dark:hover:bg-gray-600
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-blue-500
            "
          >
            <h3 className="font-bold text-lg dark:text-white">
              {action.title}
            </h3>

            <p className="text-gray-600 dark:text-gray-300 mt-2">
              {action.description}
            </p>

          </Link>
        ))}

      </div>

    </div>
  );
}
