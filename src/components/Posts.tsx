import React from 'react'
import Post from './Post'
import { PostType } from '@/types'

const getLatestPosts = async () : Promise<PostType[]> => {
  const response = await fetch(`${process.env.API_URL}/posts`,{
    cache:'no-store', //キャッシュ無効化のオプション
  });
  console.log('Fetching URL:', response);

  if(response.status !== 200){
    throw new Error();
  }

  const data = await response.json();
  return data.data as PostType[];
}

export default async function Posts(){
  const posts = await getLatestPosts();

  return (
    <>
      {posts.map((post)=><Post key={post.id} post={post} />)}
    </>
  )
}
