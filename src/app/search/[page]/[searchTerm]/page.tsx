import React from "react";
import MovieCard from "@/components/MovieCard";
import SearchBox from "@/components/SearchBox";
import SearchPagination from "@/components/SearchPagination";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

interface SearchPageProps {
  params: {
    page?: string;
    searchTerm: string;
  };
}

export default async function SearchPage({ params }: SearchPageProps) {
  const page = params.page ? parseInt(params.page, 10) : 1;
  const { searchTerm } = params;

  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&page=${page}&query=${searchTerm}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch movies.");
  }

  const data = await res.json();
  const results = data.results;
  const totalPages = data.total_pages;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Search Box */}
      <div className="sticky top-0 z-40">
        <SearchBox page={page} />
      </div>

      {/* Movies Grid */}
      <div className="flex-1 sm:grid sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-4 m-8 items-center justify-center mx-auto">
        {results.length === 0 ? (
          <h1 className="text-center pt-6">No Movie Found</h1>
        ) : (
          results.map((movie: Movie) => (
            <MovieCard
              key={movie.id}
              title={movie.title}
              id={movie.id}
              poster_path={movie.poster_path}
            />
          ))
        )}
      </div>

      {/* Search Pagination */}
      <SearchPagination
        page={page}
        searchTerm={searchTerm}
        totalPages={totalPages}
      />
    </div>
  );
}

