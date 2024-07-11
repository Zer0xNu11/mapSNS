'use server'

import { auth } from "@/auth";
import { prismadb } from "@/globals/db";

export async function likeHandler(postId: string) {
  console.log({postId : postId})
  const session = await auth();
  const userId = session?.user?.id
  try {
    if (userId) { 
      if (!postId) {
        console.log('無効な投稿')
        return ''
      }
      const post = await prismadb.post.findUnique({
        where:{
          id: postId
        }
      });


      if(!post){
        throw new Error('invalid ID')
      }

      const userExists = post?.likedIds.includes(userId) ?? false;
      console.log({
        userExists : userExists,
        postId : post.id
      })

      let updatedLikedIds = [...(post.likedIds || [])]

      if(userExists === false){
        updatedLikedIds.push(userId);
      }


      if(userExists === true){
        updatedLikedIds = updatedLikedIds.filter((likedId)=> likedId !== userId);
      }
      
      const updatedPost = await prismadb.post.update({
        where:{
          id: postId
        },
        data:{
          likedIds: updatedLikedIds
        }
      });
      
    }
  } catch (err) {
    console.log("いいねできない");
    return err;
  }
}
