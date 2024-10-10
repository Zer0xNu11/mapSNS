"use client";

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
import { PlanPointType } from "@/types";
import { getPlanPoint } from "@/lib/getPlanData";
import { updatePlanPoint } from "@/actions/updatePlanPoint";
import { useSession } from "next-auth/react";

interface Params {
  params : {planPointId: string};
}

interface PlanEditFormProps {
  planPoint: PlanPointType;
}

interface PlanPointEditFormState {
  error: string,
  planId: string,
  path: string,
}

const EditPlanPointForm : React.FC<PlanEditFormProps>  = ({ planPoint }) => {
  const planPointId = planPoint.id;
  const currentPath = `${process.env.NEXT_PUBLIC_BASE_URL}/detail/planPoint/${planPointId}`;

  const [text, setText] = useState(planPoint.content ?? "");

  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  const limitLength = 60; //文字数制限
  const [remLength, setRemLength] = useState(limitLength);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [compressedImage, setCompressedImage] = useState<File | null>(null);
  const [isImgDel, setIsImgDel] = useState<boolean>(false);
  
  const initialState: PlanPointEditFormState = {
    error: "",
    planId: planPointId,
    path: currentPath,
  };
  const [state, formAction] = useFormState(updatePlanPoint, initialState);

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
          更新
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
              value={text}
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
              <a className="m-2">画像変更</a>
            </button>

            {/* lat lng */}
            {/* <div className="mb-4 flex flex-wrap gap-4 items-center">
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
            </div> */}
            <div className="mt-4">
              {previewUrl ? (
                <Image
                  src={previewUrl}
                  alt="プレビュー"
                  width={200}
                  height={200}
                  className="object-cover rounded"
                />
              ) : planPoint.imageUrl && !isImgDel ? (
                <div className="flex flex-row items-center">
                  <img
                    src={planPoint.imageUrl}
                    alt="プレビュー"
                    width={200}
                    height={200}
                    className="object-cover rounded"
                  />
                  <button
                    className="bg-red-400 text-white rounded-xl h-10 w-32 mx-2"
                    onClick={() => {
                      setIsImgDel(true);
                    }}
                  >
                    削除
                  </button>
                </div>
              ) : (
                ""
              )}
              <input
                type="checkbox"
                name="isImgDel"
                checked={isImgDel}
                className="hidden"
                readOnly
              />
            </div>
          </form>
          <div className="w-[80%] h-[50vh]"></div>
        </div>
      </div>
    );
  }
};


const EditPlanPointPage = ({ params }: Params) => {
  const [planPoint, setPlanPoint] = useState<PlanPointType>();

  useEffect(() => {
    const initialize = async () => {
      const data = await getPlanPoint(params.planPointId);
      if (data) {
        setPlanPoint(data);
      }
    };

    initialize();
  }, []);

  return <>{planPoint ? <EditPlanPointForm planPoint={planPoint} /> : "投稿読み込み中"}</>;
};

export default EditPlanPointPage;
