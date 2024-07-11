import { auth } from "@/auth";
import { prismadb } from "@/globals/db";

export async function likeHandler(toggle: string, postId: string, formData: FormData) {
  const session = await auth();
  try {
    if (session?.user?.id) {
      if (postId !== 'string') {
        return new Error('invalid ID');
      }

      const post = await prismadb.post.findUnique({
        where:{
          id: postId
        }
      });

      if(!post){
        throw new Error('invalid ID')
      }

      let updatedLikedIds = [...(post.likedIds || [])]

      if(toggle === 'like'){
        updatedLikedIds.push(session.user.id);
      }


      if(toggle === 'unlike'){
        updatedLikedIds = updatedLikedIds.filter((likedId)=> likedId !== session.user?.id);
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
