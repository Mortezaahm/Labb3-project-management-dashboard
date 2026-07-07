type Project = {
    id: number,
    title: string,
    status: string,
    updated: string
}

type RecentProjectsProps = {
    projects: Project[]
}

export default function RecentProjects({projects} : RecentProjectsProps) {
  return (
    <div className="mt-8 bg-white dark:bg-gray-700 rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold mb-4 dark:text-white">
            Recent Projects
        </h2>

        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead>
                    <tr className="border-b dark:border-gray-600">
                    <th className="py-3">
                        Project
                    </th>

                    <th className="py-3">
                        Status
                    </th>

                    <th className="py-3">
                        Updated
                    </th>
                    </tr>
                </thead>

                <tbody>
                    {projects.map((project) =>
                        <tr
                            key={project.id}
                            className="border-b dark:border-gray-600"
                        >
                            <td className="py-3">
                                {project.title}
                            </td>
                            <td className="py-3">
                                {project.status}
                            </td>
                            <td className="py-3">
                                {project.updated}
                            </td>
                        </tr>

                    )}
                </tbody>
            </table>
        </div>
    </div>
  )
}
