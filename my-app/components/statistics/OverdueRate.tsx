// import { projectHistory } from '@/data/statistics'
import { progressionBarColor } from '@/utils/progressionBar'
// import { getMonthlyProjects } from '@/utils/statisticsCalc'

interface OverdueRateProps {
    overdueProjects: number
    totalProjects: number
    monthlyOverdue: number
    monthlyProjects: number
}

export function OverdueRate({
    overdueProjects,
    totalProjects, monthlyOverdue, monthlyProjects
}: OverdueRateProps) {
    // Calculates the all time overdue rate
    const allTimeOverdueRate =
        totalProjects > 0
            ? Math.round((overdueProjects / totalProjects) * 100)
            : 0

    // Overdue percentage
    const monthlyRate =
        monthlyProjects > 0
            ? Math.round((monthlyOverdue / monthlyProjects) * 100)
            : 0

    return (
        <div className="min-h-58 mt-6 rounded-xl shadow-md p-8 border border-gray-200 dark:border-gray-600">
            <h2 className="text-2xl font-bold mb-4">Overdue Rate</h2>
            <p>All time overdue rate {allTimeOverdueRate}%</p>
            <p>
                {overdueProjects} of {totalProjects} projects overdue
            </p>
            <div
                className="w-full bg-gray-200 rounded-full mt-4"
                role="progressbar"
                aria-valuenow={allTimeOverdueRate}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="All time overdue rate"
            >
                <div
                    className={`${progressionBarColor(allTimeOverdueRate, 'overdue')} h-3 rounded-full`}
                    style={{ width: `${allTimeOverdueRate}%` }}
                />
            </div>
            <p className="mt-4">Monthly overdue rate {monthlyRate}%</p>
            <div
                className="w-full bg-gray-200 rounded-full mt-4"
                role="progressbar"
                aria-valuenow={monthlyRate}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Monthly overdue rate"
            >
                <div
                    className={`${progressionBarColor(monthlyRate, 'overdue')} h-3 rounded-full`}
                    style={{ width: `${monthlyRate}%` }}
                />
            </div>
        </div>
    )
}
