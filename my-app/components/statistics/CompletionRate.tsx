import { progressionBarColor } from '@/utils/progressionBar'

interface CompletionRateProps {
    completedProjects: number
    totalProjects: number
    monthlyCompleted: number
    monthlyProjects: number
}

export function CompletionRate({
    completedProjects,
    totalProjects, monthlyCompleted, monthlyProjects
}: CompletionRateProps) {
    // Monthly completion percentage
    const monthlyCompletionRate =
        monthlyProjects > 0
            ? Math.round((monthlyCompleted / monthlyProjects) * 100)
            : 0

    // Calculates the all time completion rate
    const allTimeCompletionRate =
        totalProjects > 0
            ? Math.round((completedProjects / totalProjects) * 100)
            : 0

    return (
        <div className="min-h-58 mt-6 rounded-xl shadow-md p-8 border border-gray-200 dark:border-gray-600">
            <h2 className="text-2xl font-bold mb-4">Overall Completion Rate</h2>
            <p>All time completion rate {allTimeCompletionRate}%</p>
            <p>
                {completedProjects} of {totalProjects} projects completed
            </p>

            <div
                className="w-full bg-gray-200 rounded-full mt-4"
                role="progressbar"
                aria-valuenow={allTimeCompletionRate}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="All time completion rate"
            >
                <div
                    className={`${progressionBarColor(allTimeCompletionRate, 'completion')} h-3 rounded-full`}
                    style={{ width: `${allTimeCompletionRate}%` }}
                />
            </div>
            <p className="mt-4">
                Monthly completion rate {monthlyCompletionRate}%
            </p>
            <div
                className="w-full bg-gray-200 rounded-full mt-4"
                role="progressbar"
                aria-valuenow={monthlyCompletionRate}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Monthly completion rate"
            >
                <div
                    className={`${progressionBarColor(monthlyCompletionRate, 'completion')} h-3 rounded-full`}
                    style={{ width: `${monthlyCompletionRate}%` }}
                />
            </div>
        </div>
    )
}
