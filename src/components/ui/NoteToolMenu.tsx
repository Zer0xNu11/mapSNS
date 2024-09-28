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
import { deleteNote } from "@/lib/deleteNote";

interface PostToolMenuProps {
  noteId : string
}


const NoteToolMenu :React.FC<PostToolMenuProps>= ({noteId}) => {

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
            <DropdownMenuItem><Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/edit/note/${noteId}`}>名前変更</Link></DropdownMenuItem>
            <DropdownMenuItem><button onClick={async () => deleteNote(noteId)}>削除</button></DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </>
    );
};

export default NoteToolMenu;
