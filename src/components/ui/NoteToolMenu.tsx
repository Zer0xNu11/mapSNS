"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "./button";

import { DotsThreeOutlineVertical } from "@phosphor-icons/react/dist/ssr/DotsThreeOutlineVertical";
import { CheckCircle } from "@phosphor-icons/react/dist/ssr/CheckCircle";
import Link from "next/link";
import { deleteNote } from "@/lib/deleteNote";
import { useState } from "react";

interface PostToolMenuProps {
  noteId: string;
}

const NoteToolMenu: React.FC<PostToolMenuProps> = ({ noteId }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const textToCopy = noteId;

  const copyNoteId = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);
      setShowAlert(true);

      // アラート非表示時間
      setTimeout(() => {
        setShowAlert(false);
        setIsCopied(false);
      }, 1000);
    } catch (err) {
      console.error("クリップボードへのコピーに失敗しました", err);
    }
  };

  return (
    <>
      {showAlert && (
        <div className="absolute right-0 left-0 m-auto w-64 h-2">
          <Alert>
            <AlertDescription className="flex flex-col text-center items-center">
              <CheckCircle className="mb-1" size={32} color="#27ec34" />
              <div className="mb-2">共有コードをコピーしました</div>
            </AlertDescription>
          </Alert>
        </div>
      )}
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
          <DropdownMenuItem asChild>
            <Link
              href={`${process.env.NEXT_PUBLIC_BASE_URL}/edit/note/${noteId}`}
            >
              名前変更
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <button
              disabled={isCopied}
              className="w-full disabled:text-gray-400 "
              onClick={async () => copyNoteId()}
            >
              共有コードをコピー
            </button>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <button className="w-full" onClick={async () => deleteNote(noteId)}>
              削除
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default NoteToolMenu;
