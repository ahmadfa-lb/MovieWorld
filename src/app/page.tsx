"use client";

import "./globals.css";
import { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Footer from "../components/Footer";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

const Home: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalMovies, setTotalMovies] = useState<number>(0);

  // Fetch multiple pages of movies
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const maxPagesToFetch = 5;
        const movieResults: Movie[] = [];

        for (let i = 1; i <= maxPagesToFetch; i++) {
          const res = await fetch(
            `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&page=${i}`
          );
          const data = await res.json();
          movieResults.push(...data.results);
        }

        // Remove duplicates based on movie.id
        const uniqueMovies = Array.from(
          new Map(movieResults.map((movie) => [movie.id, movie])).values()
        );

        setMovies(uniqueMovies);
        setTotalMovies(uniqueMovies.length);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  if (movies.length === 0) {
    return <div>Loading...</div>;
  }

  const moviesPerPage = 8;
  const displayedMovies = movies.slice(
    (page - 1) * moviesPerPage,
    page * moviesPerPage
  );
  const totalPages = Math.ceil(totalMovies / moviesPerPage);

  const getVisiblePages = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (page <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (page >= totalPages - 2) {
        pages.push(
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(1, "...", page - 1, page, page + 1, "...", totalPages);
      }
    }
    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="h-screen flex flex-col w-full">
      <div className="sticky top-0">
      <Header />
      <Navbar />
      </div>
      <div className="grid grid-cols-4 gap-4 m-8 justify-items-center">
        {displayedMovies.map((movie) => (
          <div key={movie.id} className="bg-gray-200 rounded-md p-2 w-48">
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              width={200}
              height={300}
              className="rounded-md"
            />
            <h2 className="mt-2 font-bold w-46 overflow-hidden overflow-ellipsis whitespace-nowrap">{movie.title}</h2>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-8 gap-2 mb-8">
        <button
          disabled={page === 1}
          className="px-4 py-2 bg-gray-300 rounded-md"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        >
          Prev
        </button>
        {visiblePages.map((p, index) =>
          p === "..." ? (
            <span key={`ellipsis-${index}`} className="px-4 py-2">
              ...
            </span>
          ) : (
            <button
              key={`page-${p}`}
              className={`px-4 py-2 ${
                page === p ? "bg-blue-500 text-white" : "bg-gray-300"
              } rounded-md`}
              onClick={() => setPage(p as number)}
            >
              {p}
            </button>
          )
        )}
        <button
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-300 rounded-md"
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
        >
          Next
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
