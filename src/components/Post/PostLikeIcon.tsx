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
  // const [state, formAction] = useFormState(postLike, initState);

  return (
    <div>
      <form action={likeHandlerWithPostId}>
        <div className='flex '>
      <button>
      {like ? <IoIosHeart color={'#fa5263'}/> : <IoIosHeartEmpty/> }
      </button>
      <div>{`${countLikes}`}</div>
        </div>
      </form>
          
    </div>
  )
}