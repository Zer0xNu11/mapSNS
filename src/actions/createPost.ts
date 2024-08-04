"use server";

import { auth } from "@/auth";
import { prismadb } from "@/globals/db";
import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

//サーバーアクションズ内でbindした値の型を定義
export interface PostFormState {
  error: string;
  noteId : string;
  path: string;
  positionLat?: number | null;
  positionLng?: number | null;
  // position? : {lat:number | null, lng:number | null};
}

export async function createPost(state: PostFormState, formData: FormData) {
  const session = await auth();
  const content: string = formData.get("post") as string;
  const path = state.path;
  console.log({path:path});

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
    if (session?.user?.id) {
      console.log("======into Try =========");
      const imageUrl = await uploadFileToVercelBlob();
      console.log({ imageUrl: imageUrl });
      const createdPost = await prismadb.post.create({
        data: {
          content: content,
          authorId: session?.user?.id,
          imageUrl: imageUrl || null,
          likedIds: [],
          noteId: state.noteId
        },
        include: {
          author: true,
        },
      });

      //位置情報 SQL
      await prismadb.$executeRaw`
        UPDATE "Post"
        SET location = ST_SetSRID(ST_MakePoint(${state.positionLng}, ${state.positionLat}), 4326)
        WHERE id = ${createdPost.id}
      `;
    } else {
      state.error = "ログインしてください";
      return state;
    }
  } catch (error) {
    console.log("投稿失敗");
    console.log(error)
    state.error = "投稿エラー";
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
