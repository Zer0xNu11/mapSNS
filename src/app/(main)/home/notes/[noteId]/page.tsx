import NoteMain from "@/components/map/noteMap/noteMain";
import React from "react";

interface Params {
  params: { noteId: string };
}


const NotePage = async ({ params }: Params) => {
  const noteId = params.noteId;
  
  try {
    return (
      <>
        {/* <div>NotePage{` ${note.title}`} totalLike{`${note.totalLikes}`}</div> */}
        <NoteMain noteId={noteId}/>
      </>
    );
  } catch (err) {
    console.log(err);
  }
};

export default NotePage;
