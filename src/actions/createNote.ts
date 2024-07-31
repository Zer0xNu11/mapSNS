"use server";

import { auth } from "@/auth";
import { prismadb } from "@/globals/db";
import { CookingPot } from "lucide-react";
import { redirect } from "next/navigation";


//サーバーアクションズ内でbindした値の型を定義
export interface NoteFormState {
  error: string;
}

export async function createNote(state: NoteFormState, formData: FormData) {
  const session = await auth();
  const title: string = formData.get("title") as string
  const content: string = formData.get("content") as string;

  try {
    if (session?.user?.id) {
      console.log('======into Try =========')
      const createdNote = await prismadb.note.create({
        data: {
          title: title,
          content: content || '',
          authorId: session?.user?.id,
        },
        include: {
          author: true,
          posts: true
        },
      });

    }else {
      state.error = "ログインしてください";
      return state;
    }
  } catch (error) {
    console.log("投稿失敗");
    console.log(error)
    state.error = "投稿エラー";
    return state;
  }
  redirect("/home/notes");
}