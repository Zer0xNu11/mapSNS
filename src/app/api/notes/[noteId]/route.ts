import { auth } from "@/auth"
import { prismadb } from "@/globals/db"
import { NextRequest, NextResponse } from "next/server"

export const DELETE = async(req: NextRequest, {params}:{params:{noteId: string}}) =>{
  console.log('====== APIconect Note id DELETE ========')
  const session = await auth()
  const userId = session?.user?.id  
try{

  if(!userId){throw new Error}

 const note = await prismadb.note.findUnique({
    where:{
      id: params.noteId
    },
    include: {
      author:{
        select: {
          id: true,
        }
      }
    }
  });

  if(userId !== note?.authorId){throw new Error}

  await prismadb.$transaction(async (tx) => {
    await tx.note.deleteMany({where: {id: params.noteId}});
  });

//  const redirectUrl = new URL('/home', req.url);
//   return NextResponse.redirect(redirectUrl);
return NextResponse.json({message:'削除成功'})

}catch(err){
  return NextResponse.json({message:'削除失敗', ERROR:err})
}

}

export const dynamic = 'force-dynamic' //キャッシュを無視する設定