import React, { FC } from 'react';
import { FaMagnifyingGlass } from "react-icons/fa6";

const Navbar: FC = () => {
  return (
    <nav className="bg-slate-800 shadow-md w-full opacity-80">
      <div className="container mx-auto flex gap-2 items-center">
        {/* Search Bar */}
        <FaMagnifyingGlass className='text-gray-100'/>
        <input
          type="text"
          placeholder="Search movies..."
          className="p-2 w-64 bg-inherit text-white placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </nav>
  );
};

export default Navbar;
