"use server";

import { auth } from "@/auth";
import { prismadb } from "@/globals/db";
import { supabase } from "@/lib/supabase";
import { redirect } from "next/navigation";

import { promises as fs } from "node:fs";
import { resolve } from "node:path";

//サーバーアクションズ内でエラーを返す時の型を定義
export interface FormState {
  error: string;
}

export async function createPost(state: FormState, formData: FormData) {
  const session = await auth();
  const content: string = formData.get("post") as string;
  const file = formData.get("file") as File;


//supabase
  const uploadFileToSupabase = async (file: File) => {
    let debug = 1;
    if (file && file.size > 0) {
      debug===1 ? console.log('===into uploadFileToSupabase===') : '';
      const binalData = await file.arrayBuffer(); //ArrayBuffer は固定長のバイナリデータを表現するオブジェクト
      const buffer = Buffer.from(binalData);
      const fileExt = file.name.split(".").pop(); //拡張子
      const fileName = `${crypto.randomUUID()}.${fileExt}`; //ランダムファイル名
      debug===1 ? console.log({fileName:fileName}) : '';

      const { data, error } = await supabase.storage
        .from('post-image') // supabaseのバケット名
        .upload(fileName, file);
        
      debug===1 ? console.log({data:data}) : '';

      if (error) {
        console.error("Supabaseアップロードエラー:", error);
        return null;
      }
      console.log('=====  ======')
      // 公開URLを取得
      const { data: { publicUrl } } = supabase.storage
        .from('post-image')
        .getPublicUrl(fileName);

      debug===1 ?  console.log({publicUrl:publicUrl}) : '';

      return publicUrl;
    }
    return null;
  };

//local
  const makeFilePath = async () =>{
    if (file && file.size > 0) { //filesizeが0より大きい=データが存在する
      const data = await file.arrayBuffer(); //ArrayBuffer は固定長のバイナリデータを表現するオブジェクト
      const buffer = Buffer.from(data);
      const filePath = resolve(
        `post-image`,
        process.cwd(), //Current Working Directory を返す
        `${process.env.STORAGE_URL}`,
        // `src/app/storage/image`,
        `${crypto.randomUUID()}.${file.name.split(".").pop()}`, //ランダムネーム+拡張子
      );
      console.log({filePath: filePath});
      await fs.writeFile(filePath, buffer);
      return {filePath: filePath, buffer: buffer}
    } 
    return null;
  }


  // console.log({
  //   memo: "action/createPost.ts",
  //   session: session,
  //   content: content,
  // });

  try {
    if (session?.user?.id) {
      console.log('======into Try =========')
      const imageUrl = await uploadFileToSupabase(file);
      // const fileData = await makeFilePath();
      console.log({imageUrl:imageUrl})
      await prismadb.post.create({
        data: {
          content: content,
          authorId: session?.user?.id,
          imageUrl: imageUrl || null,
          likedIds: []
        },
        include: {
          author: true,
        },
      });
      console.log('=====ok============')
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
これは File オブジェクトのメソッドで、ファイルの内容を ArrayBuffer として読み込む。
ArrayBuffer は固定長のバイナリデータを表現するオブジェクト。

Buffer の特徴:

Node.js 特有のデータ型で、バイナリデータを効率的に扱える。
ファイルシステム操作やネットワーク操作で広く使用される。
JavaScript の Uint8Array のサブクラス。
*/