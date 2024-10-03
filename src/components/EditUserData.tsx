"use client";
import React, { useRef, useState } from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { useFormState, useFormStatus } from "react-dom";
import { createPlan } from "@/actions/createPlan";
import { updateUser } from "@/actions/updateUser";
import Image from "next/image";
import Loading from "@/app/loading";
import Link from "next/link";
import { Button } from "./ui/button";
import { Image as ImageIcon } from "@phosphor-icons/react/dist/ssr/Image";
import imageCompression from "browser-image-compression";

interface EditUserDataProps {
  data: DataType;
}

interface DataType {
  userId: string;
  userName: string;
  imageUrl?: string;
}

export interface EditUserFormState {
  error: string;
  userId: string;
  path: string;
}

const EditUserData = ({ data }: EditUserDataProps) => {
  const currentPath = `${process.env.NEXT_PUBLIC_BASE_URL}/bio-menu/${data.userId}`;

  const [titleText, setTitleText] = useState("");
  // const [text, setText] = useState('');
  const initialState: EditUserFormState = {
    error: "",
    userId: data.userId,
    path: currentPath,
  };
  const [state, formAction] = useFormState(updateUser, initialState);
  const limitLength = 16; //文字数制限
  const [remLength, setRemLength] = useState(limitLength);
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [compressedImage, setCompressedImage] = useState<File | null>(null);
  const [isImgDel, setIsImgDel] = useState<boolean>(false);
  const [presentImage, setPresentImage] = useState(data.imageUrl);

  const [name, setName] = useState(data.userName);

  const PendLoading = () => {
    const { pending } = useFormStatus();
    return pending ? <Loading /> : "";
  };

  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

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
      </>
    );
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsLoading(true);
      try {
        const options = {
          maxSizeMB: 0.5, // 最大サイズMB
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);

    if (compressedImage) {
      formData.set("image", compressedImage, compressedImage.name);
    }

    formAction(formData);
  };

  return (
    <div>
      <div className="relative bg-gray-500 w-full h-full ">
        <Link href={currentPath} className="absolute m-4">
          <Button>戻る</Button>
        </Link>
        <div className="absolute left-0 right-0 bottom-40 mx-auto z-50">
          <PendLoading />
        </div>
        <div className=" h-[100vh] flex flex-col items-center justify-center">
          <Avatar className="w-64 h-64">
            <AvatarImage
              src={previewUrl || presentImage || "/images/placeholder.png"}
            />
          </Avatar>
          <form
            action={formAction}
            onSubmit={handleSubmit}
            className="w-80 flex flex-col items-center"
          >
            <div className="flex flex-row">
              <button
                type="button"
                onClick={triggerFileInput}
                className="bg-yellow-300 w-32 flex items-center rounded-md justify-center mt-4"
                disabled={isLoading}
              >
                <ImageIcon size={32} color="#1d0202" weight="light" />
                <a className="m-2">画像変更</a>
              </button>
              <div className="mt-4">
                {previewUrl ? (
                  ""
                ) : data.imageUrl && !isImgDel ? (
                  <div className="flex flex-row items-center">
                    <button
                      className="bg-red-400 text-white rounded-xl h-10 w-32 mx-2"
                      onClick={() => {
                        setIsImgDel(true);
                        setPresentImage("");
                      }}
                    >
                      元画像削除
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
            </div>

            <input
              type="text"
              name="name"
              value={name}
              className="text-center my-4 h-12 text-lg rounded-lg min-w-72 focus:outline-none focus:ring-0 focus:border-gray-300 "
              onChange={(e) => {
                setName(e.target.value);
              }}
            />

            <input
              type="file"
              name="image"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/*"
            />

            <div className="flex justify-between mb-2">
              <SubmitButton />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditUserData;
