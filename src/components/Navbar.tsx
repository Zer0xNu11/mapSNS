import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { logout } from "@/actions/authAction";

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
              <form
                action={async () => {
                  "use server";
                  logout();
                }}
              >
                <Button>ログアウト</Button>
              </form>
            </>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
