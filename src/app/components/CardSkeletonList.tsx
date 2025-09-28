import CardSkeleton from './CardSkeleton';

const CardSkeletonList = () => (
  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
    {Array.from({ length: 20 }).map((_, idx) => (
      <CardSkeleton key={idx} />
    ))}
  </div>
);

export default CardSkeletonList;