export function progressionBarColor(
    rate: number,
    type: 'completion' | 'overdue'
) {
    if (type === 'completion') {
        if (rate < 30) return 'bg-red-500'
        if (rate >= 30 && rate < 80) return 'bg-yellow-500'
        return 'bg-green-500'
    } else if (type === 'overdue') {
        if (rate < 30) return 'bg-green-500'
        if (rate >= 30 && rate < 80) return 'bg-yellow-500'
        return 'bg-red-500'
    }
    return 'bg-gray-200'
}
