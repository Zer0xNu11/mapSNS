//廃棄予定
// import { prismadb } from "@/globals/db";
// import { PostLeafletType } from "@/types";
// import { NextRequest, NextResponse } from "next/server";

// export const GET =  async (_: NextRequest) => {
//   console.log('======APIconect GetPostPoints========')
//   try {
//     const posts = await prismadb.$queryRaw<
//     PostLeafletType[]
//   >`
//     SELECT
//      id, 
//      content, 
//      "totalLikes", 
//      "noteId",
//      ST_AsGeoJSON(location)::json->'coordinates' as coordinates
//     FROM "Post"
//     WHERE location IS NOT NULL
//     ORDER BY "createdAt" ASC
//   `;

//   // 座標データを[latitude, longitude]の形式に変換
//   const postsForLeaflet = posts.map((post) => ({
//     ...post,
//     coordinates: [post.coordinates[1], post.coordinates[0]] as [number, number],
//   }));


//     return NextResponse.json({message:'成功', posts: postsForLeaflet})
//     //jsonレスポンス
//   } catch (err) {
//     // console.log({});
//     return NextResponse.json({message:'失敗', ERROR:err})
//   }
// };

// export const dynamic = 'force-dynamic' //キャッシュを無視する設定