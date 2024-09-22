import { NoteType } from "@/types";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

export interface NoteProps {
  note: NoteType;
  isLiked?: boolean;
  countLikes?: number;
  imageUrl?: string;
}

const Note: React.FC<NoteProps> = async ({ note }) => {
  return (
    <>
      <div className="bg-yellow-300 shadow-md rounded-lg m-4 p-4 mb-4 flex flex-row justify-between h-[20vh]">
        <div className="mb-4 w-1/2 h-full">
          <div className="flex flex-col  mb-2">
            <h2 className="text-gray-700 break-all font-bold">{note.title}</h2>
            <div>
              {/* <h2 className="font-semibold text-md">{note.author?.name}</h2> */}
              <p className="text-gray-500 text-sm ">
                {new Date(note.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        {note.imageUrl && (
          <div className="w-1/2 h-full items-center">
            <img
              className="mr-2 object-contain h-full"
              src={note.imageUrl}
              alt="imgae"
            />
          </div>
        )}
        <div className="flex flex-col gap-2">
          <Link href={`/home/notes/${note.id}`}>
            <Button>書く</Button>
          </Link>
          <Link href={`/home/notes/${note.id}`}>
            <Button>編集</Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Note;
