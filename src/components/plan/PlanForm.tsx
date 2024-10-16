"use client";

import { useFormState } from "react-dom";
import { useEffect, useRef, useState } from "react";
import type { PutBlobResult } from "@vercel/blob";
import { createPlan, PlanFormState } from "@/actions/createPlan";

const PlanForm = () => {
  const [titleText, setTitleText] = useState("");
  // const [text, setText] = useState('');
  const initialState: PlanFormState = { error: "", planId: "", path: "" };
  const [state, formAction] = useFormState(createPlan, initialState);
  const limitLength = 16; //文字数制限
  const [remLength, setRemLength] = useState(limitLength);
  const [isLoading, setIsLoading] = useState(false);

  const fileSelectRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setRemLength(limitLength - titleText.length);
  }, [titleText]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded p-4 mb-4 flex flex-col items-center">
        <form
          action={formAction}
          onSubmit={() => {
            setIsLoading(true);
          }}
          className="w-80 flex flex-col items-cent"
        >
          <input
            type="text"
            name="title"
            placeholder="メモリのタイトル"
            className="w-full p-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => {
              setTitleText(e.target.value);
            }}
          />
          {/* <textarea
            name='post'
            className="w-full h-24 p-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="メモ(省略可)"
            onChange={(e)=>{setText(e.target.value)}}
          ></textarea> */}
          <div
            className={`${remLength >= 0 ? "" : "text-red-500"}`}
          >{`残り${remLength}文字`}</div>
          <div className="w-full flex justify-center">
            <button
              type="submit"
              className={`mt-2 max-w-40 bg-gray-700 hover:bg-gray-600 duration-200 text-white font-semibold py-2 px-4 rounded disabled:opacity-40`}
              disabled={remLength < 0 || isLoading}
            >
              作成
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PlanForm;
