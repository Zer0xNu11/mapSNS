import { auth } from "@/auth";
import { prismadb } from "@/globals/db";
import { NextRequest, NextResponse } from "next/server";

export const GET =  async (_: NextRequest, {}:{params:{id: string}}) => {
  console.log('======APIconect========')
  try {
    const session = await auth();
    const userId = session?.user?.id
    if(userId){
    const latestPlan = await prismadb.plan.findMany({
      where:{
        userId: userId
      },
      orderBy: { createdAt: "desc" },
      include: {
        user:true,
      }
    });
    return NextResponse.json({message:'成功', data: latestPlan})
    }
    return new Error('ユーザーが見つかりません')
  } catch (err) {
    // console.log({});
    return NextResponse.json({message:'失敗', ERROR:err})
  }
};

export const dynamic = 'force-dynamic' //キャッシュを無視する設定