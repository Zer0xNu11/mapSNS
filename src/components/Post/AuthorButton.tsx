import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { NoteSlotType} from "@/types";
import { User } from "lucide-react";

interface AuthorButtonProp {
  user: NoteSlotType;
}

export const AuthorButton: React.FC<AuthorButtonProp> = ({ user }) => {
  return (
    <div className="flex items-center">
      <span className="hidden text-sm sm:inline-flex"></span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative w-10 h-10 rounded-full">
            <Avatar className="w-10 h-10">
              <AvatarImage
                src={user?.userImageUrl || "/images/placeholder.png"}
                alt={user?.userName ?? ""}
              />
              {/* <AvatarFallback>{session.user.email}</AvatarFallback> */}
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className=" z-[3000] " align="start" forceMount>
          <DropdownMenuLabel className="">
            <div className="flex flex-col items-center px-2 rounded-sm">
              <p className="text-base leading-none mb-1">{user?.userName}</p>
              <p className="text-xs leading-none text-gray-400">
                {user?.userId}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuItem>
            <Link
              href={`${process.env.NEXT_PUBLIC_BASE_URL}/bio-menu/${user.userId}`}
              className="w-full"
            >
              <Button variant="ghost" className="w-full py-2 flex flex-row">
              <User />
                <div className="font-bold">プロフィール</div>
              </Button>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
