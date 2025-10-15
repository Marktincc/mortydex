export default function Loading() {
  return (
    <div className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-4xl">
      <div className="animate-fade-in">
        {/* Searcher Skeleton */}
        <div className="mb-6 animate-pulse">
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg w-full"></div>
        </div>

        {/* Filter Skeleton */}
        <div className="mb-8 animate-pulse grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
        </div>

        {/* Card List Skeleton */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {Array.from({ length: 20 }).map((_, idx) => (
            <div key={idx} className="animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700 h-80 w-full flex flex-col">
              <div className="h-2/3 bg-gray-300 dark:bg-gray-600 rounded-t-lg" />
              <div className="p-4 space-y-2">
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2" />
                <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/3" />
                <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-2/3" />
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Skeleton */}
        <div className="mt-8 flex justify-center animate-pulse">
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg w-1/3"></div>
        </div>
      </div>
    </div>
  );
}
