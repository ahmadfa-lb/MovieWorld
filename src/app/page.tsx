"use client";

import './globals.css';
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar"

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

const Home: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&page=${page}`
    )
      .then((res) => res.json())
      .then((data) => setMovies(data.results))
      .catch((error) => console.error("Error fetching movies:", error));
  }, [page]);

  // Avoid rendering content until movies are loaded
  if (movies.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
    <Navbar />
      <div className="grid grid-cols-4 gap-4">
        {movies.map((movie) => (
          <div key={movie.id} className="bg-gray-200 p-4 rounded-md">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="rounded-md"
            />
            <h2 className="mt-2 font-bold">{movie.title}</h2>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        {[1, 2, 3, 4, 5].map((number) => (
          <button
            key={number}
            className={`px-4 py-2 mx-1 ${
              page === number ? "bg-blue-500 text-white" : "bg-gray-300"
            } rounded-md`}
            onClick={() => setPage(number)}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;
