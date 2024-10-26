export const MovieSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="aspect-[2/3] bg-gray-700 rounded-lg overflow-hidden" />
      <div className="mt-4 space-y-3">
        <div className="h-4 bg-gray-700 rounded w-3/4" />
        <div className="h-4 bg-gray-700 rounded w-1/2" />
      </div>
    </div>
  );
};
