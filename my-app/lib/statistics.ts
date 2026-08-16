import { getSession } from '@/lib/auth'
import { connectDB } from '@/lib/mongodb'
import { Project } from '@/models/Project'

export interface StatisticsData {
    totalProjects: number
    completedProjects: number
    inProgressProjects: number
    pendingProjects: number
    overdueProjects: number
    monthlyCompleted: number
    monthlyOverdue: number
    monthlyProjects: number
}

export async function getStatistics(): Promise<StatisticsData | null> {
    // checks if the user is authenticated
    const session = await getSession()
    if (!session) {
        return null
    }
    // connects to the database
    await connectDB()
    // sets the current session user to userId
    const userId = session.user.id
    const today = new Date()
    const firstOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
    // Promise.all to improve performance
    const [
        totalProjects,
        completedProjects,
        monthlyCompleted,
        inProgressProjects,
        pendingProjects,
        overdueProjects,
        monthlyOverdue,
        monthlyProjects
    ] = await Promise.all([
        // total projects
        Project.countDocuments({ createdBy: userId }),
        // completed projects
        Project.countDocuments({
            createdBy: userId,
            status: 'Completed'
        }),
        // completed projects of the current month
        Project.countDocuments({
            createdBy: userId,
            status: 'Completed',
            updatedAt: { $gte: firstOfMonth }
        }),
        // number of projects in progress
        Project.countDocuments({
            createdBy: userId,
            status: 'In Progress'
        }),
        // number of pending projects
        Project.countDocuments({
            createdBy: userId,
            status: 'Pending'
        }),
        // number of overdue projects
        Project.countDocuments({
            createdBy: userId,
            deadline: { $lte: today },
            status: { $ne: 'Completed' }
        }),
        // number of overdue projects of the current month
        Project.countDocuments({
            createdBy: userId,
            status: { $ne: 'Completed' },
            deadline: { $lt: today, $gte: firstOfMonth }
        }),
        // number of projects created in the current month
        Project.countDocuments({
            createdBy: userId,
            createdAt: { $gte: firstOfMonth }
        })
    ])

    return {
        totalProjects,
        completedProjects,
        monthlyCompleted,
        inProgressProjects,
        pendingProjects,
        overdueProjects,
        monthlyOverdue,
        monthlyProjects
    }
}
