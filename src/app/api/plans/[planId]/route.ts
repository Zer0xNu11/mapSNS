import { auth } from "@/auth"
import { prismadb } from "@/globals/db"
import { NextRequest, NextResponse } from "next/server"

export const DELETE = async(req: NextRequest, {params}:{params:{planId: string}}) =>{
  console.log('====== APIconect plan id DELETE ========')
  const session = await auth()
  const userId = session?.user?.id  
try{

  if(!userId){throw new Error}

 const plan = await prismadb.plan.findUnique({
    where:{
      id: params.planId
    },
    include: {
      user:{
        select: {
          id: true,
        }
      }
    }
  });

  if(userId !== plan?.userId){throw new Error}

  await prismadb.$transaction(async (tx) => {
    await tx.plan.deleteMany({where: {id: params.planId}});
  });

//  const redirectUrl = new URL('/home', req.url);
//   return NextResponse.redirect(redirectUrl);
return NextResponse.json({message:'削除成功'})

}catch(err){
  return NextResponse.json({message:'削除失敗', ERROR:err})
}

}

export const dynamic = 'force-dynamic' //キャッシュを無視する設定