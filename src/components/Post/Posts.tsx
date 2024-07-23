import React from 'react'
import Post from './Post'
import { PostType } from '@/types'
import { auth } from '@/auth'


const getLatestPosts = async (id : string) : Promise<PostType[]> => {
  const response = await fetch(`${process.env.API_URL}/posts/${id}`,{
    cache:'no-store', //キャッシュ無効化のオプション
  });
  // console.log('Fetching URL:', response);

  if(response.status !== 200){
    throw new Error('不正な値です');
  }

  const data = await response.json();
  console.log({data: data})
  return data.data as PostType[];
}

export default async function Posts(){
  const session = await auth();
  // console.log({sessionPosts:session}) ok
  const userId = session?.user?.id
  const posts = userId? await getLatestPosts(userId) : null;

  return (
    <>
      {posts ? posts.map((post)=><Post key={post.id} post={post}/>) : 'No post'}
    </>
  )
}
