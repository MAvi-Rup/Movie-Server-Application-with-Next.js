import { Movie, MovieDetails } from "@/types";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export async function getPopularMovies(
  page: number = 1
): Promise<MovieResponse> {
  const res = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`,
    {
      next: { revalidate: 3600 }, // Cache for 1 hour
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch popular movies");
  }

  return res.json();
}

export async function searchMovies(
  query: string,
  page: number = 1
): Promise<MovieResponse> {
  const res = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
      query
    )}&page=${page}`
  );

  if (!res.ok) {
    throw new Error("Failed to search movies");
  }

  return res.json();
}

export async function getMovieDetails(id: string): Promise<MovieDetails> {
  const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`, {
    next: { revalidate: 60 }, // Cache for 1 minute
  });

  if (!res.ok) {
    throw new Error("Failed to fetch movie details");
  }

  return res.json();
}

export async function getMovieCredits(id: string): Promise<MovieDetails> {
  const res = await fetch(
    `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`,
    {
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch movie credits");
  }

  return res.json();
}

export function getImageUrl(
  path: string | null,
  size: "w500" | "original" = "w500"
): string {
  if (!path) return "/images/placeholder.png";
  return `https://image.tmdb.org/t/p/${size}${path}`;
}
