import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MovieCard from "@/components/MovieCard";
import SearchBox from "@/components/SearchBox";
import React from "react";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

interface SearchPageProps {
  params: {
    searchTerm: string;
  };
}

export default async function SearchPage({ params }: SearchPageProps) {
  const searchTerm = params.searchTerm;

  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&query=${searchTerm}&page=1`
  );

  console.log("Searching for:", searchTerm);

  if (!res.ok) {
    throw new Error("Failed to fetch movies.");
  }

  const data: { results: Movie[] } = await res.json();
  const results = data.results;

  return (
    <div className="min-h-screen flex flex-col">
      <div className="sticky top-0">
        <Header />
        <SearchBox />
      </div>

      <div className="flex-1 sm:grid sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-4 m-8 items-center justify-center mx-auto">
        {results.length === 0 ? (
          <h1 className="text-center pt-6">No Movie Found</h1>
        ) : (
          results.map((movie) => (
            <MovieCard
              key={movie.id}
              title={movie.title}
              id={movie.id}
              poster_path={movie.poster_path}
            />
          ))
        )}
      </div>

      <Footer />
    </div>
  );
}
