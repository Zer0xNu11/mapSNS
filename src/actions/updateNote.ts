"use server";

import { auth } from "@/auth";
import { prismadb } from "@/globals/db";
import { redirect } from "next/navigation";


//サーバーアクションズ内でbindした値の型を定義
interface NoteFormState {
  error: string;
  noteId : string;
  path: string;
}

export async function updateNote(state: NoteFormState, formData: FormData) {
  const session = await auth();
  const title: string = formData.get("title") as string
  const content: string = formData.get("content") as string;
  
  const path = state.path;
  const noteId = state.noteId



  try {
    if (session?.user?.id) {
      const updatedNote = await prismadb.note.update({
        where:{id: noteId},
        data: {
          title: title,
          content: content || '',
        },
      });
    } else {
      state.error = "ログインしてください";
      return state;
    }
  } catch (error) {
    console.log("更新失敗");
    console.log(error)
    state.error = "更新失敗";
    return state;
  }
  redirect(path);
}