import { prismadb } from "@/globals/db";
import { PlanLeafletType } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  _: NextRequest,
  { params }: { params: { planId: string } }
) => {
  console.log("======APIconect getPlanData========");
  try {
    console.log(params.planId);
    const planPoints = await prismadb.$queryRaw<PlanLeafletType[]>`
    SELECT id, ST_AsGeoJSON(location)::json->'coordinates' as coordinates
    FROM "PlanPoint"
    WHERE location IS NOT NULL
    AND "planId" = ${params.planId}
    ORDER BY "order" ASC
  `;

    // 座標データを[latitude, longitude]の形式に変換
    const coordinatesForLeaflet = planPoints.map((planPoint) => ({
      id: planPoint.id,
      coordinates: [planPoint.coordinates[1], planPoint.coordinates[0]] as [
        number,
        number
      ],
    }));

    const planListData = await prismadb.planPoint.findMany({
      where: {
        planId: params.planId,
      },
      orderBy: {
        order: "asc",
      },
    });

    const mergedData = planListData.map((data) => {
      const matchingItem = coordinatesForLeaflet.find(
        (coordinate) => coordinate.id === data.id
      );
      return { ...data, ...matchingItem };
    });
    console.log({ mergedData: mergedData });

    return NextResponse.json({
      data: mergedData,
    });
  } catch (err) {
    // console.log({});
    return NextResponse.json({ message: "失敗", ERROR: err });
  }
};

export const dynamic = "force-dynamic"; //キャッシュを無視する設定
