'use client'
import { PostType } from '@/types';
import React, { useState } from 'react'
import { IoIosHeartEmpty } from "react-icons/io";
import { IoIosHeart } from "react-icons/io";
import { PostProps } from './Post';
import { likeHandler } from '@/actions/likeHandler';


export  function PostLikeIcon({post, isLiked, countLikes} : PostProps){
 if(!post.id){throw new Error('存在しない投稿です')}
 const postId = post.id
 const likeHandlerWithPostId = likeHandler.bind(null, postId)

  const [like, setLike] = useState(isLiked);
  const [countLike, setCountLike] = useState(countLikes)
  const onClick = () =>{
    if(like){setLike(false); setCountLike(countLike? countLike - 1 : 0); }
    else {setLike(true); setCountLike(countLike? countLike + 1 : 1);} 
  }
  // const [state, formAction] = useFormState(postLike, initState);

  return (
    <div>
      <form action={likeHandlerWithPostId}>
        <div className='flex '>
      <button onClick={onClick}>
      {like ? <IoIosHeart color={'#fa5263'}/> : <IoIosHeartEmpty/> }
      </button>
      <div>{`${countLike || 0}`}</div>
        </div>
      </form>
          
    </div>
  )
}