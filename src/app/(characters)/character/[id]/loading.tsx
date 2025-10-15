export default function Loading() {
  return (
    <div className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-4xl">
      {/* 🔙 Botón volver con fade Skeleton */}
      <div className="mx-auto animate-fade-in animate-duration-[600ms] animate-ease-out mb-6">
        <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
      </div>

      {/* 🧍Card personaje Skeleton */}
      <div className="bg-background-light dark:bg-background-dark shadow-lg rounded-xl overflow-hidden mx-auto animate-fade-in animate-slide-up animate-duration-[800ms] animate-ease-out animate-delay-[200ms]">
        <div className="md:flex">
          <div className="md:flex-shrink-0 animate-zoom-in animate-duration-[700ms] animate-delay-[100ms]">
            {/* Image Skeleton */}
            <div className="h-64 w-full object-cover md:h-full md:w-64 bg-gray-300 dark:bg-gray-600 animate-pulse rounded-t-xl md:rounded-l-xl md:rounded-tr-none"></div>
          </div>

          {/* 🧾 Info personaje Skeleton */}
          <div className="p-8 flex-1 animate-slide-up animate-fade-in animate-duration-[800ms] animate-delay-[300ms]">
            {/* Name Skeleton */}
            <div className="h-8 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-4 animate-pulse"></div>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
              {/* Details Skeletons */}
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center animate-pulse">
                  <div className="h-4 w-28 bg-gray-200 dark:bg-gray-700 rounded mr-2"></div>
                  <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
              ))}

              <div className="sm:col-span-2 animate-pulse">
                <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
              <div className="sm:col-span-2 animate-pulse">
                <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 🎬 Episodios Skeleton */}
      <div className="mt-12 animate-fade-in animate-slide-up animate-delay-[600ms]">
        <div className="h-6 w-1/4 bg-gray-200 dark:bg-gray-700 rounded mb-4 animate-pulse"></div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[...Array(10)].map((_, index) => (
            <div
              key={index}
              className="bg-background-light dark:bg-background-dark shadow rounded-lg p-4 flex flex-col items-center justify-center text-center animate-pulse"
            >
              <div className="h-6 w-1/2 bg-gray-200 dark:bg-gray-700 rounded mb-1"></div>
              <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}