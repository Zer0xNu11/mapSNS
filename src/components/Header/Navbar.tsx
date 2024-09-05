import Link from "next/link";
import React from "react";
import UserButton from "./UserButton";
import SortButton from "./SortButton";
import { Button } from "../ui/button";
import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr/MagnifyingGlass";
import { Notebook } from "@phosphor-icons/react/dist/ssr/Notebook";
import { Triangle } from "@phosphor-icons/react/dist/ssr/Triangle";

const Navbar = () => {
  return (
    <header className="fixed h-[72px] bg-gray-700 p-4 text-white w-[100vw] z-[2000]">
      <div className="container mx-auto flex justify-between items-center">
        <div className="font-semibold text-xl">
          <Link href="/home" className="hidden xs:block">📍RyoCoder</Link>
          <Link href="/home" className="xs:hidden">📍</Link>
        </div>
        <nav>
          <ul className="flex space-x-4">
            <div className="flex flex-row gap-4 mx-4">
              <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/home/plans`}>
                <Button className="hidden sm:block">プラン</Button>
                <button className="sm:hidden relative w-12 h-12 bg-[#0f172a] rounded-md">
                  <MagnifyingGlass size={28} color="#fcfcfc" weight="light" className="absolute top-0 bottom-0 left-0 right-0 m-auto"/>
                </button>
              </Link>

              <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/home/notes`}>
                <Button className="hidden sm:block">レコード</Button>
                <button className="sm:hidden relative w-12 h-12 bg-[#0f172a] rounded-md">
                  <Notebook size={28} color="#fcfcfc" weight="light" className="absolute top-0 bottom-0 left-0 right-0 m-auto"/>
                </button>
              </Link>

              <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/home/share`}>
                <Button className="hidden sm:block">シェア</Button>
                <button className="sm:hidden relative w-12 h-12 bg-[#0f172a] rounded-md">
                  <Triangle size={28} color="#fcfcfc" weight="light" className="absolute top-0 bottom-0 left-0 right-0 m-auto"/>
                </button>
              </Link>
            </div>
            <>
              {/* <SortButton /> */}
              <UserButton />
            </>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
