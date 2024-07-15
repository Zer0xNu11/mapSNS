import { PostType } from "@/types";
import { auth } from "@/auth";
import { prismadb } from "@/globals/db";
import { PostLikeIcon } from "./PostLikeIcon";
import Image from "next/image";
import VoiceButton from "../VoiceButton";

export interface PostProps {
  post: PostType;
  isLiked?: boolean;
  countLikes? : number
}

interface dataModel{
  userExists : boolean,
  countLikes : number,
}

const getIsLiked = async (postId: string) => {
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
      const countLikes = post?.likedIds.length

      const data : dataModel = {
        userExists : userExists,
        countLikes : countLikes,
      }

      console.log({
        postId : post.id,
        userExists : userExists,
        countLikes : countLikes,
      })

      return data;
      
      
    }
  } catch (err) {
    console.log("いいねできない");
    return err;
  }

}



const Post: React.FC<PostProps> = async ({post}) => {
  // const isLiked = await getIsLiked(post.id);
  const data : dataModel = await getIsLiked(post.id) as dataModel;
  const {userExists, countLikes} = data
  const isLiked = userExists;
  

  console.log({ isLiked: isLiked });

  return (
    <div className="bg-white shadow-md rounded p-4 mb-4">
      <div className="mb-4">
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
        <PostLikeIcon post={post} isLiked={!!isLiked} countLikes={countLikes}/>
        <VoiceButton text={post.content as string}/>
        
      </div>
    </div>
  );
};

export default Post;
