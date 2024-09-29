"use client";
import { NoteType } from "@/types";
import { Button } from "../ui/button";
import { setCurrentNoteData } from "@/lib/localStorageHandler";
import { useRouter } from "next/navigation";
import { useState } from "react";
import NoteToolMenu from "../ui/NoteToolMenu";

export interface NoteProps {
  note: NoteType;
  isLiked?: boolean;
  countLikes?: number;
  imageUrl?: string;
}

const Note: React.FC<NoteProps> = async ({ note }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const setLocalStorage = async () => {
    setCurrentNoteData(note.id, note.title);
  };

  const writeNote = async () => {
    setLoading(true);

    try {
      await setLocalStorage();
      router.push(`/home`);
    } catch (error) {
      console.error("Error writing note:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-yellow-300 shadow-md rounded-lg m-4 p-4 mb-4 flex flex-row justify-between h-[20vh]">
        <div className="mb-4 w-3/4 h-full">
          <div className="flex flex-col  mb-2">
            <h2 className="text-gray-700 break-all font-bold">{note.title}</h2>
            <div>
              <p className="text-gray-500 text-sm ">
                {new Date(note.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        {/* {note.imageUrl && (
          <div className="w-1/2 h-full items-center">
            <img
              className="mr-2 object-contain h-full"
              src={note.imageUrl}
              alt="imgae"
            />
          </div>
        )} */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-end">
            <NoteToolMenu noteId={note.id} />
          </div>
          <Button
            className="disabled:bg-gray-500"
            onClick={writeNote}
            disabled={loading}
          >
            書く
          </Button>
        </div>
      </div>
    </>
  );
};

export default Note;
