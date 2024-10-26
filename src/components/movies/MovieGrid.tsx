"use client";

import { getPopularMovies, searchMovies } from "@/lib/tmdb";
import { Movie } from "@/types";
import { FC, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import MovieCard from "./MovieCard";
import { MovieSkeleton } from "./MovieSkeleton";

interface MovieGridProps {
  initialMovies: Movie[];
  totalPages: number;
  searchQuery?: string;
}

const MovieGrid: FC<MovieGridProps> = ({
  initialMovies,
  totalPages,
  searchQuery,
}) => {
  const [movies, setMovies] = useState<Movie[]>(initialMovies);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { ref, inView } = useInView();

  useEffect(() => {
    setMovies(initialMovies);
    setPage(1);
  }, [initialMovies, searchQuery]);

  useEffect(() => {
    const loadMoreMovies = async () => {
      if (isLoading || page >= totalPages) return;

      setIsLoading(true);
      const nextPage = page + 1;

      try {
        const data = searchQuery
          ? await searchMovies(searchQuery, nextPage)
          : await getPopularMovies(nextPage);

        setMovies((prev) => [...prev, ...data.results]);
        setPage(nextPage);
      } catch (error) {
        console.error("Failed to load more movies:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (inView) {
      loadMoreMovies();
    }
  }, [inView, page, totalPages, isLoading, searchQuery]);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {movies.map((movie, index) => (
          <MovieCard
            key={`${movie.id}-${index}`}
            movie={movie}
            priority={index < 10}
          />
        ))}
      </div>

      {page < totalPages && (
        <div ref={ref} className="mt-8 flex justify-center">
          {isLoading && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {[...Array(5)].map((_, i) => (
                <MovieSkeleton key={i} />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default MovieGrid;
