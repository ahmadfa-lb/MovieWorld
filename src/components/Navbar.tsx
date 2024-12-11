import React, { FC } from 'react';

const Navbar: FC = () => {
  return (
    <nav className="bg-gray-900 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo or Brand Name */}
        <h1 className="text-white text-2xl font-bold tracking-wide">
          MovieWorld
        </h1>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search movies..."
          className="p-2 w-64 bg-gray-800 text-white placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </nav>
  );
};

export default Navbar;
