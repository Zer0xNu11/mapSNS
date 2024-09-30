"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { Button } from "./button";

import { DotsThreeOutlineVertical } from "@phosphor-icons/react/dist/ssr/DotsThreeOutlineVertical";
import Link from "next/link";
import { deletePlanPoint } from "@/lib/deletePlanPoint";

interface planPointToolMenuProps {
  planPointId : string
}


const PlanPointToolMenu :React.FC<planPointToolMenuProps>= ({planPointId}) => {

  const path = `${process.env.NEXT_PUBLIC_BASE_URL}/home`

    return (
      <>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="focus:outline-none focus:ring-0 h-6 w-4 bg-gray-100 bg-opacity-50"
            >
              <DotsThreeOutlineVertical size={16} color="#000000" weight="fill" />
            </Button>
            {/* <div className="flex w-5 h-2 justify-center items-center">
              <DotsThreeOutlineVertical size={16} color="#000000" weight="fill" />
            </div> */}
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="z-[3000]"
            align="end"
            side="top"
            forceMount
          >
            {/* <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {session.user.name}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {session.user.email}
                  </p>
                </div>
              </DropdownMenuLabel> */}
              <DropdownMenuItem asChild><button className="w-full">詳細</button></DropdownMenuItem>
            <DropdownMenuItem asChild><Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/detail/planPoint/${planPointId}`}>編集</Link></DropdownMenuItem>
            
            <DropdownMenuItem asChild><button className="w-full" onClick={() => {deletePlanPoint(planPointId,path)}}>削除</button></DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </>
    );
};

export default PlanPointToolMenu;
