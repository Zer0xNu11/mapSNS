"use client";

import Loading from "@/app/loading";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ja from "date-fns/locale/ja";
import { searchPost } from "@/actions/searchPost";
import { useMarkerStore, usePostsSlot, useSearchedNoteSlot } from "@/store";
import { Alert, AlertDescription } from "@/components/ui/alert";

import { DownloadSimple } from "@phosphor-icons/react/dist/ssr/DownloadSimple";
import { XCircle } from "@phosphor-icons/react/dist/ssr/XCircle";

import { getNoteData } from "@/lib/getPosts";

const LoadNoteModal = ({ closeModal }: { closeModal: () => void }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [text, setText] = useState("");
  const { marker } = useMarkerStore();
  const { setSearchedNoteSlot } = useSearchedNoteSlot();
  const [showAlert, setShowAlert] = useState(false);

  const searchNoteId = async (noteId: string) => {
    setIsLoading(true);
    const data = await getNoteData(noteId);
    if (data) {
      setSearchedNoteSlot(data);
      setIsLoading(false);
      closeModal();
    } else {
      setShowAlert(true);

      // アラート非表示時間
      setTimeout(() => {
        setShowAlert(false);
      }, 1000);
      setIsLoading(false);
    }
  };

  const LoadingSmall = () => {
    return (
      <div className="flex justify-center items-center gap-6 mt-24">
        <div className="h-10 w-10 animate-spin border-[5px] border-gray-400 rounded-full  border-t-transparent"></div>
      </div>
    );
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-[9000]">
      {showAlert && (
        <div className="absolute bottom-80 right-0 top-0 left-0 m-auto w-64 h-2 z-[9999]">
          <Alert>
            <AlertDescription className="flex flex-col text-center items-center">
              <XCircle size={32} color="#ff6666" />
              <div className="mb-2 text-red-500">無効なコードです</div>
            </AlertDescription>
          </Alert>
        </div>
      )}
      <div className="bg-white absolute rounded p-4 flex flex-col  items-center w-[90%] max-w-md">
        <div className="flex flex-row gap-4 items-center">
          <form>
            <input
              type="text"
              placeholder="ノートコードを入力"
              className="bg-gray-200 h-12 w-[50vw] max-w-80 rounded-md text-center focus:outline-none focus:ring-0 focus:border-gray-300 "
              value={text}
              onSubmit={(e) => {
                e.preventDefault(); // フォームのデフォルトの送信を防ぐ
              }}
              onChange={(e) => {
                setText(e.target.value);
              }}
            />
          </form>
          <button
            onClick={() => searchNoteId(text)}
            className="bg-gray-200 rounded-xl w-12 h-12 flex justify-center items-center hover:bg-gray-300"
          >
            {" "}
            {isLoading ? (
              <LoadingSmall />
            ) : (
              <DownloadSimple size={32} weight="fill" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoadNoteModal;
