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

    const maxOrder = await prismadb.post.findFirst({
      where: { noteId: state.noteId },
      orderBy: { order: 'desc' },
      select: { order: true }
    });
    const newOrder = (maxOrder?.order ?? 0) + 1;

    if (session?.user?.id) {
      console.log("======into Try =========");
      const imageUrl = await uploadFileToVercelBlob();
      console.log({ imageUrl: imageUrl });
      const createdPost = await prismadb.post.create({
        data: {
          content: content,
          authorId: session?.user?.id,
          imageUrl: imageUrl || null,
          noteId: state.noteId,
          order: newOrder,
        },
        include: {
          author:{
            select: {
              id: true,
              name: true,
              email: true,
              imageUrl: true,
            }
          },
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
