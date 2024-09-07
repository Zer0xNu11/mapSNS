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
      author:true,
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
    
    return NextResponse.json({message:'成功', data: createdPlan})
    //jsonレスポンス
  }
  } catch (err) {
    // console.log({});
    return NextResponse.json({message:'失敗', ERROR:err})
  }
};

export const dynamic = 'force-dynamic' //キャッシュを無視する設定






//サーバーアクションズ内でbindした値の型を定義
// export interface PlanFormState {
//   error: string;
//   planId: string;
//   positionLat?: number | null;
//   positionLng?: number | null;
// }

// export async function createPlan(state: PlanFormState, formData: FormData) {
//   const session = await auth();
//   const title: string = formData.get("title") as string
//   const content: string = formData.get("content") as string;

//   try {
//     if (session?.user?.id) {
//       console.log('======into Try =========')
//       const createdPlan = await prismadb.plan.create({
//         data: {
//           title: title,
//           content: content || '',
//           userId: session?.user?.id,
//         },
//         include: {
//           user: true,
//         },
//       });

//     }else {
//       state.error = "ログインしてください";
//       return state;
//     }
//   } catch (error) {
//     console.log("Plan失敗");
//     console.log(error)
//     state.error = "投稿エラー";
//     return state;
//   }
//   redirect("/home/plans");
// }