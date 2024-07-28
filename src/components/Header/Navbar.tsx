import Link from "next/link";
import React from "react";
import UserButton from "./UserButton";
import SortButton from "./SortButton";

const Navbar = () => {
  return (
    <header className="bg-gray-700 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="font-semibold text-xl">
          <Link href="/">📍MAP SNS</Link>
        </h1>
        <nav>
          <ul className="flex space-x-4">
            <>
                <SortButton/>
                <UserButton />
            </>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
