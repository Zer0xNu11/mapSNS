"use server";

import { auth } from "@/auth";
import { prismadb } from "@/globals/db";
import { redirect } from "next/navigation";

//サーバーアクションズ内でエラーを返す時の型を定義
export interface FormState {
  error: string;
}

export async function createPost(state: FormState, formData: FormData) {
  const session = await auth();
  const content: string = formData.get("post") as string;
  console.log({
    memo: "action/createPost.ts",
    session: session,
    content: content,
  });
  if (content === null) {
    throw new Error();
  }
  try {
    if (session?.user?.id) {
      await prismadb.post.create({
        data: {
          content: content,
          authorId: session?.user?.id,
        },
        include: {
          author: true,
        },
      });
    }
  } catch (error) {
    console.log("投稿できない");
    state.error = "投稿に失敗";
    return state;
  }
  redirect("/home");
}
