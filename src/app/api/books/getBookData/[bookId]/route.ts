import { prismadb } from "@/globals/db";
import { NextRequest, NextResponse } from "next/server";

export const GET =  async (_: NextRequest, {params}:{params:{bookId: string}}) => {
  console.log('====== APIconect getBookData ========')
  try {
    console.log({params:params})
    const bookData = await prismadb.book.findUnique({
      where:{
        id: params.bookId
      },
    });
    return NextResponse.json({message:'成功', data: bookData})
    //jsonレスポンス
  } catch (err) {
    // console.log({});
    return NextResponse.json({message:'失敗', ERROR:err})
  }
};

export const dynamic = 'force-dynamic' //キャッシュを無視する設定