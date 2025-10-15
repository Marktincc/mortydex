const CardSkeleton = () => (
  <div className="animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700 h-80 w-full flex flex-col">
    <div className="h-2/3 bg-gray-300 dark:bg-gray-600 rounded-t-lg" />
    <div className="p-4 space-y-2">
      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2" />
      <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/3" />
      <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-2/3" />
    </div>
  </div>
);

export default CardSkeleton;
