import { LucideIcon } from 'lucide-react'

interface CardFeatureProps {
    title: string
    description: string
    icon: LucideIcon
}

export function CardFeature({
    title,
    description,
    icon: Icon
}: CardFeatureProps) {
    return (
        <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 text-left transition-all hover:shadow-lg dark:bg-gray-700 dark:border-gray-600 dark:hover:border-gray-500">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mb-5 text-blue-900 dark:bg-blue-950/60 dark:text-blue-300">
                <Icon size={18} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {title}
            </h3>
            <p className="text-gray-600 mb-4 dark:text-gray-300">
                {description}
            </p>
        </div>
    )
}
