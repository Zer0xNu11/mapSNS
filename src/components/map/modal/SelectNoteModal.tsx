"use client";

import { setCurrentNoteData } from "@/lib/localStorageHandler";
import { useEditNote } from "@/store";
import { NoteType } from "@/types";
import React, { useEffect, useState } from "react";

const getLatestNotes = async (): Promise<NoteType[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/notes/getNotes`,
    {
      cache: "no-store", //キャッシュ無効化のオプション
    }
  );

  if (response.status !== 200) {
    throw new Error("不正な値です");
  }

  const data = await response.json();
  console.log({ data: data });
  return data.data as NoteType[];
};

const SelectNoteModal = () => {
  const [userNotes, setUserNotes] = useState<NoteType[]>([]);
  const { setEditNoteData } = useEditNote();

  useEffect(() => {
    async function loadNotes() {
      const data = await getLatestNotes();
      setUserNotes(data);
    }

    loadNotes();
  }, []);

  if (userNotes && userNotes.length > 0) {
    return (
      <>
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-[9000]">
          <div className="bg-white absolute rounded p-4 flex flex-col  items-center w-[90%] max-w-md max-h-[70vh] ">
            <div className="text-xl mb-4">マップにセットするプランを選択</div>
            <div className="flex flex-col gap-4 overflow-y-scroll w-full px-2 pb-4">
              {userNotes.map((note) => (
                <button
                  className="bg-yellow-400 rounded-xl text-xl w-64 h-32 mx-auto py-4 hover:opacity-70"
                  onClick={() => {
                    setCurrentNoteData(note.id, note.title);
                    setEditNoteData(note.id, note.title);
                  }}
                >
                  {`${note.title}`}
                </button>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div>ノートデータが見つかりません</div>
      </>
    );
  }
};

export default SelectNoteModal;
