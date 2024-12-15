import React from "react";
import Link from "next/link";

interface SearchPaginationProps {
  page: number;
  searchTerm: string;
  totalPages: number;
}

const SearchPagination: React.FC<SearchPaginationProps> = ({
  page,
  searchTerm,
  totalPages,
}) => {
  return (
    <div className="flex justify-center items-center mt-8 gap-2 mb-8">
      {/* Previous Button */}
      <Link
        href={`/search/${Math.max(page - 1, 1)}/${searchTerm}`}
        className={`px-4 py-2 rounded-md ${
          page === 1
            ? "bg-gray-200 cursor-not-allowed"
            : "bg-gray-300 hover:bg-gray-400"
        }`}
      >
        Prev
      </Link>

      {/* Page Numbers */}
      {[...Array(totalPages)].map((_, i) => (
        <Link
          key={`page-${i + 1}`}
          href={`/search/${i + 1}/${searchTerm}`}
          className={`px-4 py-2 rounded-md ${
            page === i + 1
              ? "bg-gray-900 text-white"
              : "bg-gray-300 hover:bg-gray-400"
          }`}
        >
          {i + 1}
        </Link>
      ))}

      {/* Next Button */}
      <Link
        href={`/search/${Math.min(page + 1, totalPages)}/${searchTerm}`}
        className={`px-4 py-2 rounded-md ${
          page === totalPages
            ? "bg-gray-200 cursor-not-allowed"
            : "bg-gray-300 hover:bg-gray-400"
        }`}
      >
        Next
      </Link>
    </div>
  );
};

export default SearchPagination;
