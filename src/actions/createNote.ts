"use server";

import { auth } from "@/auth";
import { prismadb } from "@/globals/db";
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
      });

    }else {
      state.error = "ログインしてください";
      return state;
    }
  } catch (error) {
    console.log("ノート作成失敗");
    console.log(error)
    state.error = "ノート作成失敗";
    return state;
  }
  redirect("/home/notes");
}