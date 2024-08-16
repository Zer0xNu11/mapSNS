import Link from "next/link";
import React from "react";
import UserButton from "./UserButton";
import SortButton from "./SortButton";
import { Button } from "../ui/button";

const Navbar = () => {
  return (
    <header className="bg-gray-700 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="font-semibold text-xl">
          <Link href="/home">📍RyoCoder</Link>
        </h1>
        <nav>
          <ul className="flex space-x-4">
          <div className="flex flex-row gap-4 mx-4">
              <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/home/plans`}>
                <Button>プラン</Button>
              </Link>

              <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/home/notes`}>
                <Button>レコード</Button>
              </Link>

              <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/home/share`}>
                <Button>シェア</Button>
              </Link>
            </div>
            <>
              <SortButton />
              <UserButton />
            </>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
