"use server";

import { auth } from "@/auth";
import { prismadb } from "@/globals/db";
import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

//サーバーアクションズ内でbindした値の型を定義
export interface PlanFormState {
  error: string;
  planId : string;
  path: string;
  positionLat?: number | null;
  positionLng?: number | null;
  // position? : {lat:number | null, lng:number | null};
}

export async function createPlanPoint(state: PlanFormState, formData: FormData) {
  const session = await auth();
  const content: string = formData.get("planContent") as string;
  const path = state.path;
  console.log({path:path});
  console.log('create PlanPoint');

  //vercelbrob 画像保存
  const uploadFileToVercelBlob = async () => {
    const imageFile = formData.get("image") as File;
    if(imageFile && imageFile.size > 0){
    const blob = await put(imageFile.name, imageFile, {
      access: "public",
    });
    return blob.url;
  }
  return null;
  };


  try {

    const maxOrder = await prismadb.planPoint.findFirst({
      where: { planId: state.planId },
      orderBy: { order: 'desc' },
      select: { order: true }
    });
    const newOrder = (maxOrder?.order ?? 0) + 1;

    if (session?.user?.id) {
      console.log("======   createPlanPoint =========");
      const imageUrl = await uploadFileToVercelBlob();
      const createdPlanPoint = await prismadb.planPoint.create({
        data: {
          content: content,
          userId: session?.user?.id,
          imageUrl: imageUrl || null,
          planId: state.planId,
          order: newOrder,
        }
      });

      //位置情報 SQL
      await prismadb.$executeRaw`
        UPDATE "PlanPoint"
        SET location = ST_SetSRID(ST_MakePoint(${state.positionLng}, ${state.positionLat}), 4326)
        WHERE id = ${createdPlanPoint.id}
      `;
    } else {
      state.error = "ログインしてください";
      return state;
    }
  } catch (error) {
    console.log("PlanPoint作成失敗");
    console.log(error)
    state.error = "PlanPoint作成エラー";
    return state;
  }
  redirect(path);
}

/*
file.arrayBuffer():
File オブジェクトのメソッドで、ファイルの内容を ArrayBuffer として読み込む。
ArrayBuffer は固定長のバイナリデータを表現するオブジェクト。

Buffer の特徴:

Node.js 特有のデータ型で、バイナリデータを効率的に扱える。
ファイルシステム操作やネットワーク操作で広く使用される。
JavaScript の Uint8Array のサブクラス。
*/
