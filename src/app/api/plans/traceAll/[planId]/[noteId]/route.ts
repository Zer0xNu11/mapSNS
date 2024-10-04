import { prismadb } from "@/globals/db";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

export const GET =  async (_: NextRequest, {params}:{params:{planId:string, noteId: string}}) => {
  console.log('======APIconect tracePostAll========')
  const session = await auth();


  if (!session?.user?.id) {
    return NextResponse.json({ message: '認証エラー' }, { status: 401 });
  }

  try {
  const posts = await prismadb.post.findMany({
    where:{
      noteId: params.noteId
    },
    orderBy:{order:"asc"},
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

  if (!posts) {
    return NextResponse.json({ message: 'Post not found' }, { status: 404 });
  }
  
  const maxOrder = await prismadb.planPoint.findFirst({
    where: { planId: params.planId },
    orderBy: { order: 'desc' },
    select: { order: true }
  });
  const newOrder = (maxOrder?.order ?? 0) + 1;

    if (session?.user?.id) {
    const userId = session.user.id
    const createdPlans = await Promise.all(posts.map(async (post, index)=> {
      const createdPlan = await prismadb.planPoint.create({
      data: {
        content: post.content || '',
        userId: userId,
        imageUrl: post.imageUrl || null,
        postId: post.id,
        planId: params.planId,
        order: (newOrder+index),
      },
      include: {
        user: true,
      },
    })
    

    //位置情報 SQL
    await prismadb.$executeRaw`
    UPDATE "PlanPoint"
    SET location = (
      SELECT location 
      FROM "Post"
      WHERE id = ${post.id}
    )
    WHERE id = ${createdPlan.id};
  `;

   return createdPlan
    //jsonレスポンス
  }))
  return NextResponse.json({message:'成功', data: createdPlans})
}
  } catch (err) {
    // console.log({});
    return NextResponse.json({message:'失敗', ERROR:err})
  }
};

export const dynamic = 'force-dynamic' //キャッシュを無視する設定