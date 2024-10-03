import Link from "next/link";
import React from "react";
import UserButton from "./UserButton";
import { Button } from "../ui/button";
import { Compass } from "@phosphor-icons/react/dist/ssr/Compass";
import { Notebook } from "@phosphor-icons/react/dist/ssr/Notebook";
import { MapPinArea } from "@phosphor-icons/react/dist/ssr/MapPinArea";

const Navbar = () => {
  return (
    <header className="fixed h-[72px] bg-gray-700 p-4 text-white w-[100vw] z-[2000]">
      <div className="container mx-auto flex justify-between items-center">
        <div className="font-semibold text-xl">
          <Link href="/home" className="hidden xs:block">
            ぶらつ記
          </Link>
          <Link href="/home" className="xs:hidden">
            📍
          </Link>
        </div>
        <nav>
          <ul className="flex space-x-4">
            <div className="flex flex-row gap-4 mx-4">
              <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/home/plans`}>
                <Button className="hidden sm:flex">
                  <Compass size={16} color="#f6f6f9" weight="fill" />
                  <div>プラン</div>
                </Button>
                <button className="sm:hidden relative w-12 h-12 bg-[#0f172a] rounded-md">
                  <Compass
                    size={32}
                    color="#f6f6f9"
                    weight="fill"
                    className="absolute top-0 bottom-0 left-0 right-0 m-auto"
                  />
                </button>
              </Link>

              <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/home/notes`}>
                <Button className="hidden sm:flex">
                  <Notebook
                    size={16}
                    color="#fcfcfc"
                    weight="fill"
                  />
                  <div>ノート</div>
                </Button>
                <button className="sm:hidden relative w-12 h-12 bg-[#0f172a] rounded-md ">
                  <Notebook
                    size={28}
                    color="#fcfcfc"
                    weight="fill"
                    className="absolute top-0 bottom-0 left-0 right-0 m-auto"
                  />
                </button>
              </Link>

              <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/home`}>
                <Button className="hidden sm:flex">
                  <MapPinArea size={16} color="#f6f6f9" weight="fill" />
                  <div>マップ</div>
                </Button>
                <button className="sm:hidden relative w-12 h-12 bg-[#0f172a] rounded-md">
                  <MapPinArea
                    size={32}
                    color="#f6f6f9"
                    weight="fill"
                    className="absolute top-0 bottom-0 left-0 right-0 m-auto"
                  />
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
