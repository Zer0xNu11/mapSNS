import { auth } from "@/auth";
import { prismadb } from "@/globals/db";
import { NextRequest, NextResponse } from "next/server";

export const GET =  async (_: NextRequest) => {
  console.log('======APIconect GetDeleteData========')
  const session = await auth()
  const userId = session?.user?.id  
  try {
    if(userId){
      const userData = await prismadb.user.findUnique({
        where: {id: userId} 
      });
      console.log({role:userData?.role})
      if(userData?.role !== 'ADM' ){throw new Error('不正なアクセスを検知')} 
    }
    else{throw new Error('不正なアクセスを検知')}

    await prismadb.$transaction(async (tx) => {
      await tx.like.deleteMany({where: {}});
      await tx.post.deleteMany({where: {}});
      await tx.note.deleteMany({where: {}});
    });
    return NextResponse.json({message:'成功'})
    //jsonレスポンス
  } catch (err) {
    console.log({err:err});
    return NextResponse.json({message:'失敗', ERROR:err})
  }
};

export const dynamic = 'force-dynamic' //キャッシュを無視する設定