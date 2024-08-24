'use client'
import { PostType } from '@/types';
import React, { useEffect, useState } from 'react'
import { IoIosHeartEmpty } from "react-icons/io";
import { IoIosHeart } from "react-icons/io";
import { PostProps } from './Post';
import { likeHandler } from '@/actions/likeHandler';
import { getIsLiked } from '@/lib/getlikes';

interface dataModel {
  userExists: boolean | null;
  countLikes: number | undefined;
}


export function PostLikeIcon({post} : PostProps){
 if(!post.id){throw new Error('存在しない投稿です')}

 const postId = post.id
 const likeHandlerWithPostId = likeHandler.bind(null, postId)

  const [like, setLike] = useState<boolean | null>();
  const [countLike, setCountLike] = useState<number | undefined>()

  useEffect(()=>{
    const initialize = async () =>{
      const data = await getIsLiked(post.id);
      console.log({ data: data.data });
      const { userExists, countLikes } = data.data as dataModel;
      setLike(userExists);
      console.log({userExists:userExists})
      console.log({like:like})
      setCountLike(countLikes);
      console.log({countLikes:countLikes})
     }
  
     initialize();
  
    },[])

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