"use client";

import { useState, useEffect } from "react";
// import { useRouter } from "next/router";
import MovieCard from "@/components/MovieCard";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";
import Pagination from "@/components/Pagination";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

const Home: React.FC = () => {
  // const router = useRouter();
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

  const moviesPerPage = 9;
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
    <div className="min-h-screen flex flex-col">
      <div className="sticky top-0">
        <Header />
        <Navbar />
      </div>
      <div className="sm:grid sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 m-8 max-w-6xl mx-auto">
        {displayedMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            title={movie.title}
            id={movie.id}
            poster_path={movie.poster_path}
              // onClick={() => router.push(`/MoviePage/${movie.id}`)}
          />
        ))}
      </div>

      <Pagination 
        page={page}
        setPage={setPage}
        visiblePages={visiblePages}
        totalPages={totalPages}
      />
      
      <Footer />
    </div>
  );
};

export default Home;
