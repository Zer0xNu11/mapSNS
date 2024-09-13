// import Map from '@/components/map/Map';
import { auth } from "@/auth";
import { prismadb } from "@/globals/db";
import dynamic from "next/dynamic";
import React from "react";

async function getBook() {
  //生SQLで時系列順にpostを取得 ->json配列 ->>json文字列
  const session = await auth();
  const userId = session?.user?.id || 'empty'
  console.log({userId : userId})
  const posts = await prismadb.$queryRaw<
    Array<{ id: string; content: string; coordinates: [number, number] }>
  >`
    SELECT id, content, ST_AsGeoJSON(location)::json->'coordinates' as coordinates
    FROM "Post"
    WHERE location IS NOT NULL
    AND "authorId" = ${userId}
    ORDER BY "createdAt" ASC
  `;

  // 座標データを[latitude, longitude]の形式に変換
  const postsForLeaflet = posts.map((post) => ({
    ...post,
    coordinates: [post.coordinates[1], post.coordinates[0]] as [number, number],
  }));

  // Polyline用の座標配列
  const polylineCoordinates = postsForLeaflet.map((post) => post.coordinates);
  console.log({
    posts: postsForLeaflet,
    polylineCoordinates: polylineCoordinates,
  });
  return {
    posts: postsForLeaflet,
    polylineCoordinates,
  };
}

const MapPage = async () => {
  const Map = React.useMemo(
    () =>
      dynamic(() => import("@/components/map/Map"), { //SSR停止　window error防止
        loading: () => <p>map is loading</p>,
        ssr: false,
      }),
    []
  );

  const { posts, polylineCoordinates } = await getBook();

  return (
    <div className="w-full h-[100vh]">
      biomenu
    </div>
  );
};

export default MapPage;
