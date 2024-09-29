"use client";

import { useFormState } from "react-dom";
import { useEffect, useRef, useState } from "react";
import type { PutBlobResult } from "@vercel/blob";
import { NoteType } from "@/types";
import { updateNote } from "@/actions/updateNote";

interface NoteEditFormProps {
  note: NoteType;
}

interface NoteEditFormState {
  error: string;
  noteId: string;
  path: string;
}

const NoteEditForm: React.FC<NoteEditFormProps> = ({ note }) => {
  const currentPath = `${process.env.NEXT_PUBLIC_BASE_URL}/home/notes`;
  const [titleText, setTitleText] = useState(`${note.title}`);
  const [text, setText] = useState(note.content || "");
  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  const limitLength = 16; //文字数制限
  const [remLength, setRemLength] = useState(limitLength);

  const initialState: NoteEditFormState = {
    error: "",
    noteId: note.id,
    path: currentPath,
  };
  const [state, formAction] = useFormState(updateNote, initialState);

  const fileSelectRef = useRef<HTMLInputElement>(null);
  // const fileSelect = () => {
  //   console.log(fileSelectRef.current);
  //   if(fileSelectRef.current){
  //   fileSelectRef.current.click();
  //   }
  // };

  useEffect(() => {
    setRemLength(limitLength - titleText.length);
  }, [titleText]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded p-4 mb-4 flex flex-col items-center">
        <form action={formAction} className="w-80 flex flex-col items-cent">
          <input
            type="text"
            name="title"
            placeholder="ノートのタイトル"
            value={titleText}
            className="w-full p-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => {
              setTitleText(e.target.value);
            }}
          />
          {/* <textarea
            name='post'
            value={text}
            className="w-full h-24 p-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="ノートの紹介文(省略可)"
            onChange={(e)=>{setText(e.target.value)}}
          ></textarea> */}
          <div
            className={`text-right ${remLength >= 0 ? "" : "text-red-500"}`}
          >{`残り${remLength}文字`}</div>
          {/* <input type="file" name='image' /> */}
          {/* <input type="file" name='file' ref={fileSelectRef}/> */}
          <div className="w-full flex justify-center">
            <button
              type="submit"
              className={`mt-2 max-w-40 bg-gray-700 hover:bg-gray-600 duration-200 text-white font-semibold py-2 px-4 rounded disabled:opacity-40`}
              disabled={remLength >= 0 ? false : true}
            >
              更新
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoteEditForm;
