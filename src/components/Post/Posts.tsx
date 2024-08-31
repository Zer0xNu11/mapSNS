// Posts.tsx
"use client";
import React, { useEffect, useRef } from "react";
import Post from "./Post";
import { PostType } from "@/types";
import {useListDisplayMode, useSelectedPostStore } from "@/store";

export interface PostsProps {
  posts: PostType[];
}

export default function Posts({ posts }: PostsProps) {
  const { selectedPostId } = useSelectedPostStore();
  const {listDisplayMode, setListDisplayMode} = useListDisplayMode();


  const postsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedPostId && postsRef.current) {
      const selectedPost = postsRef.current.querySelector(
        `[data-post-id="${selectedPostId}"]`
      );
      if (selectedPost && listDisplayMode ==='list') {
        selectedPost.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [selectedPostId]);

  return (
    <>
      <div ref={postsRef}>
        {posts
          ? posts.map((post) => <Post key={post.id} post={post} />)
          : "No post"}
      </div>
    </>
  );
}

// 'use client'
// import React from 'react'
// import Post from './Post'
// import {PostType } from '@/types'
// import { SessionProvider } from 'next-auth/react';

// export interface PostsProps{
//   posts: PostType[];
// }

// export default function Posts({posts}:PostsProps){

//   return (
//     <>
//       {posts ? posts.map((post)=><Post key={post.id} post={post}/>) : 'No post'}
//     </>
//   )
// }
