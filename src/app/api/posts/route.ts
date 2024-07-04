import { prismadb } from "@/globals/db";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const latestPosts = await prismadb.post.findMany({
      take: 10,
      orderBy: { createdAt: "desc" },
      include: {
        author:true,
      }
    });
    return NextResponse.json({message:'load done', data: latestPosts})
    //jsonレスポンス
  } catch (err) {
    console.log(err);
    return NextResponse.json({message:'load done'})
  }
};

export const dynamic = 'force-dynamic' //キャッシュを無視する設定