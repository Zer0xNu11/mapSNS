import { prismadb } from "@/globals/db";
import { NoteSlotType } from "@/types";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { Prisma } from "@prisma/client";

export const GET = async (
  _: NextRequest,
  { params }: { params: { noteId: string } }
) => {
  console.log("======APIconect NotePost========");
  console.log(params.noteId)
  const session = await auth();
  try {
    if (session?.user?.id) {
    const postData = await prismadb.$queryRaw<NoteSlotType[]>`
    SELECT 
        p.id, 
        p."content", 
        p."createdAt", 
        p."updatedAt", 
        p."authorId", 
        p."imageUrl", 
        p."open", 
        p."noteId", 
        p."category", 
        p."tag", 
        p."totalLikes", 
        p."order",
        CASE 
        WHEN p.location IS NOT NULL THEN 
          json_build_array(
            (ST_AsGeoJSON(p.location)::json->'coordinates'->>1)::float,
            (ST_AsGeoJSON(p.location)::json->'coordinates'->>0)::float
          )
        ELSE NULL
      END as coordinates,
        u.id as "userId",
        u.name as "userName",
        u."imageUrl" as "userImageUrl"
      FROM "Post" p
      JOIN 
        "User" u ON p."authorId" = u.id
      WHERE p."noteId" = ${params.noteId}
      ORDER BY p."createdAt" DESC
    `;
    console.log({postData:postData})
    const postIds = postData.map((post) => post.id);
    const like = await prismadb.like.findMany({
      where: {
        userId: session.user.id,
        postId: { in: postIds },
      },
      select: { postId: true },
    });

    const likedPostIds = new Set(like.map((like) => like.postId));
    const postsWithLikes = postData.map((post) => ({
      ...post,
      isLiked: likedPostIds.has(post.id),
    }));

    return NextResponse.json({ message: "成功", data: postsWithLikes },{status : 200});
  }
  } catch (err) {
    return NextResponse.json({ message: "失敗", ERROR: err }, {status : 500});
  }
};

export const dynamic = "force-dynamic"; //キャッシュを無視する設定

// 元データ
// import { prismadb } from "@/globals/db";
// import { PostLeafletType } from "@/types";
// import { NextRequest, NextResponse } from "next/server";

// export const GET =  async (_: NextRequest, {params}:{params:{noteId: string}}) => {
//   console.log('======APIconect NotePost========')
//   try {
//     const postPoints = await prismadb.$queryRaw<
//     PostLeafletType[]
//   >`
//     SELECT id, ST_AsGeoJSON(location)::json->'coordinates' as coordinates
//     FROM "Post"
//     WHERE location IS NOT NULL
//     AND "noteId" = ${params.noteId}
//     ORDER BY "order" DESC
//   `;

//   const coordinatesForLeaflet = postPoints.map((postPoint) => ({
//     id: postPoint.id,
//     coordinates: [postPoint.coordinates[1], postPoint.coordinates[0]] as [
//       number,
//       number
//     ],
//   }));

//     console.log({params:params})
//     const notePosts = await prismadb.post.findMany({
//       where:{
//         noteId: params.noteId
//       },
//       orderBy: { order: "desc" },
//       include: {
//         author:{
//           select: {
//             id: true,
//             name: true,
//             email: true,
//             imageUrl: true,
//           }
//         },
//         note: true
//       }
//     });

//     const mergedData = notePosts.map((data) => {
//       const matchingItem = coordinatesForLeaflet.find(
//         (coordinate) => coordinate.id === data.id
//       );
//       return { ...data, ...matchingItem };
//     });
//     console.log({ mergedData: mergedData });

//     return NextResponse.json({message:'成功', data: mergedData})
//     //jsonレスポンス
//   } catch (err) {
//     // console.log({});
//     return NextResponse.json({message:'失敗', ERROR:err})
//   }
// };

// export const dynamic = 'force-dynamic' //キャッシュを無視する設定
