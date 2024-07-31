import PostForm from "@/components/Post/PostForm";
import Timeline from "@/components/Timeline";
import { Button } from "@/components/ui/button";
import { NoteType } from "@/types";
import Link from "next/link";
import React, { useState } from "react";

interface Params {
  params: { noteId: string };
}

const getNoteData = async (noteId : string) : Promise<NoteType> => {
  const response = await fetch(`${process.env.API_URL}/notes/getNoteData/${noteId}`,{
    cache:'no-store', //キャッシュ無効化のオプション
  });
  // console.log('Fetching URL:', response);

  if(response.status !== 200){
    throw new Error('不正な値です');
  }

  const data = await response.json();
  console.log({data: data})
  return data.data as NoteType;
}



const NotePage = async ({ params }: Params) => {
  const noteId = params.noteId;
  const note = await getNoteData(noteId)
  console.log({noteData:note})

  return (
    <>
      <div>NotePage{` ${note.title}`}</div>
        <PostForm note = {note}/> 
      <Timeline noteId = {noteId}/>
    </>
  );
};

export default NotePage;


// return (
//   <>
//     <div>NotePage</div>
//     <Link href={`${process.env.BASE_URL}/create/post`}>
//       <Button>投稿</Button>
//     </Link>  
//     <Timeline />
//   </>
// );