import React from "react";
import { NoteType } from "@/types";
import { auth } from "@/auth";
import Note from "./Note";
import { prismadb } from "@/globals/db";

export default async function Notes() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    throw new Error("ユーザーが認証されていません");
  }

  try {
    const latestNotes = await prismadb.note.findMany({
      where: {
        authorId: userId,
      },
      orderBy: { createdAt: "desc" },
      include: {
        author: true,
      },
    });

    const notes: NoteType[] = latestNotes.map((note) => ({
      id: note.id,
      title: note.title,
      content: note.content ?? undefined,
      createdAt: note.createdAt.toISOString(),
      updatedAt: note.updatedAt.toISOString(),
      authorId: note.authorId,
      author: note.author,
      imageUrl: note.imageUrl ?? undefined,
      // 必要に応じて他のフィールドも追加
    }));

    return (
      <>
        <div className="flex flex-col gap-4 overflow-y-scroll h-[80vh]">
          {notes.length >0
            ? notes.map((note) => <Note key={note.id} note={note} />)
            : "ノートがありません"}
        </div>
      </>
    );
  } catch (error) {
    console.error("ノートの取得に失敗しました:", error);
    throw new Error("ノートの取得に失敗しました");
  }
}
