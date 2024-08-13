import { prismadb } from "@/globals/db";
import { NextRequest, NextResponse } from "next/server";

export const GET =  async (_: NextRequest, {params}:{params:{planId: string}}) => {
  console.log('======APIconect========')
  try {
    console.log({params:params})
    const planData = await prismadb.plan.findUnique({
      where:{
        id: params.planId
      },
    });
    return NextResponse.json({message:'成功', data: planData})
    //jsonレスポンス
  } catch (err) {
    // console.log({});
    return NextResponse.json({message:'失敗', ERROR:err})
  }
};

export const dynamic = 'force-dynamic' //キャッシュを無視する設定