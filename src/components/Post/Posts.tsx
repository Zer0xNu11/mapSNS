'use client'
import React from 'react'
import Post from './Post'
import {PostType } from '@/types'
import { SessionProvider } from 'next-auth/react';

export interface PostsProps{
  posts: PostType[];
}

export default function Posts({posts}:PostsProps){

  return (
    <>
      {posts ? posts.map((post)=><Post key={post.id} post={post}/>) : 'No post'}
    </>
  )
}
