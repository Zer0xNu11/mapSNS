import { auth } from "@/auth";
import { prismadb } from "@/globals/db";

export async function getNotePoints(noteId : string) {


  const response = await fetch(`${process.env.API_URL}/notes/getNotePoints/${noteId}`, {
    cache: "no-store",
  });

  const data = await response.json();
  console.log({data:data})
  return data;

  // //生SQLで時系列順にpostを取得 ->json配列 ->>json文字列
  // const session = await auth();
  // const userId = session?.user?.id || 'empty'
  // const posts = await prismadb.$queryRaw<
  //   Array<{ id: string; content: string; coordinates: [number, number] }>
  // >`
  //   SELECT id, content, ST_AsGeoJSON(location)::json->'coordinates' as coordinates
  //   FROM "Post"
  //   WHERE location IS NOT NULL
  //   AND "noteId" = ${noteId}
  //   ORDER BY "createdAt" ASC
  // `;

  // // 座標データを[latitude, longitude]の形式に変換
  // const postsForLeaflet = posts.map((post) => ({
  //   ...post,
  //   coordinates: [post.coordinates[1], post.coordinates[0]] as [number, number],
  // }));

  // // Polyline用の座標配列
  // const polylineCoordinates = postsForLeaflet.map((post) => post.coordinates);
  // console.log({
  //   posts: postsForLeaflet,
  //   polylineCoordinates: polylineCoordinates,
  // });
  // return {
  //   posts: postsForLeaflet,
  //   polylineCoordinates,
  // };
}