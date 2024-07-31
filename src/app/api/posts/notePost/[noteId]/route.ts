import { prismadb } from "@/globals/db";
import { NextRequest, NextResponse } from "next/server";

export const GET =  async (_: NextRequest, {params}:{params:{noteId: string}}) => {
  console.log('======APIconect========')
  try {
    console.log({params:params})
    const notePosts = await prismadb.post.findMany({
      where:{
        noteId: params.noteId
      },
      orderBy: { createdAt: "desc" },
      include: {
        author:true,
        note: true
      }
    });
    return NextResponse.json({message:'成功', data: notePosts})
    //jsonレスポンス
  } catch (err) {
    // console.log({});
    return NextResponse.json({message:'失敗', ERROR:err})
  }
};

export const dynamic = 'force-dynamic' //キャッシュを無視する設定