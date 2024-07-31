import React from 'react'
import Post from './Post'
import { NoteType, PostType } from '@/types'
import { auth } from '@/auth'
import {getLatestPosts, getNotePost} from '@/lib/getPosts' 

export interface PostsProps{
  noteId: string;
}

export default async function Posts({noteId}:PostsProps){
  const session = await auth();
  // console.log({sessionPosts:session}) ok
  const userId = session?.user?.id
  const posts = userId? await getNotePost(noteId) : null;

  return (
    <>
      {posts ? posts.map((post)=><Post key={post.id} post={post}/>) : 'No post'}
    </>
  )
}
