import ListFromNoteId from "@/components/ListFromNoteId";
import { getNotePoints } from "@/lib/getNotePoints";
import dynamic from "next/dynamic";
import React from "react";

interface NoteMainProps {
  noteId: string;
}

const NoteMain:React.FC<NoteMainProps>  = async ({noteId}) => {
  const Map = React.useMemo(
    () =>
      dynamic(() => import("@/components/map/Map"), { //SSR停止　window error防止
        loading: () => <p>map is loading</p>,
        ssr: false,
      }),
    []
  );

  return (
    <>
    <div className="w-full h-[100vh]">
      <div className="w-[100%] h-[80vh]">
        <Map noteId={noteId} />
      </div>
    </div>
    </>
  );
};

export default NoteMain;