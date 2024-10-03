import { prismadb } from "@/globals/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  _: NextRequest,
  { params }: { params: { userId: string } }
) => {
  console.log("====== APIconect Posts id GET ========");
  try {
    console.log({ params: params });
    const selectedUser = await prismadb.user.findUnique({
      where: {
        id: params.userId,
      },
      select: {
        id: true,
        name: true,
        imageUrl: true,
      },
    });
    return NextResponse.json({ message: "成功", data: selectedUser });
    //jsonレスポンス
  } catch (err) {
    // console.log({});
    return NextResponse.json({ message: "失敗", ERROR: err });
  }
};
