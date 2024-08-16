import React from 'react'
import Post from './Post'
import { NoteType, PostLeafletType, PostType } from '@/types'
import { auth } from '@/auth'
import { getNotePosts } from '@/lib/getPosts';

export interface PostsProps{
  posts: PostType[];
}

export default async function Posts({posts}:PostsProps){

  return (
    <>
      {posts ? posts.map((post)=><Post key={post.id} post={post}/>) : 'No post'}
    </>
  )
}
