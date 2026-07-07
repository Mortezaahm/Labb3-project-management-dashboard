type StatsCardProps = {
 title:string;
 value:number;
}

export default function StatsCard({title, value} : StatsCardProps) {
  return (
    <div className="bg-white dark:bg-gray-700 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-600">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-300">
            {title}
        </h3>
        <p className="text-3xl font-bold mt-2 dark:text-white">
            {value}
        </p>
    </div>
  )
}
