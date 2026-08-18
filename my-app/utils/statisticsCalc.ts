export function getFirstMonth(): Date {
    const today = new Date()
    const firstOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
    return firstOfMonth
}

export function getMonthlyProjects<T extends { completedAt?: string }>(
    projects: T[]
): T[] {
    const firstOfMonth = getFirstMonth()
    const monthlyProjects = projects.filter(
        (project) =>
            project.completedAt && new Date(project.completedAt) >= firstOfMonth
    )
    return monthlyProjects
}
