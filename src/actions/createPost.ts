"use server";

import { auth } from "@/auth";
import { prismadb } from "@/globals/db";
import { supabase } from "@/lib/supabase";
import { put } from "@vercel/blob";
import { redirect } from "next/navigation";

import { promises as fs } from "node:fs";
import { resolve } from "node:path";

//サーバーアクションズ内でbindした値の型を定義
export interface FormState {
  error: string;
  positionLat?: number | null;
  positionLng?: number | null;
  // position? : {lat:number | null, lng:number | null};
}

export async function createPost(state: FormState, formData: FormData) {
  const session = await auth();
  const content: string = formData.get("post") as string;
  const file = formData.get("file") as File; //del

//vercelbrob 画像保存
const uploadFileToVercelBlob = async () =>{
    const imageFile = formData.get('image') as File;
    const blob = await put(imageFile.name, imageFile, {
      access: 'public',
    });
    return blob.url;
}



//supabase 画像保存用の関数
  // const uploadFileToSupabase = async (file: File) => {
  //   if (file && file.size > 0) {
  //     const fileExt = file.name.split(".").pop(); //拡張子
  //     const fileName = `${crypto.randomUUID()}.${fileExt}`; //ランダムファイル名

  //     const { data, error } = await supabase.storage
  //       .from('post-image') // supabaseのバケット名
  //       .upload(fileName, file);
        

  //     if (error) {
  //       console.error("Supabaseアップロードエラー:", error);
  //       return null;
  //     }
  //     // 公開URLを取得
  //     const { data: { publicUrl } } = supabase.storage
  //       .from('post-image')
  //       .getPublicUrl(fileName);


  //     return publicUrl;
  //   }
  //   return null;
  // };

  // console.log({
  //   memo: "action/createPost.ts",
  //   session: session,
  //   content: content,
  // });

  try {
    if (session?.user?.id) {
      console.log('======into Try =========')
      const imageUrl = await uploadFileToVercelBlob();
      console.log({imageUrl:imageUrl})
      const createdPost = await prismadb.post.create({
        data: {
          content: content,
          authorId: session?.user?.id,
          imageUrl: imageUrl || null,
          likedIds: [],
        },
        include: {
          author: true,
        },
      });

      //位置情報 SQL
      await  prismadb.$executeRaw`
        UPDATE "Post"
        SET location = ST_SetSRID(ST_MakePoint(${state.positionLng}, ${state.positionLat}), 4326)
        WHERE id = ${createdPost.id}
      `;
    }else {
      state.error = "ログインしてください";
      return state;
    }
  } catch (error) {
    console.log("投稿失敗");
    state.error = "投稿エラー";
    return state;
  }
  redirect("/home");
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