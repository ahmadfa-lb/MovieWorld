import React from "react";
import Image from "next/image";
import {FaHouse } from "react-icons/fa6";
import Link from "next/link";

export default function Header() {
  return (
    <>
      <div className="mx-auto flex justify-between items-center bg-gray-900 shadow-md">
        <div>
          <Image
            src="/assets/logo.png" // Correct path for files in the public folder
            alt="Logo"
            width={120}
            height={100}
            className="pl-7"
          />
        </div>
        <div>
          <Link href={"/Home"} className="flex flex-col items-center">
            <FaHouse className="text-2xl text-gray-100"/>
            <p className="uppercase hidden sm:inline text-sm text-gray-100">Home</p>
          </Link>
        </div>
      </div>
    </>
  );
}
