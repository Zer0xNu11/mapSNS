import { prismadb } from "@/globals/db";
import { auth } from "@/auth";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart } from "@phosphor-icons/react/dist/ssr/Heart";
import { X } from "@phosphor-icons/react/dist/ssr/X";
import { Notebook } from "@phosphor-icons/react/dist/ssr/Notebook";
import { MapPin } from "@phosphor-icons/react/dist/ssr/MapPin";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const UserPage = async ({ params }: { params: { userId: string } }) => {
  const currentPath = `${process.env.NEXT_PUBLIC_BASE_URL}/home`;
  const session = await auth();
  const userId = params.userId;

  const data = await getUserData(userId);

  async function getUserData(userId: string) {
    const result = await prismadb.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
        imageUrl: true,
        posts: {
          select: {
            id: true,
            totalLikes: true,
          },
        },
        _count: {
          select: {
            posts: true,
            notes: true,
          },
        },
      },
    });

    if (!result) {
      return null;
    }

    const totalLikesSum = result.posts.reduce(
      (sum, post) => sum + post.totalLikes,
      0
    );

    return {
      userId: result.id,
      userName: result.name,
      imageUrl: result.imageUrl,
      postCount: result._count.posts,
      noteCount: result._count.notes,
      totalLikesSum,
      averageLikesPerPost:
        result._count.posts > 0 ? totalLikesSum / result._count.posts : 0,
    };
  }

  if (!data) {
    return <div>存在しないアカウントです</div>;
  }

  // const planPoint = {
  //   ...data,
  //   createdAt: data.createdAt.toISOString(),
  //   updatedAt: data.updatedAt.toISOString(),
  //   content: data.content ?? undefined,
  //   imageUrl: data.imageUrl ?? undefined,
  //   postId: data.postId ?? undefined,
  // }

  // const isOwn = userId === planPoint.user.id ? true : false;

  return (
    <>
      <div className="relative bg-gray-500 w-full h-full  text-white">
      <Link href={currentPath} className="absolute m-4">
        <Button>←戻る</Button>
      </Link>
        <div className=" h-[100vh] flex flex-col items-center justify-center">
          <Avatar className="w-64 h-64">
            <AvatarImage src={data.imageUrl || "/images/placeholder.png"} />
          </Avatar>

          <div className="text-4xl mt-4 mb-2"> {`${data.userName}`}</div>
          <div className="text-gray-400">ID: {`${data.userId}`}</div>
          <div>
            <div className="flex gap-2 items-center my-1">
              <label className="w-14">Hearts</label>
              <div className="flex gap-2 items-center my-1">
                <Heart size={32} color="#ff6666" weight="fill" />
                <X size={20} color="#faf4f4" />
                {`${data?.totalLikesSum}`}
              </div>
            </div>
            <div className="flex gap-2 items-center my-1">
              <label className="w-14">Notes </label>
              <div className="flex gap-2 items-center my-1">
                <Notebook size={32} color="#fdff8f" weight="fill" />
                <X size={20} color="#faf4f4" />
                {`${data?.noteCount}`}
              </div>
            </div>
            <div className="flex gap-2 items-center my-1">
              <label className="w-14">Posts</label>
              <div className="flex gap-2 items-center my-1">
                <MapPin size={32} color="#9fff85" weight="fill" />
                <X size={20} color="#faf4f4" />
                {`${data?.postCount}`}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserPage;
