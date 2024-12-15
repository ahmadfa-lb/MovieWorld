// "use client";

// import { useState, useEffect } from "react";
// import MovieCard from "@/components/MovieCard";
// // import Header from "@/components/Header";
// import SearchBox from "@/components/SearchBox";
// import Footer from "@/components/Footer";
// import Pagination from "@/components/Pagination";

// interface Movie {
//   id: number;
//   title: string;
//   poster_path: string;
// }

// const Home: React.FC = () => {
//   const [movies, setMovies] = useState<Movie[]>([]);
//   const [page, setPage] = useState<number>(1);
//   const [totalMovies, setTotalMovies] = useState<number>(0);

//   useEffect(() => {
//     const fetchMovies = async () => {
//       setMovies([]);
//       try {
//         const res = await fetch(
//           `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&page=${page}`
//         );
//         const data = await res.json();

//         if (res.ok) {
//           setMovies(data.results);
//           setTotalMovies(data.total_results || 0);
//         } else {
//           console.error("Failed to fetch movies:", data);
//         }
//       } catch (error) {
//         console.error("Error fetching movies:", error);
//       }
//     };

//     fetchMovies();
//   }, [page]);

//   console.log(page);
//   console.log(movies);

//   if (movies.length === 0) {
//     return (
//       <div className="min-h-screen flex flex-col">
//         <div className="flex-1 flex items-center justify-center">
//           <p>Loading...</p>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   const totalPages = Math.min(Math.ceil(totalMovies / 20), 500);

//   const getVisiblePages = () => {
//     const pages = [];
//     if (totalPages <= 5) {
//       for (let i = 1; i <= totalPages; i++) {
//         pages.push(i);
//       }
//     } else {
//       if (page <= 3) {
//         pages.push(1, 2, 3, 4, "...", totalPages);
//       } else if (page >= totalPages - 2) {
//         pages.push(
//           1,
//           "...",
//           totalPages - 3,
//           totalPages - 2,
//           totalPages - 1,
//           totalPages
//         );
//       } else {
//         pages.push(1, "...", page - 1, page, page + 1, "...", totalPages);
//       }
//     }
//     return pages;
//   };

//   const visiblePages = getVisiblePages();

//   return (
//     <div className="min-h-screen flex flex-col relative">
//       <div className="sticky z-40">
//         <SearchBox page={page} />
//       </div>
//       <div className="flex-1 flex flex-col items-center justify-center">
//         <div className="sm:grid sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-4 m-8 items-center justify-center mx-auto">
//           {movies.map((movie) => (
//             <MovieCard
//               key={movie.id}
//               title={movie.title}
//               id={movie.id}
//               poster_path={movie.poster_path}
//             />
//           ))}
//         </div>
//         <Pagination
//           page={page}
//           setPage={setPage}
//           visiblePages={visiblePages}
//           totalPages={totalPages}
//         />
//       </div>

//     </div>
//   );
// };

// export default Home;



"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import MovieCard from "@/components/MovieCard";
import SearchBox from "@/components/SearchBox";
import Footer from "@/components/Footer";
import Pagination from "@/components/Pagination";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

const Home: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get the page number from the URL or default to 1
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState<number>(currentPage);
  const [totalMovies, setTotalMovies] = useState<number>(0);

  // Fetch movies when the page changes
  useEffect(() => {
    const fetchMovies = async () => {
      setMovies([]);
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&page=${page}`
        );
        const data = await res.json();

        if (res.ok) {
          setMovies(data.results);
          setTotalMovies(data.total_results || 0);
        } else {
          console.error("Failed to fetch movies:", data);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, [page]);

  // Sync the `page` state with the URL whenever it changes
  useEffect(() => {
    if (page !== currentPage) {
      router.replace(`?page=${page}`);
    }
  }, [page, currentPage, router]);

  const totalPages = Math.min(Math.ceil(totalMovies / 20), 500);

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

  if (movies.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <p>Loading...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col relative">
      <div className="sticky z-40">
        <SearchBox page={page} />
      </div>
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="sm:grid sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-4 m-8 items-center justify-center mx-auto">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              title={movie.title}
              id={movie.id}
              poster_path={movie.poster_path}
            />
          ))}
        </div>
        <Pagination
          page={page}
          setPage={setPage}
          visiblePages={visiblePages}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
};

export default Home;


