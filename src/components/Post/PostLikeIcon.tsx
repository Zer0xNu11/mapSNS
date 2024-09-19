'use client'
import React, { useEffect, useState } from 'react'
import { likeHandler } from '@/actions/likeHandler';
import { getIsLiked } from '@/lib/getlikes';
import { Heart } from 'lucide-react';
import { NoteSlotType, PostType } from '@/types';

// interface dataModel {
//   userExists: boolean | null;
//   countLikes: number | undefined;
// }

interface PostLikeIconProps {
  post: NoteSlotType;
}


export function PostLikeIcon({post} : PostLikeIconProps){
 if(!post.id){throw new Error('存在しない投稿です')}

 const postId = post.id
 const likeHandlerWithPostId = likeHandler.bind(null, postId)

  const [isLike, setIsLike] = useState<boolean | null>(post.isLiked);
  const [countLike, setCountLike] = useState<number | undefined>(post.totalLikes);
  const [retryInit, setRetryInit] = useState<number>(0);


  const onClick = () =>{
    if(isLike){setIsLike(false); setCountLike(countLike? countLike - 1 : 0); }
    else {setIsLike(true); setCountLike(countLike? countLike + 1 : 1);} 
  }


  // useEffect(()=>{
  //   const initialize = async () =>{
  //     const data = await getIsLiked(post.id);
  //     console.log({ datadata: data.data });
  //     if(isLike === false){
  //       setRetryInit(retryInit+1);
  //       console.log(retryInit);
  //       return;
  //     }
  //     const { userExists, countLikes } = data.data as dataModel;
  //     setIsLike(userExists);
  //     console.log({userExists:userExists})
  //     setCountLike(countLikes);
  //     console.log({countLikes:countLikes})
  //    }
  
  //    initialize();
  
  //   },[retryInit])



  return (
    <div>
      <form action={likeHandlerWithPostId}>
        <div className='flex items-center'>
        <div className='block mr-1 text-gray-700'>{`${countLike || 0}`}</div>
      <button onClick={onClick}>
      {<Heart
        className={`transition-all duration-300 ease-in-out ${
          isLike ? 'text-red-500 fill-current' : 'text-gray-400 fill-current'
        }`}
        size={20}
      /> }
      </button>
      
        </div>
      </form>
          
    </div>
  )
}