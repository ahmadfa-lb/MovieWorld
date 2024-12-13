import React from "react";
import Image from "next/image";
import Link from "next/link";

interface MovieCardProps {
  id: number;
  title: string;
  poster_path: string;
}
const MovieCard: React.FC<MovieCardProps> = ({ id, title, poster_path}) => {
  return (
    <div key={id} className="bg-gray-200 rounded-md p-2 w-60">
      <Link href={`/movie/${id}`} >
        <Image
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          alt={title}
          width={300}
          height={300}
          className="rounded-md"
        />
      <h2 className="mt-2 font-bold w-46 overflow-hidden overflow-ellipsis whitespace-nowrap">
        {title}
      </h2>
      </Link> 
    </div>
  );
};

export default MovieCard;
