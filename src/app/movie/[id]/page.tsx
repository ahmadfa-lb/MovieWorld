"use client";

import { use, useEffect, useState } from "react";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
import Image from "next/image";

interface Movie {
  title: string;
  poster_path: string;
  overview: string;
  backdrop_path: string;
  vote_average: number;
  release_date: string;
  original_language: string;
}

const MovieDetails = ({
  params: paramsPromise,
}: {
  params: Promise<{ id: string }>;
}) => {
  const params = use(paramsPromise);
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      if (!params?.id) return;

      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${params.id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
      );
      if (!res.ok) {
        console.error("Failed to fetch movie details");
        return;
      }

      const data = await res.json();
      setMovie(data);
    };

    fetchMovie();
  }, [params]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* <div className="sticky top-0 z-50">
        <Header />
      </div> */}

      <main className="flex-1 flex justify-center items-center">
        {movie ? (
          <div className="flex gap-7 m-8 bg-gray-200 rounded-lg">
            <Image
              src={`https://image.tmdb.org/t/p/w500${
                movie.poster_path || movie.backdrop_path
              }`}
              alt={movie.title}
              width={300}
              height={100}
              className="p-6"
            />
            <div className="pt-12 pr-8">
              <p>
                <span className="text-gray-900 text-lg font-bold">Title:</span>{" "}
                {movie.title}
              </p>
              <p>
                <span className="text-gray-900 text-lg font-bold">
                  Vote Average:
                </span>{" "}
                {movie.vote_average}
              </p>
              <p>
                <span className="text-gray-900 text-lg font-bold">
                  Release Date:
                </span>{" "}
                {movie.release_date}
              </p>
              <p>
                <span className="text-gray-900 text-lg font-bold">
                  Original Language:
                </span>{" "}
                {movie.original_language}
              </p>
              <p>
                <span className="text-gray-900 text-lg font-bold">
                  Overview:
                </span>{" "}
                {movie.overview}
              </p>
            </div>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </main>

      {/* <Footer /> */}
    </div>
  );
};

export default MovieDetails;
