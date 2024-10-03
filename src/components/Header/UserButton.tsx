import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { SignIn } from "./authMenus";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { auth } from "@/auth";
import { LogOutIcon, Settings, User } from "lucide-react";
import { SignOut } from "./SignOut";
import Link from "next/link";
import { getUser } from "@/lib/getUser";

export default async function UserButton() {
  const session = await auth();
  if (!session?.user?.id) return ''; //provider='github' を追加可能
  const userId = session.user.id;
  const user = await getUser(userId)
  return (
    <div className="flex gap-2 items-center">
      <span className="hidden text-sm sm:inline-flex"></span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative w-8 h-8 rounded-full">
            <Avatar className="w-8 h-8">
              <AvatarImage
                src={user?.imageUrl || "/images/placeholder.png"}
                alt={user?.name ?? ""}
              />
              {/* <AvatarFallback>{session.user.email}</AvatarFallback> */}
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 z-[3000]" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {user?.name}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {session.user.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuItem>
            <User />{" "}
            <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/bio-menu/${userId}`} className="w-full">
              <Button variant="ghost" className="w-full p-0 ">
                プロフィール
              </Button>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings />{" "}
            <Link href="/user-setting" className="w-full">
              <Button variant="ghost" className="w-full p-0 ">
                設定
              </Button>
            </Link>{" "}
          </DropdownMenuItem>
          <DropdownMenuItem>
            {" "}
            <LogOutIcon />
            <SignOut />{" "}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
