import { prismadb } from "@/globals/db";
import { NextRequest, NextResponse } from "next/server";

export const GET =  async (_: NextRequest, {params}:{params:{id: string}}) => {
  console.log('======APIconect========')
  try {
    console.log({params:params})
    const latestPlan = await prismadb.plan.findMany({
      where:{
        userId: params.id
      },
      orderBy: { createdAt: "desc" },
      include: {
        user:true,
      }
    });
    return NextResponse.json({message:'成功', data: latestPlan})
    //jsonレスポンス
  } catch (err) {
    // console.log({});
    return NextResponse.json({message:'失敗', ERROR:err})
  }
};

export const dynamic = 'force-dynamic' //キャッシュを無視する設定