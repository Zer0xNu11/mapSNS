import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { BioMenu, SignIn, SignOut, UserSetting } from "./authMenus";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { auth } from "@/auth";
import { LogOutIcon, Settings, User } from "lucide-react";

export default async function SortButton() {

  const session = await auth(); 
  return (
    <div className="flex gap-2 items-center">
      <span className="hidden text-sm sm:inline-flex"></span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative w-8 h-8 rounded-full">
            <Avatar className="w-8 h-8 bg-white">
               <AvatarImage 
                src={'/images/funnel-light.svg'} 
                alt={"SortButton"}
                className="p-1"
                />
                
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              投稿のフィルター
            </div>
          </DropdownMenuLabel>
          <DropdownMenuItem><User/> <BioMenu /> </DropdownMenuItem>
          <DropdownMenuItem><Settings/> <UserSetting /> </DropdownMenuItem>
          <DropdownMenuItem> <LogOutIcon/><SignOut /> </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
