import { auth } from "@/auth";
import { prismadb } from "@/globals/db";
import { NextRequest, NextResponse } from "next/server";

interface dataModel {
  userExists: boolean | null;
  countLikes: number | undefined;
}

export const GET =  async (_: NextRequest, {params}:{params:{postId: string}}) => {
  console.log('======APIconect Like========')
  const session = await auth()
  const userId = session?.user?.id;
  const postId = params.postId
  try {
    if (!userId) {
      throw new Error("ユーザーの値が異常です");
    }

    const datatx = await prismadb.$transaction(async (tx) => {
      const existingLike = await tx.like.findUnique({
        where: {
          userId_postId: {
            userId: userId,
            postId: postId,
          },
        },
      });

      const post = await tx.post.findUnique({
        where: {
          id: postId,
        },
      });

      if (!post) {
        throw new Error("invalid ID");
      }

      const data: dataModel = {
        userExists: existingLike ? true : false,
        countLikes: post?.totalLikes,
      };

      return data;
    });
    return NextResponse.json({message:'成功', data: datatx})
  } catch (err) {
    // console.log({});
    return NextResponse.json({message:'いいねできない', ERROR:err})
  }
};

export const dynamic = 'force-dynamic' //キャッシュを無視する設定