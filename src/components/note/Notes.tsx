import React from 'react'
import { NoteType} from '@/types'
import { auth } from '@/auth'
import Note from './Note';


const getLatestnotes = async (id : string) : Promise<NoteType[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notes/${id}`,{
    cache:'no-store', //キャッシュ無効化のオプション
  });
  // console.log('Fetching URL:', response);

  if(response.status !== 200){
    throw new Error('不正な値です');
  }

  const data = await response.json();
  console.log({data: data})
  return data.data as NoteType[];
}

export default async function Notes(){
  const session = await auth();
  const userId = session?.user?.id
  const notes = userId? await getLatestnotes(userId) : null;

  return (
    <>
      {notes ? notes.map((note)=><Note key={note.id} note={note}/>) : 'No note'}
    </>
  )
}
