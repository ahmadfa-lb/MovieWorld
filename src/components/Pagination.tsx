import React from "react";

interface PaginationProps {
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    visiblePages: (string | number)[];
    totalPages: number;
}
const Pagination: React.FC<PaginationProps> = ({ page, setPage, visiblePages, totalPages }) => {
  return (
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
                page === p ? "bg-gray-900 text-white" : "bg-gray-300"
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
  );
}

export default Pagination;