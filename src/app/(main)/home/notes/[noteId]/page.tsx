import Loading from "@/app/loading";
import ListFromNoteId from "@/components/ListFromNoteId";
import { NoteType } from "@/types";
import { LineSegments } from "@phosphor-icons/react/dist/ssr/LineSegments";
import { MapPinPlus } from "@phosphor-icons/react/dist/ssr/MapPinPlus";
import Link from "next/link";
import React from "react";

interface Params {
  params: { noteId: string };
}

const getNoteData = async (noteId: string): Promise<NoteType> => {
  const response = await fetch(
    `${process.env.API_URL}/notes/getNoteData/${noteId}`,
    {
      cache: "no-store", //キャッシュ無効化のオプション
    }
  );

  if (response.status !== 200) {
    throw new Error("不正な値です");
  }

  const data = await response.json();
  return data.data as NoteType;
};

const NotePage = async ({ params }: Params) => {
  const noteId = params.noteId;
  
  try {
    const note = await getNoteData(noteId);
    console.log({note:note})
    if (!note) {
      return <Loading />;
    }
    return (
      <>
        <div>NotePage{` ${note.title}`} totalLike{`${note.totalLikes}`}</div>
        <ListFromNoteId noteId={noteId} />
        <div className="fixed bottom-0 right-0 h-16 my-4 mr-8">
          <Link
            href={`${process.env.NEXT_PUBLIC_BASE_URL}/create/post/${noteId}`}
          >
            <button className="bg-green-400 rounded-full p-2 m-2 border-black border-2">
              <MapPinPlus size={32} color="#050505" weight="duotone" />
            </button>
          </Link>
          <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/home/map/${noteId}`}>
            <button className=" bg-red-400 rounded-full p-2 m-2 border-black border-2">
              <LineSegments size={32} color="#050505" weight="duotone" />
            </button>
          </Link>
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
};

export default NotePage;
