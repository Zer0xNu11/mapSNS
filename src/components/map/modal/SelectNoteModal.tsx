"use client";

import { setCurrentNoteData } from "@/lib/localStorageHandler";
import { useEditNote } from "@/store";
import { NoteType } from "@/types";
import Link from "next/link";
import React, { RefObject, useEffect, useState } from "react";

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

interface SelectNoteModalProps {
  closeButtonRef: RefObject<HTMLButtonElement>;
}

const SelectNoteModal: React.FC<SelectNoteModalProps>  = ({closeButtonRef}) => {
  const [userNotes, setUserNotes] = useState<NoteType[]>([]);
  const { setEditNoteData } = useEditNote();

  const closeModal = () => {
    console.log('checke press button')
    if (closeButtonRef.current) {
      closeButtonRef.current.click();
    }
  };

  useEffect(() => {
    async function loadNotes() {
      const data = await getLatestNotes();
      setUserNotes(data);
    }

    loadNotes();
  }, []);

    return (
      <>
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-[9000]">
          <div className="bg-white absolute rounded p-4 flex flex-col items-center w-[90%] max-w-md max-h-[70vh]">
            <div className="text-xl mb-4">ノートを選択</div>
   
            <div className="flex flex-col gap-4 overflow-y-auto w-full px-2 pb-4">
              <Link href="../create/note">
              <button
                  className="bg-green-400 rounded-xl text-xl w-full h-auto min-h-[4rem] mx-auto py-4 px-3 hover:opacity-70 flex items-center justify-center"
                >
                  <div className="w-full break-words text-center">
                    +新しいノートを作成
                  </div>
                </button>
              </Link>
            
              {userNotes.map((note) => (
                <button
                  key={note.id}
                  className="bg-yellow-400 rounded-xl text-xl w-full h-auto min-h-[4rem] mx-auto py-4 px-3 hover:opacity-70 flex items-center justify-center"
                  onClick={() => {
                    setCurrentNoteData(note.id, note.title);
                    setEditNoteData(note.id, note.title);
                    closeModal();
                  }}
                >
                  <div className="w-full break-words text-center">
                    {note.title}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </>
    );
};

export default SelectNoteModal;
