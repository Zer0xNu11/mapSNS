import { auth } from "@/auth";
import { prismadb } from "@/globals/db";
import { NextRequest, NextResponse } from "next/server";


export const GET =  async (_: NextRequest, {params}:{params:{planPointId: string}}) => {
  console.log('====== APIconect Posts id GET ========')
  try {
    console.log({params:params})
    const selectedPost = await prismadb.planPoint.findUnique({
      where:{
        id: params.planPointId
      },
      include: {
        user:{
          select: {
            id: true,
            name: true,
            email: true,
            imageUrl: true,
          }
        },
      }
    });
    return NextResponse.json({message:'成功', data: selectedPost})
    //jsonレスポンス
  } catch (err) {
    // console.log({});
    return NextResponse.json({message:'失敗', ERROR:err})
  }
};

export const DELETE = async(req: NextRequest, {params}:{params:{planPointId: string}}) =>{
  console.log('====== APIconect PlanPoints id DELETE ========')
  const session = await auth()
  const userId = session?.user?.id  
try{

  if(!userId){throw new Error}

 const planPoint = await prismadb.planPoint.findUnique({
    where:{
      id: params.planPointId
    },
    include: {
      user:{
        select: {
          id: true,
        }
      }
    }
  });

  if(userId !== planPoint?.userId){throw new Error}

  await prismadb.$transaction(async (tx) => {
    // await tx.like.deleteMany({where: {id: params.planPointId }});
    await tx.planPoint.deleteMany({where: {id: params.planPointId}});
  });

//  const redirectUrl = new URL('/home', req.url);
//   return NextResponse.redirect(redirectUrl);
return NextResponse.json({message:'削除成功'})




}catch(err){
  return NextResponse.json({message:'削除失敗', ERROR:err})
}



}

export const dynamic = 'force-dynamic' //キャッシュを無視する設定