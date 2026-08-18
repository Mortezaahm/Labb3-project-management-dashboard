type ProjectSummaryProps = {
  summary: {
    total: number;
    completed: number;
    inProgress: number;
    overdue: number;
  };
};


export default function ProjectSummary({summary}: ProjectSummaryProps) {

  return (
    <div className="mt-8 bg-white dark:bg-gray-700 rounded-xl shadow-md p-6">

      <h2 className="text-xl font-bold mb-6 dark:text-white">
        Project Summary
      </h2>


      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">


        <div>
          <p className="text-gray-500 dark:text-gray-300">
            Total
          </p>

          <p className="text-2xl font-bold dark:text-white">
            {summary.total}
          </p>
        </div>


        <div>
          <p className="text-gray-500 dark:text-gray-300">
            Completed
          </p>

          <p className="text-2xl font-bold dark:text-white">
            {summary.completed}
          </p>
        </div>


        <div>
          <p className="text-gray-500 dark:text-gray-300">
            In Progress
          </p>

          <p className="text-2xl font-bold dark:text-white">
            {summary.inProgress}
          </p>
        </div>


        <div>
          <p className="text-gray-500 dark:text-gray-300">
            Overdue
          </p>

          <p className="text-2xl font-bold dark:text-white">
            {summary.overdue}
          </p>
        </div>
      </div>
    </div>
  );
}
