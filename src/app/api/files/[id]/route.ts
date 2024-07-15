import { prismadb } from "@/globals/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (_: NextRequest, {params}: {params:{id: string}}) =>{

  try{
    // const record = await prismadb.record.findById(params.id);
    const task = 5 //ダミー

    if(!task){
      return NextResponse.json(
      {message:'タスクが存在しません'},
      {status: 404}
      );
    }
    return NextResponse.json({message:"タスク取得成功", task})
  }catch(error){
    return NextResponse.json({message:"タスク取得失敗"},{status:500});
  }
};

export const dynamic = 'force-dynamic';