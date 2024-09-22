import { prismadb } from "@/globals/db";
import { NextRequest, NextResponse } from "next/server";

export const GET =  async (_: NextRequest) => {
  console.log('====== APIconect getPosts cratedAt ========')
  try {
    const latestPosts = await prismadb.post.findMany({
      take: 100,
      orderBy: { createdAt: "desc" },
      include: {
        author:{
          select: {
            id: true,
            name: true,
            email: true,
            imageUrl: true,
          }
        },
        note: true
      }
    });
    return NextResponse.json({message:'成功', data: latestPosts})
    //jsonレスポンス
  } catch (err) {
    // console.log({});
    return NextResponse.json({message:'失敗', ERROR:err})
  }
};

export const dynamic = 'force-dynamic' //キャッシュを無視する設定