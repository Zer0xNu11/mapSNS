import { auth } from "@/auth";
import { prismadb } from "@/globals/db";
import { NextResponse } from "next/server";


export const GET = async (postId : string) => {
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
    return NextResponse.json({message:'成功', data: isLiked})

  } catch (err) {
    console.log(err);
    return NextResponse.json({message:'失敗'})
  }
};

export const dynamic = 'force-dynamic' //キャッシュを無視する設定



