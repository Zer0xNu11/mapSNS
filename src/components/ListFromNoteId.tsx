import React from 'react'
import Posts from './Post/Posts'
import { getNotePosts } from '@/lib/getPosts';

export interface NoteIdProps{
  noteId: string;
}

const ListFromNoteId = async ({noteId}:NoteIdProps) => {
  const posts = await getNotePosts(noteId);

  return (
    <div className="min-h-screen bg-gray-100">
    <main className="container mx-auto py-4">
      <Posts posts = {posts}/>
    </main>
  </div>
  )
}

export default ListFromNoteId