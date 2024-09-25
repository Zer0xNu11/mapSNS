import { auth } from "@/auth";
import { prismadb } from "@/globals/db";
import { NextRequest, NextResponse } from "next/server";

export const GET =  async (_: NextRequest, {params}:{params:{postId: string}}) => {
  console.log('====== APIconect Posts id GET ========')
  try {
    console.log({params:params})
    const latestPosts = await prismadb.post.findUnique({
      where:{
        id: params.postId
      },
      include: {
        author:{
          select: {
            id: true,
            name: true,
            email: true,
            imageUrl: true,
          }
        },
        note: true
      }
    });
    return NextResponse.json({message:'成功', data: latestPosts})
    //jsonレスポンス
  } catch (err) {
    // console.log({});
    return NextResponse.json({message:'失敗', ERROR:err})
  }
};

export const DELETE = async(req: NextRequest, {params}:{params:{postId: string}}) =>{
  console.log('====== APIconect Posts id DELETE ========')
  const session = await auth()
  const userId = session?.user?.id  
try{

  if(!userId){throw new Error}

 const post = await prismadb.post.findUnique({
    where:{
      id: params.postId
    },
    include: {
      author:{
        select: {
          id: true,
        }
      }
    }
  });

  if(userId !== post?.authorId){throw new Error}

  await prismadb.$transaction(async (tx) => {
    await tx.like.deleteMany({where: {id: params.postId }});
    await tx.post.deleteMany({where: {id: params.postId}});
  });

//  const redirectUrl = new URL('/home', req.url);
//   return NextResponse.redirect(redirectUrl);
return NextResponse.json({message:'削除成功'})




}catch(err){
  return NextResponse.json({message:'削除失敗', ERROR:err})
}



}

export const dynamic = 'force-dynamic' //キャッシュを無視する設定