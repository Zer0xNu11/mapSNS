import { prismadb } from "@/globals/db";
import { auth } from "@/auth";
import PostDetail from "@/components/Post/PostDetail";

const DetailPost = async ({
  params,
}: {
  params: { postId: string };
}) => {
  console.log("====== Detail Post========");
  const session = await auth();
  const userId = session?.user?.id;

  const data = await prismadb.post.findUnique({
    where: {
      id: params.postId,
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
          imageUrl: true,
        },
      },
      note: true,
    },
  });


  if (!data) {
    return <div>存在しない投稿です</div>;
  }

  const post = {
    ...data, 
    createdAt: data.createdAt.toISOString(),
    updatedAt: data.updatedAt.toISOString(),
    content: data.content ?? undefined,
    imageUrl: data.imageUrl ?? undefined,  
  }

  const isOwn = userId === post.authorId ? true : false;

  return (
    <>
    <PostDetail post = {post} isOwn = {isOwn} path={'/home'}/>
    </>
  );
};

export default DetailPost;
