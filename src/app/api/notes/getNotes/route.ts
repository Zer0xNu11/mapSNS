import { auth } from "@/auth";
import { prismadb } from "@/globals/db";
import { NextRequest, NextResponse } from "next/server";

export const GET =  async (_: NextRequest) => {
  console.log('====== APIconect getNotes ========')
    const session = await auth();
    console.log({session:session})
    const userId = session?.user?.id
  try {
    
    if (!userId) {
      return NextResponse.json({ message: 'ユーザーが認証されていません' }, { status: 401 });
    }

    const latestNotes = await prismadb.note.findMany({
      where:{
        authorId: userId
      },
      orderBy: { createdAt: "desc" },
      include: {
        author:true,
      }
    });
    
    return NextResponse.json({message:'成功', data: latestNotes, status:200})

  } catch (err) {
    // console.log({});
    return NextResponse.json({message:'失敗', ERROR:err})
  }
};

export const dynamic = 'force-dynamic' //キャッシュを無視する設定

