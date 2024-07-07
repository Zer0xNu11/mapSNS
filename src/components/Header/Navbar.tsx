import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { logout } from "@/actions/authAction";
import { signOut } from "@/auth";
import UserButton from "./UserButton";

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
                <UserButton />
            </>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
