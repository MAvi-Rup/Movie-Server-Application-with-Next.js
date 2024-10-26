export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
}

export interface MovieDetails extends Movie {
  genres: Array<{
    id: number;
    name: string;
  }>;
  runtime: number;
  status: string;
  tagline: string | null;
}

export interface ThemeContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

export interface SearchBarProps {
  className?: string;
}

export interface HeaderProps {
  className?: string;
}

export interface ThemeToggleProps {
  className?: string;
}

export interface MovieCardProps {
  movie: Movie;
  className?: string;
}

export interface LayoutProps {
  children: React.ReactNode;
}
