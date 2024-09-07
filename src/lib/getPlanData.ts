import { auth } from "@/auth";
import { prismadb } from "@/globals/db";
import { PlanLeafletType, PlanPointType, PlanType} from "@/types";

export async function getPlanData(planId : string) {
  //生SQLで時系列順にpostを取得 ->json配列 ->>json文字列
  const session = await auth();
  const userId = session?.user?.id || 'empty'
  const planPoints = await prismadb.$queryRaw<
    PlanLeafletType[]
  >`
    SELECT id, content, ST_AsGeoJSON(location)::json->'coordinates' as coordinates
    FROM "PlanPoint"
    WHERE location IS NOT NULL
    AND "planId" = ${planId}
    ORDER BY "createdAt" ASC
  `;

  // 座標データを[latitude, longitude]の形式に変換
  const planForLeaflet = planPoints.map((planPoint) => ({
    ...planPoint,
    coordinates: [planPoint.coordinates[1], planPoint.coordinates[0]] as [number, number],
  }));

  // Polyline用の座標配列
  const polylineCoordinates = planForLeaflet.map((planPoint) => planPoint.coordinates);
  console.log({
    planPoints: planForLeaflet,
    polylineCoordinates: polylineCoordinates,
  });

  return {
    planPoints: planForLeaflet,
    polylineCoordinates,
  };
}

export const getPlanList = async (planId: string): Promise<PlanPointType[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/plans/getPlanList/${planId}`, {
    cache: "no-store",
  });

  const data = await response.json();
  console.log({plandata:data})
  return data.data as PlanPointType[];
};

