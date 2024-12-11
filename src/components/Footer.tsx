import React from "react";

export default function Footer() {
  return (
    <div className="bg-gray-900 mt-6 p-6">
      <div className="flex flex-row justify-items-center justify-between">
        <span className="text-gray-100">
          Ahmad Farachi. All rights reserved &#169;
        </span>

        <div className="flex justify-center gap-x-32 text-gray-100">
          <a href="#">Terms & Agreements</a>
          <a href="#">Privacy Policy</a>
        </div>
      </div>
    </div>
  );
}
