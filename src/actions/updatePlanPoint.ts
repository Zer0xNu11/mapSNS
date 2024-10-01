"use server";

import { auth } from "@/auth";
import { prismadb } from "@/globals/db";
import { put } from "@vercel/blob";
import { redirect } from "next/navigation";


//サーバーアクションズ内でbindした値の型を定義
export interface PlanFormState {
  error: string;
  planId : string;
  path: string;
}

export async function updatePlanPoint(state: PlanFormState, formData: FormData) {
  const session = await auth();
  const content: string = formData.get("planContent") as string;
  const isImgDel : boolean = formData.get("isImgDel") === 'on' ? true : false;
  console.log({isImgDel: isImgDel})
  console.log(formData.get("isImgDel"))
  
  const path = state.path;
  const planPointId = state.planId


  //バリデーション
  const validateFile = (file: File) => {
    const validMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const maxSizeMB = 5; // 画像size制限 MB
    
    if (!validMimeTypes.includes(file.type)) {
      throw new Error('サポートされていないファイル形式です。');
    }
    
    if (file.size / 1024 / 1024 > maxSizeMB) {
      throw new Error('ファイルサイズが大きすぎます。');
    }
  };

  //vercelbrob 画像保存
  const uploadFileToVercelBlob = async () => {
    const imageFile = formData.get("image") as File;
    if(imageFile && imageFile.size > 0){
    validateFile(imageFile);

    const blob = await put(imageFile.name, imageFile, {
      access: "public",
    });
    return blob.url;
  }
  return null;
  };


  try {


    if (session?.user?.id) {
      console.log("======into Try =========");
      const imageUrl = await uploadFileToVercelBlob();
      console.log({ imageUrl: imageUrl });
      const updatedPost = imageUrl ? (await prismadb.planPoint.update({
        where:{id: planPointId},
        data: {
          content: content,
          imageUrl: imageUrl,
        },
      })) : isImgDel ? (await prismadb.planPoint.update({
        where:{id: planPointId},
        data: {
          content: content,
          imageUrl: null,
        },
      })) : (await prismadb.planPoint.update({
        where:{id: planPointId},
        data: {
          content: content,
        },
      }));

      //位置情報 SQL
      // await prismadb.$executeRaw`
      //   UPDATE "Post"
      //   SET location = ST_SetSRID(ST_MakePoint(${state.positionLng}, ${state.positionLat}), 4326)
      //   WHERE id = ${updatedPost.id}
      // `;
    } else {
      state.error = "ログインしてください";
      return state;
    }
  } catch (error) {
    console.log("保存失敗");
    console.log(error)
    state.error = "保存失敗";
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
