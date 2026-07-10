import { projectHistory } from '@/data/statistics'
import { progressionBarColor } from '@/utils/progressionBar'

interface OverdueRateProps {
    overdueProjects: number
    totalProjects: number
}

export function OverdueRate({
    overdueProjects,
    totalProjects
}: OverdueRateProps) {
    // Gets the first day of the month
    const today = new Date()
    const firstOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)

    // Calculates the all time overdue rate
    const allTimeOverdueRate =
        totalProjects > 0
            ? Math.round((overdueProjects / totalProjects) * 100)
            : 0

    // Gets the projects completed in the active month
    const monthlyProjects = projectHistory.filter(
        (project) =>
            project.completedAt && new Date(project.completedAt) >= firstOfMonth
    )
    // Completed projects that were overdue this month
    const monthlyOverdue = monthlyProjects.filter(
        (project) => project.wasOverdue
    ).length
    // Overdue percentage
    const monthlyRate =
        monthlyProjects.length > 0
            ? Math.round((monthlyOverdue / monthlyProjects.length) * 100)
            : 0

    return (
        <div className="min-h-58 mt-6 rounded-xl shadow-md p-8 border border-gray-200 dark:border-gray-600">
            <h2 className="text-2xl font-bold mb-4">Overdue Rate</h2>
            <p>All time overdue rate {allTimeOverdueRate}%</p>
            <p>
                {overdueProjects} of {totalProjects} projects overdue
            </p>
            <div className="w-full bg-gray-200 rounded-full mt-4">
                <div
                    className={`${progressionBarColor(allTimeOverdueRate, 'overdue')} h-3 rounded-full`}
                    style={{ width: `${allTimeOverdueRate}%` }}
                />
            </div>
            <p className="mt-4">Monthly overdue rate {monthlyRate}%</p>
            <div className="w-full bg-gray-200 rounded-full mt-4">
                <div
                    className={`${progressionBarColor(monthlyRate, 'overdue')} h-3 rounded-full`}
                    style={{ width: `${monthlyRate}%` }}
                />
            </div>
        </div>
    )
}
