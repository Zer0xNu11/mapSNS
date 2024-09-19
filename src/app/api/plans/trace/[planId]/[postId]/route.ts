import { prismadb } from "@/globals/db";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const GET =  async (_: NextRequest, {params}:{params:{planId:string, postId: string}}) => {
  console.log('======APIconect tracePost========')
  const session = await auth();


  if (!session?.user?.id) {
    return NextResponse.json({ message: '認証エラー' }, { status: 401 });
  }

  try {
  const post = await prismadb.post.findUnique({
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

  if (!post) {
    return NextResponse.json({ message: 'Post not found' }, { status: 404 });
  }
  
  const maxOrder = await prismadb.planPoint.findFirst({
    where: { planId: params.planId },
    orderBy: { order: 'desc' },
    select: { order: true }
  });
  const newOrder = (maxOrder?.order ?? 0) + 1;

    if (session?.user?.id) {
    const createdPlan = await prismadb.planPoint.create({
      data: {
        content: post.content || '',
        userId: session?.user?.id,
        imageUrl: post.imageUrl || null,
        postId: post.id,
        planId: params.planId,
        order: newOrder,
      },
      include: {
        user: true,
      },
    });

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

    console.log({data:createdPlan})
    return NextResponse.json({message:'成功', data: createdPlan})
    //jsonレスポンス
  }
  } catch (err) {
    // console.log({});
    return NextResponse.json({message:'失敗', ERROR:err})
  }
};

export const dynamic = 'force-dynamic' //キャッシュを無視する設定