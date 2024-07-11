import React from 'react'
import Post from './Post'
import { PostType } from '@/types'
import { SessionProvider } from 'next-auth/react';

const getLatestPosts = async () : Promise<PostType[]> => {
  const response = await fetch(`${process.env.API_URL}/posts`,{
    cache:'no-store', //キャッシュ無効化のオプション
  });
  // console.log('Fetching URL:', response);

  if(response.status !== 200){
    throw new Error();
  }

  const data = await response.json();
  console.log({data: data})
  return data.data as PostType[];
}

export default async function Posts(){
  const posts = await getLatestPosts();

  return (
    <>
      {posts ? posts.map((post)=><Post key={post.id} post={post}/>) : 'No post'}
    </>
  )
}