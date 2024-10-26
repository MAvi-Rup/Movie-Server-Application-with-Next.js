"use client";

import { getImageUrl } from "@/lib/tmdb";
import { Movie } from "@/types";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface MovieCardProps {
  movie: Movie;
  priority?: boolean;
}

const MovieCard: FC<MovieCardProps> = ({ movie, priority = false }) => {
  const releaseYear = new Date(movie.release_date).getFullYear();
  const imageUrl = getImageUrl(movie.poster_path);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group relative rounded-lg overflow-hidden bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      <Link href={`/movies/${movie.id}`}>
        <div className="aspect-[2/3] relative">
          <Image
            src={imageUrl}
            alt={movie.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            priority={priority}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="text-lg font-semibold text-white line-clamp-2">
            {movie.title}
          </h3>
          <div className="flex items-center justify-between mt-2">
            <span className="text-sm text-gray-300">{releaseYear}</span>
            <div className="flex items-center">
              <span className="text-yellow-400">★</span>
              <span className="text-white ml-1 text-sm">
                {movie.vote_average.toFixed(1)}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default MovieCard;
