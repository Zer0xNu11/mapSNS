"use client";

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
import CategorySelector from "@/components/Post/CategorySelector";
import { getPost } from "@/lib/getPosts";
import { updatePost } from "@/actions/updatePost";
import { PostType } from "@/types";

import imageCompression from 'browser-image-compression';

interface Params {
  params: { postId: string };
}

interface PostEditFormProps {
  post: PostType;
}

interface PostEditFormState {
  error: string;
  postId: string;
  path: string;
  positionLat?: number | null;
  positionLng?: number | null;
  // position? : {lat:number | null, lng:number | null};
}

const PostEditForm: React.FC<PostEditFormProps> = ({ post }) => {
  const postId = post.id;
  const currentPath = `${process.env.NEXT_PUBLIC_BASE_URL}/detail/post/${postId}`;
  const [text, setText] = useState(post.content ?? "");

  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  const limitLength = 60; //文字数制限
  const [remLength, setRemLength] = useState(limitLength);
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null | undefined>(
    undefined
  );
  const [compressedImage, setCompressedImage] = useState<File | null>(null);
  const [isImgDel, setIsImgDel] = useState<boolean>(false);

  const initialState: PostEditFormState = {
    error: "",
    postId: postId,
    path: currentPath,
  };
  const [state, formAction] = useFormState(updatePost, initialState);

  const { marker } = useMarkerStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

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
          保存
        </button>
        <PendLoading />
      </>
    );
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsLoading(true);
      try{
        const options = {
          maxSizeMB: 1, // 最大サイズMB
          maxWidthOrHeight: 1920, // 最大の幅または高さ
          useWebWorker: true, // 圧縮処理をWeb Workerで実行する
        }

        const compressedFile = await imageCompression(file, options);
        setCompressedImage(compressedFile);

        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewUrl(reader.result as string);
          setIsLoading(false);
        };
        reader.readAsDataURL(compressedFile);


      }catch(error){
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
      formData.set('image', compressedImage, compressedImage.name);
    }

    formAction(formData);
  };

  {
    return (
      <div className={"min-h-screen right-0 left-0 bg-gray-100 "}>
          {isLoading && (
          <div className="absolute inset-0 z-[9999] ">
            <Loading />
          </div>
        )}
        <div className="bg-white shadow-md rounded p-4 mb-4 flex flex-col items-center">
          <form ref={formRef} onSubmit={handleSubmit} className="w-full">
            <div className="flex justify-between mb-2">
              <Link href={currentPath}>
                <Button>←戻る</Button>
              </Link>
              <SubmitButton />
            </div>
            <textarea
              name="post"
              className="w-full h-24 p-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={text}
              onChange={(e) => {
                setText(e.target.value);
              }}
            ></textarea>
            <div
              className={`text-right ${remLength >= 0 ? "" : "text-red-500"}`}
            >{`残り${remLength}文字`}</div>
            <CategorySelector value = {post.category}/>
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
                disabled={isLoading}
              >
                <ImageIcon size={32} color="#1d0202" weight="light" />
                <a className="m-2">画像変更</a>
              </button>
            </div>

            <div className="mt-4">
              {previewUrl ? (
                <Image
                  src={previewUrl}
                  alt="プレビュー"
                  width={200}
                  height={200}
                  className="object-cover rounded"
                />
              ) : post.imageUrl && !isImgDel ? (
                <div className="flex flex-row items-center">
                  <img
                    src={post.imageUrl}
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
            </div>
            <input
              type="checkbox"
              name="isImgDel"
              checked={isImgDel}
              className="hidden"
              readOnly
            />
          </form>
          <div className="mt-4 w-[90%] h-[40vh] flex flex-col">
            <label>位置調整</label>
            <PostLocation isEdit={true} />
          </div>
        </div>
      </div>
    );
  }
};

const EditPage = ({ params }: Params) => {
  const [post, setPost] = useState<PostType>();

  useEffect(() => {
    const initialize = async () => {
      const data = await getPost(params.postId);
      if (data) {
        setPost(data);
      }
    };

    initialize();
  }, []);

  return <>{post ? <PostEditForm post={post} /> : "投稿読み込み中"}</>;
};

export default EditPage;
