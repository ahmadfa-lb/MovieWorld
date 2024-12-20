import React from "react";
import Image from "next/image";
import { FaHouse, FaRegLightbulb } from "react-icons/fa6";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <>
      <div className="mx-auto flex justify-between items-center bg-gray-900 shadow-md px-4 w-full">
        <div className="flex gap-8 items-center">
          <Image
            src="/assets/logo.png"
            alt="Logo"
            width={120}
            height={100}
            className="pl-7"
          />
          <Link href={"/?page=1"} className="flex flex-col items-center">
            <FaHouse className="text-2xl text-gray-100" />
            <p className="uppercase hidden sm:inline text-sm text-gray-100 hover:underline">
              Home
            </p>
          </Link>
        </div>

        <div className="flex gap-4">
          <button title="light/dark theme" type="submit">
            <FaRegLightbulb className="text-2xl text-gray-100" />
          </button>

          <Button variant="outline" size="sm">
          Sign In
      </Button>
          <Button variant="destructive" size="sm">
            {/* <FaUser className="text-2xl text-gray-100" /> */}
            Sign Up
          </Button>
        </div>
      </div>
    </>
  );
}
