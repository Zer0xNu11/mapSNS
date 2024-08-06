import { PostType } from "@/types";
import { auth } from "@/auth";
import { prismadb } from "@/globals/db";
import { PostLikeIcon } from "./PostLikeIcon";
import Image from "next/image";

export interface PostProps {
  post: PostType;
  isLiked?: boolean;
  countLikes? : number;
  imageUrl? : string;
}

interface dataModel{
  userExists : object | null,
  countLikes : number | undefined,
}

const getIsLiked = async (postId: string) => {
  console.log({postId : postId})
  const session = await auth();
  const userId = session?.user?.id
  

  try {
    if (!userId) {
      throw new Error("ユーザーの値が異常です");
    }

    const existingLike = await prismadb.like.findUnique({
      where: {
        userId_postId: {
          userId: userId,
          postId: postId,
        },
      },
    })

    const post = await prismadb.post.findUnique({
      where: {
          id: postId,
        },
    })



  //     if(!post){
  //       throw new Error('invalid ID')
  //     }

  //     const userExists = post?.likedIds.includes(userId) ?? false;
  //     const countLikes = post?.likedIds.length

      const data : dataModel = {
        userExists : existingLike,
        countLikes : post?.totalLikes,
      }

  //     console.log({
  //       postId : post.id,
  //       userExists : userExists,
  //       countLikes : countLikes,
  //     })

      return data;
      
      
  //   }
  } catch (err) {
    console.log("いいねできない");
    console.log(err)
    return err;
  }

}



const Post: React.FC<PostProps> = async ({post}) => {
  // const isLiked = await getIsLiked(post.id);
  const data = await getIsLiked(post.id);
  const {userExists, countLikes} = data as dataModel
  const isLiked = userExists? true : false;
  

  console.log({ isLiked: isLiked });

  return (
    <>
    <div className="bg-white shadow-md rounded p-4 mb-4 flex flex-row justify-between h-[20vh]">
      <div className="mb-4 w-1/2 h-full">
        <div className="flex items-center mb-2">
          <Image
            className="w-10 h-10 rounded-full mr-2"
            src='/images/placeholder.png'
            width='100'
            height='100'
            alt="User Avatar"
          />
          <div>
            <h2 className="font-semibold text-md">{post.author?.name}</h2>
            <p className="text-gray-500 text-sm ">
              {new Date(post.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
        <p className="text-gray-700 break-all">{post.content}</p>
        <PostLikeIcon post={post} isLiked={isLiked} countLikes={countLikes}/>
      </div>
      <div className="w-1/2 h-full items-center">
        <img
            className="mr-2 object-contain h-full"
            src={post.imageUrl || '/images/blank.png'}
            alt="User Avatar"
          />
      </div>
      
    </div>
    </>
  );
};

export default Post;
