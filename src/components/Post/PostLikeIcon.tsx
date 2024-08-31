'use client'
import React, { useEffect, useState } from 'react'
import { IoIosHeartEmpty } from "react-icons/io";
import { PostProps } from './Post';
import { likeHandler } from '@/actions/likeHandler';
import { getIsLiked } from '@/lib/getlikes';
import { Heart } from 'lucide-react';

interface dataModel {
  userExists: boolean | null;
  countLikes: number | undefined;
}


export function PostLikeIcon({post} : PostProps){
 if(!post.id){throw new Error('存在しない投稿です')}

 const postId = post.id
 const likeHandlerWithPostId = likeHandler.bind(null, postId)

  const [like, setLike] = useState<boolean | null>(null);
  const [countLike, setCountLike] = useState<number | undefined>(undefined)
  const [retryInit, setRetryInit] = useState<number>(0);


  const onClick = () =>{
    if(like){setLike(false); setCountLike(countLike? countLike - 1 : 0); }
    else {setLike(true); setCountLike(countLike? countLike + 1 : 1);} 
  }


  useEffect(()=>{
    const initialize = async () =>{
      const data = await getIsLiked(post.id);
      console.log({ datadata: data.data });
      if(data.data === undefined){
        setRetryInit(retryInit+1)
        console.log(retryInit);
        return;
      }
      const { userExists, countLikes } = data.data as dataModel;
      setLike(userExists);
      console.log({userExists:userExists})
      console.log({like:like})
      setCountLike(countLikes);
      console.log({countLikes:countLikes})
     }
  
     initialize();
  
    },[retryInit])



  return (
    <div>
      <form action={likeHandlerWithPostId}>
        <div className='flex items-center'>
        <div className='block mr-1 text-gray-700'>{`${countLike || 0}`}</div>
      <button onClick={onClick}>
      {<Heart
        className={`transition-all duration-300 ease-in-out ${
          like ? 'text-red-500 fill-current' : 'text-gray-400 fill-current'
        }`}
        size={20}
      /> }
      </button>
      
        </div>
      </form>
          
    </div>
  )
}