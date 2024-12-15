// import React from "react";
// import Link from "next/link";
// // import { useRouter } from "next/router";

// interface PaginationProps {
//   page: number;
//   setPage: React.Dispatch<React.SetStateAction<number>>;
//   visiblePages: (string | number)[];
//   totalPages: number;
// }
// const Pagination: React.FC<PaginationProps> = ({
//   page,
//   setPage,
//   visiblePages,
//   totalPages,
// }) => {
//   // const router = useRouter();

//   return (
//     <div className="flex justify-center items-center mt-8 gap-2 mb-8">
//       <Link
//         href={`/page/${Math.max(page - 1, 1)}`}
//         className={`px-4 py-2 rounded-md ${
//           page === 1
//             ? "bg-gray-200 cursor-not-allowed"
//             : "bg-gray-300 hover:bg-gray-400"
//         }`}
//         onClick={(e) => {
//           if (page === 1) e.preventDefault();
//           else setPage((prev) => Math.max(prev - 1, 1));
//         }}
//       >
//         Prev
//       </Link>
//       {visiblePages.map((p, index) =>
//         p === "..." ? (
//           <span key={`ellipsis-${index}`} className="px-4 py-2">
//             ...
//           </span>
//         ) : (
//           <Link
//             href={`/page/${p}`}
//             key={`page-${p}`}
//             className={`px-4 py-2 rounded-md ${
//               page === p
//                 ? "bg-gray-900 text-white"
//                 : "bg-gray-300 hover:bg-gray-400"
//             }`}
//             onClick={() => setPage(p as number)}
//           >
//             {p}
//           </Link>
//         )
//       )}
//       <Link
//         href={`/page/${Math.min(page + 1, totalPages)}`}
//         onClick={(e) => {
//           if (page === totalPages)
//             e.preventDefault(); // Prevent navigating to invalid pages
//           else setPage((prev) => Math.min(prev + 1, totalPages));
//         }}
//         className={`px-4 py-2 rounded-md ${
//           page === totalPages
//             ? "bg-gray-200 cursor-not-allowed"
//             : "bg-gray-300 hover:bg-gray-400"
//         }`}
//       >
//         Next
//       </Link>
//     </div>
//   );
// };

// export default Pagination;

import React from "react";
import Link from "next/link";

interface PaginationProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  visiblePages: (string | number)[];
  totalPages: number;
}
const Pagination: React.FC<PaginationProps> = ({ page, setPage, visiblePages, totalPages }) => {
  return (
    <div className="flex justify-center items-center mt-8 gap-2 mb-8">
      <Link
        href={`/?page=${Math.max(page - 1, 1)}`}
        className={`px-4 py-2 rounded-md ${
          page === 1
            ? "bg-gray-200 cursor-not-allowed"
            : "bg-gray-300 hover:bg-gray-400"
        }`}
        onClick={(e) => {
          if (page === 1) e.preventDefault();
          else setPage((prev) => Math.max(prev - 1, 1));
        }}
      >
        Prev
      </Link>
      {visiblePages.map((p, index) =>
        p === "..." ? (
          <span key={`ellipsis-${index}`} className="px-4 py-2">
            ...
          </span>
        ) : (
          <Link
            href={`/?page=${p}`}
            key={`page-${p}`}
            className={`px-4 py-2 rounded-md ${
              page === p
                ? "bg-gray-900 text-white"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            onClick={() => setPage(p as number)}
          >
            {p}
          </Link>
        )
      )}
      <Link
        href={`/?page=${Math.min(page + 1, totalPages)}`}
        onClick={(e) => {
          if (page === totalPages) e.preventDefault();
          else setPage((prev) => Math.min(prev + 1, totalPages));
        }}
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

export default Pagination;
