import { prismadb } from "@/globals/db";
import { NextRequest, NextResponse } from "next/server";

export const GET =  async (_: NextRequest, {params}:{params:{id: string}}) => {
  console.log('====== APIconect books id ========')
  try {
    console.log({params:params})
    const latestBooks = await prismadb.book.findMany({
      where:{
        authorId: params.id
      },
      orderBy: { createdAt: "desc" },
      include: {
        author:true,
      }
    });
    return NextResponse.json({message:'成功', data: latestBooks})
    //jsonレスポンス
  } catch (err) {
    // console.log({});
    return NextResponse.json({message:'失敗', ERROR:err})
  }
};

export const dynamic = 'force-dynamic' //キャッシュを無視する設定