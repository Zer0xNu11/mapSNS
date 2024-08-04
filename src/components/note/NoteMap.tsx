import { getNotePoints } from "@/lib/getNotePoints";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import { PostsProps } from "../Post/Posts";
import { usePathname } from "next/navigation";
import { LineSegments } from "@phosphor-icons/react/dist/ssr/LineSegments";

const NoteMap = async ({noteId}:PostsProps) => {
  // const [isOpen, setIsOpen] = useState(0);
  // const openMap = () => {
  //   setIsOpen(1);
  // };

  // const currentPath = usePathname();
  let isOpen = 0;

  const Map = React.useMemo(
    () =>
      dynamic(() => import("@/components/map/Map"), { //SSR停止　window error防止
        loading: () => <p>map is loading</p>,
        ssr: false,
      }),
    []
  );

  const { posts, polylineCoordinates } = await getNotePoints(noteId);

  // if (isOpen === 0) {
  return(
    <button
    className="bg-red-400 rounded-full p-2 m-2 border-black border-2"
  >
    <LineSegments size={32} color="#050505" weight="duotone" />
  </button>
  )
// }

  return (
    <div className={`${isOpen ? "absolute" : "hidden"}`}>
    <div className="w-full h-[100vh]">
      <div className="w-[80%] h-[80vh]">
        <Map posts={posts} polylineCoordinates={polylineCoordinates} />
      </div>
    </div>
    </div>
  );
};

export default NoteMap;

