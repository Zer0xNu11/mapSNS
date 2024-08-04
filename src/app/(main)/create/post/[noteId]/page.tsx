"use client";

import { createPost, PostFormState } from "@/actions/createPost";
import { useFormState, useFormStatus } from "react-dom";
import { useEffect, useRef, useState } from "react";
import { useMarkerStore } from "@/store";
import type { PutBlobResult } from "@vercel/blob";
import Loading from "@/app/loading";

import Link from "next/link";
import PostLocation from "@/components/map/PostLocation";
import { Button } from "@/components/ui/button";

interface Params{
  params: { noteId: string };
}

const PostForm = ({ params }: Params) => {
  const noteId = params.noteId;
  const currentPath = `${process.env.NEXT_PUBLIC_BASE_URL}/home/notes/${noteId}`;

  const [text, setText] = useState("");
  const initialState: PostFormState = {
    error: "",
    noteId: noteId,
    path: currentPath,
  };
  const [state, formAction] = useFormState(createPost, initialState);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  const limitLength = 60; //文字数制限
  const [remLength, setRemLength] = useState(limitLength);
  const [loading, setLoading] = useState(false);

  const PendLoading = () => {
    const { pending } = useFormStatus();
    return pending ? <Loading /> : "";
  };

  const SubmitButton = () => {
    const { pending } = useFormStatus();
    return (
      <>
        <button
          type="submit"
          className={`mt-2 bg-gray-700 hover:bg-gray-600 duration-200 text-white font-semibold py-2 px-4 rounded disabled:bg-gray-300`}
          disabled={remLength < 0 || pending}
        >
          投稿
        </button>
        <PendLoading />
      </>
    );
  };

  const { marker } = useMarkerStore();

  const fileSelectRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setRemLength(limitLength - text.length);
  }, [text]);

  useEffect(() => {
    state.positionLat = marker?.lat || null;
    state.positionLng = marker?.lng || null;
    // console.log({ zustandmarker: marker });
    // console.log({ state: state.positionLng });
    // console.log({ state: state });
    // console.log(`../home/notes`)
  }, [marker]);



  {
    return (
      <div
        className={'min-h-screen right-0 left-0 bg-gray-100 '}
      >
        <Link href={currentPath}><Button>戻る</Button></Link>
        <div className="bg-white shadow-md rounded p-4 mb-4 flex flex-col items-center">
          <form action={formAction}>
            <textarea
              name="post"
              className="w-full h-24 p-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="What's on your mind?"
              onChange={(e) => {
                setText(e.target.value);
              }}
            ></textarea>
            <div
              className={`${remLength >= 0 ? "" : "text-red-500"}`}
            >{`残り${remLength}文字`}</div>
            <input type="file" name="image" />
            {/* <input type="file" name='file' ref={fileSelectRef}/> */}

            <SubmitButton />
          </form>
          <div className="w-[80%] h-[50vh]">
            <PostLocation />
          </div>
        </div>
      </div>
    );
  }
};

export default PostForm;
