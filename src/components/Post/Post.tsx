import { PostType } from "@/types";
// import { PostLikeIcon } from "./PostLikeIcon";
import { auth } from "@/auth";
import { prismadb } from "@/globals/db";

export interface PostProps {
  post: PostType;
  isLiked?: boolean;
}

const getIsLiked = async (postId: string) => {
  const session = await auth();
  const userId = session?.user?.id;
  try {
    if(!userId){return new Error}
    const post = await prismadb.post.findUnique({
        where:{
          id: postId,
        }});
      
    const userExists = post?.likedIds.includes(userId) ?? false;

    const isLiked = userExists ? true : false;
    return isLiked;

  } catch (err) {
    console.log(err);
  }
}

const Post: React.FC<PostProps> = async ({post}) => {
  // const isLiked = await getIsLiked(post.id);
  const isLiked = true;
  console.log({ isLiked: isLiked });

  return (
    <div className="bg-white shadow-md rounded p-4 mb-4">
      <div className="mb-4">
        <div className="flex items-center mb-2">
          <img
            className="w-10 h-10 rounded-full mr-2"
            src="images/placeholder.png"
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
        {/* <PostLikeIcon post={post} isLiked={!!isLiked} /> */}
      </div>
    </div>
  );
};

export default Post;
