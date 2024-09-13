import { prismadb } from "@/globals/db";
import { PostLeafletType } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export const GET =  async (_: NextRequest, {params}:{params:{noteId: string}}) => {
  console.log('======APIconect NotePost========')
  try {
    const postPoints = await prismadb.$queryRaw<
    PostLeafletType[]
  >`
    SELECT id, ST_AsGeoJSON(location)::json->'coordinates' as coordinates
    FROM "Post"
    WHERE location IS NOT NULL
    AND "noteId" = ${params.noteId}
    ORDER BY "order" DESC
  `;

  const coordinatesForLeaflet = postPoints.map((postPoint) => ({
    id: postPoint.id,
    coordinates: [postPoint.coordinates[1], postPoint.coordinates[0]] as [
      number,
      number
    ],
  }));
    
    console.log({params:params})
    const notePosts = await prismadb.post.findMany({
      where:{
        noteId: params.noteId
      },
      orderBy: { order: "desc" },
      include: {
        author:true,
        note: true
      }
    });


    const mergedData = notePosts.map((data) => {
      const matchingItem = coordinatesForLeaflet.find(
        (coordinate) => coordinate.id === data.id
      );
      return { ...data, ...matchingItem };
    });
    console.log({ mergedData: mergedData });

    return NextResponse.json({message:'成功', data: mergedData})
    //jsonレスポンス
  } catch (err) {
    // console.log({});
    return NextResponse.json({message:'失敗', ERROR:err})
  }
};

export const dynamic = 'force-dynamic' //キャッシュを無視する設定