import { getNotePoints } from "@/lib/getNotePoints";
import dynamic from "next/dynamic";
import React from "react";

interface Params {
  params: { noteId: string };
}

const NoteMap = async ({params}:Params) => {
  const noteId = params.noteId
  const currentPath = `${process.env.NEXT_PUBLIC_BASE_URL}/home/notes/${noteId}`

  const Map = React.useMemo(
    () =>
      dynamic(() => import("@/components/map/Map"), { //SSR停止　window error防止
        loading: () => <p>map is loading</p>,
        ssr: false,
      }),
    []
  );

  const { posts, polylineCoordinates } = await getNotePoints(noteId);

if(posts){
  return (
    <div className="w-full h-[100vh]">
      <div className="w-[80%] h-[80vh]">
        <Map posts={posts} polylineCoordinates={polylineCoordinates} />
      </div>
    </div>
  );
}
};

export default NoteMap;



