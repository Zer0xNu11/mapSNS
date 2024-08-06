import { auth } from "@/auth";
import { prismadb } from "@/globals/db";
import { NoteType } from "@/types";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

export interface NoteProps {
  note: NoteType;
  isLiked?: boolean;
  countLikes? : number;
  imageUrl? : string;
}


const Note: React.FC<NoteProps> = async ({note}) => {
  return (
    <>
    <div className="bg-yellow-300 shadow-md rounded-lg m-4 p-4 mb-4 flex flex-row justify-between h-[20vh]">
      <div className="mb-4 w-1/2 h-full">
        <div className="flex items-center mb-2">
          <Image
            className="w-10 h-10 rounded-full mr-2"
            src='/images/placeholder.png'
            width='100'
            height='100'
            alt="User Avatar"
          />
          <div>
            <h2 className="font-semibold text-md">{note.author?.name}</h2>
            <p className="text-gray-500 text-sm ">
              {new Date(note.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
        <p className="text-gray-700 break-all">{note.title}</p>
      </div>
      <div className="w-1/2 h-full items-center">
        <img
            className="mr-2 object-contain h-full"
            src={note.imageUrl || '/images/blank.png'}
            alt="User Avatar"
          />
      </div>
      <Link href={`/home/notes/${note.id}`}>
      <Button>書く</Button>
      </Link>
    </div>
    </>
  );
};

export default Note;
