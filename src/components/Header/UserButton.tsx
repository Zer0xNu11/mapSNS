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

export default async function UserButton() {

  const session = await auth(); 
  if(!session?.user) return<SignIn provider='github'/>; //provider='github' を追加可能
  return (
    <div className="flex gap-2 items-center">
      <span className="hidden text-sm sm:inline-flex"></span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative w-8 h-8 rounded-full">
            <Avatar className="w-8 h-8">
               <AvatarImage 
                src={session.user.image ?? '/images/placeholder.png'} 
                alt={session.user.name ?? ""}/>
              <AvatarFallback>{session.user.email}</AvatarFallback> 
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{session.user.name}</p>
              <p className="text-xs leading-none text-muted-foreground">{session.user.email}</p>
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
