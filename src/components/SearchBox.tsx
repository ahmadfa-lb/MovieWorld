"use client"

import React, { FC, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useRouter } from "next/navigation";

interface SearchBoxProps{
  page: number;
}

const SearchBox: FC<SearchBoxProps> = ({ page }) => {
  const [search, setSearch] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search/${page}/${search}`);
  };

  return (
    <div className="bg-slate-800 shadow-md w-full opacity-80">
      <form className="container mx-auto flex items-center" onSubmit={handleSubmit}>
        <button title="search" disabled={search === ''} type="submit" className="disabled:cursor-not-allowed">
          <FaMagnifyingGlass className="text-gray-100"/>
        </button>
        <input
          type="text"
          placeholder="Search movies..."
          className="p-2 w-64 bg-inherit text-gray-100 placeholder-gray-400 rounded-md focus:outline-none "
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
    </div>
  );
};

export default SearchBox;
