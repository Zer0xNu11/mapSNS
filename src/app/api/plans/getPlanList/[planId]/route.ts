import { prismadb } from "@/globals/db";
import { NextRequest, NextResponse } from "next/server";

export const GET =  async (_: NextRequest, {params}:{params:{planId: string}}) => {
  console.log('======APIconect getPlanList========')
  try {
    console.log({params:params})
    const planListData = await prismadb.planPoint.findMany({
      where:{
        planId: params.planId
      },
      orderBy: {
        order: 'asc'
      }
    });
    console.log({planListData:planListData})
    return NextResponse.json({message:'成功', data: planListData})
    //jsonレスポンス
  } catch (err) {
    // console.log({});
    return NextResponse.json({message:'失敗', ERROR:err})
  }
};

export const dynamic = 'force-dynamic' //キャッシュを無視する設定