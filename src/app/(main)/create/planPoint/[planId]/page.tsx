"use client";

import { PlanFormState } from "@/actions/createPlan";
import { createPlanPoint } from "@/actions/createPlanPoint";
import { useFormState, useFormStatus } from "react-dom";
import { useEffect, useRef, useState } from "react";
import { useMarkerStore } from "@/store";
import type { PutBlobResult } from "@vercel/blob";
import Loading from "@/app/loading";

import { Image as ImageIcon } from "@phosphor-icons/react/dist/ssr/Image";

import Link from "next/link";
import { Button } from "@/components/ui/button";

import imageCompression from "browser-image-compression";
import Image from "next/image";

interface Params {
  params: { planId: string };
}

const PlanForm = ({ params }: Params) => {
  const planId = params.planId;
  const currentPath = `${process.env.NEXT_PUBLIC_BASE_URL}/home`;

  const [text, setText] = useState("");
  const initialState: PlanFormState = {
    error: "",
    planId: planId,
    path: currentPath,
  };
  const [state, formAction] = useFormState(createPlanPoint, initialState);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  const limitLength = 60; //文字数制限
  const [remLength, setRemLength] = useState(limitLength);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [compressedImage, setCompressedImage] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  createPlanPoint;

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
          メモリ作成
        </button>
        <PendLoading />
      </>
    );
  };

  const { marker } = useMarkerStore();

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsLoading(true);
      try {
        const options = {
          maxSizeMB: 1, // 最大サイズMB
          maxWidthOrHeight: 1920, // 最大の幅または高さ
          useWebWorker: true, // 圧縮処理をWeb Workerで実行する
        };

        const compressedFile = await imageCompression(file, options);
        setCompressedImage(compressedFile);

        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewUrl(reader.result as string);
          setIsLoading(false);
        };
        reader.readAsDataURL(compressedFile);
      } catch (error) {
        console.error("画像圧縮に失敗", error);
        setIsLoading(false);
      }
    } else {
      setPreviewUrl(null);
      setCompressedImage(null);
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);

    if (compressedImage) {
      formData.set("image", compressedImage, compressedImage.name);
    }

    formAction(formData);
  };

  {
    return (
      <div className={"min-h-screen right-0 left-0 bg-white"}>
        {isLoading && (
          <div className="absolute inset-0 z-[9999] ">
            <Loading />
          </div>
        )}
        <div className="bg-white shadow-md rounded p-4 mb-4 flex flex-col items-center">
          <form ref={formRef} onSubmit={handleSubmit} className="w-full">
            <div className="flex justify-between mb-2">
              <Link href={currentPath}>
                <Button>戻る</Button>
              </Link>
              <SubmitButton />
            </div>
            <textarea
              name="planContent"
              className="w-full h-24 p-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="メモリを記入"
              onChange={(e) => {
                setText(e.target.value);
              }}
            ></textarea>
            <div
              className={`${remLength >= 0 ? "" : "text-red-500"}`}
            >{`残り${remLength}文字`}</div>
            <input
              type="file"
              name="image"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/*"
            />
            {/* <input type="file" name='file' ref={fileSelectRef}/> */}
            <button
              type="button"
              onClick={triggerFileInput}
              className="bg-yellow-300 w-32 flex items-center rounded-md justify-center"
              disabled={isLoading}
            >
              <ImageIcon size={32} color="#1d0202" weight="light" />
              <a className="m-2">画像追加</a>
            </button>

            {/* lat lng */}
            <div className="mb-4 flex flex-wrap gap-4 items-center">
              {/* <label className="block mb-2">座標:</label> */}
              <input
                type="number"
                name="lat"
                value={marker?.lat}
                className="p-2 border border-gray-300 rounded hidden"
                readOnly
              />
              <input
                type="number"
                name="lng"
                value={marker?.lng}
                className="p-2 border border-gray-300 rounded hidden"
                readOnly
              />
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
          <div className="w-[80%] h-[50vh]"></div>
        </div>
      </div>
    );
  }
};

export default PlanForm;
