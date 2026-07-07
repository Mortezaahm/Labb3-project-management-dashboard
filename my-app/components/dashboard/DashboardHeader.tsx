type DashboardHeaderProps = {
    userName : string
}

export default function DashboardHeader({userName}: DashboardHeaderProps) {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Welcome {userName}</h1>
      <p className="text-gray-600">Welcome to your dashboard! Here you can get an overview of your activities, recent projects, and important statistics at a glance.</p>
    </div>
  )
}
