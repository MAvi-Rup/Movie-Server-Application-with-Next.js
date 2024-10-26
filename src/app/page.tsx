import MovieGrid from "@/components/movies/MovieGrid";
import { MovieSkeleton } from "@/components/movies/MovieSkeleton";
import { getPopularMovies, searchMovies } from "@/lib/tmdb";
import { Suspense } from "react";

interface HomePageProps {
  searchParams: { query?: string; page?: string };
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const query = searchParams.query;
  const page = parseInt(searchParams.page || "1");

  const movieData = query
    ? await searchMovies(query, page)
    : await getPopularMovies(page);

  const title = query ? `Search results for "${query}"` : "Popular Movies";

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        {title}
      </h1>

      <Suspense
        fallback={
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {[...Array(20)].map((_, i) => (
              <MovieSkeleton key={i} />
            ))}
          </div>
        }
      >
        <MovieGrid
          initialMovies={movieData.results}
          totalPages={movieData.total_pages}
          searchQuery={query}
        />
      </Suspense>
    </div>
  );
}
