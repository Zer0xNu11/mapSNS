"use client";

import { createPost, PostFormState } from "@/actions/createPost";
import { useFormState, useFormStatus } from "react-dom";
import { useEffect, useRef, useState } from "react";
import { useMarkerStore } from "@/store";
import type { PutBlobResult } from "@vercel/blob";
import Loading from "@/app/loading";

import { Image as ImageIcon } from "@phosphor-icons/react/dist/ssr/Image";

import Link from "next/link";
import PostLocation from "@/components/map/PostLocation";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface Params {
  params: { noteId: string };
}

const PostForm = ({ params }: Params) => {
  const noteId = params.noteId;
  const currentPath = `${process.env.NEXT_PUBLIC_BASE_URL}/home`;

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
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const { marker } = useMarkerStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

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
          className={`bg-gray-700 w-32 hover:bg-gray-600 duration-200 text-white font-semibold px-4 rounded disabled:bg-gray-300`}
          disabled={remLength < 0 || pending}
        >
          投稿
        </button>
        <PendLoading />
      </>
    );
  };

  const RadiusSelector = () => {
    const [radius, setRadius] = useState("other");

    return (
      <div className="mb-4">
        <label className="block mb-2 font-medium">カテゴリ分類</label>
        <div className="flex space-x-4">
          {["food", "base", "other"].map((category) => (
            <label key={category} className="flex-1">
              <input
                type="radio"
                name="radius"
                value={category}
                checked={radius === category}
                onChange={(e) => setRadius(e.target.value)}
                className="sr-only" // Hide the default radio button
              />
              <span
                className={`
                block text-center py-2 px-4 rounded-full cursor-pointer
                transition-colors duration-200 ease-in-out
                ${
                  radius === category
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }
              `}
              >
                {category === "food"
                  ? "食事"
                  : category === "base"
                  ? "拠点"
                  : "その他"}
              </span>
            </label>
          ))}
        </div>
      </div>
    );
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  };
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    setRemLength(limitLength - text.length);
  }, [text]);

  useEffect(() => {
    state.positionLat = marker?.lat || null;
    state.positionLng = marker?.lng || null;
  }, [marker]);

  {
    return (
      <div className={"min-h-screen right-0 left-0 bg-gray-100 "}>
        <div className="bg-white shadow-md rounded p-4 mb-4 flex flex-col items-center">
          <form action={formAction} className="w-full">
            <div className="flex justify-between mb-2">
              <Link href={currentPath}>
                <Button>戻る</Button>
              </Link>
              <SubmitButton />
            </div>
            <textarea
              name="post"
              className="w-full h-24 p-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="感動を未来へ伝えよう"
              onChange={(e) => {
                setText(e.target.value);
              }}
            ></textarea>
            <div
              className={`text-right ${remLength >= 0 ? "" : "text-red-500"}`}
            >{`残り${remLength}文字`}</div>
            <RadiusSelector />
            <div className="mt-5 flex flex-row gap-4 items-center justify-between">
              <input
                type="file"
                name="image"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
              />
              <button
                type="button"
                onClick={triggerFileInput}
                className="bg-yellow-300 w-32 flex items-center rounded-md justify-center"
              >
                <ImageIcon size={32} color="#1d0202" weight="light" />
                <a className="m-2">画像追加</a>
              </button>
            </div>
            {previewUrl && (
              <div className="mt-4">
                <Image
                  src={previewUrl}
                  alt="プレビュー"
                  width={200}
                  height={200}
                  className="object-cover rounded"
                />
              </div>
            )}
          </form>
          <div className="mt-4 w-[90%] h-[40vh] flex flex-col">
            <label>位置調整</label>
            <PostLocation />
          </div>
        </div>
      </div>
    );
  }
};

export default PostForm;
