"use client";

import Loading from "@/app/loading";
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ja from "date-fns/locale/ja";
import { ChevronDown, ChevronUp } from "lucide-react";
import { searchPost } from "@/actions/searchPost";
import { useMarkerStore, usePostsSlot } from "@/store";
import SearchModalRadiusSelector from "./SearchModalRadiusSelector";
import { getSearchFormCondition } from "@/lib/localStorageHandler";
import { X } from "@phosphor-icons/react/dist/ssr/X";

export interface formConditionDataProps {
  searchText: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  category: { food: boolean; base: boolean; other: boolean };
  isOwnPost: boolean;
  likes: string;
  maxLikes: string;
}

const SearchModal = ({
  closeModal,
  formConditionData,
}: {
  closeModal: () => void;
  formConditionData: formConditionDataProps;
}) => {
  const [isDetailSort, setIsDetailSort] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState(formConditionData.searchText);
  const [startDate, setStartDate] = useState<Date | undefined>(
    formConditionData.startDate
  );
  const [endDate, setEndDate] = useState<Date | undefined>(
    formConditionData.endDate
  );
  const [category, setCategory] = useState(formConditionData.category);
  const [isOwnPost, setIsOwnPost] = useState(formConditionData.isOwnPost);
  const [likes, setLikes] = useState(formConditionData.likes);
  const [maxLikes, setMaxLikes] = useState(formConditionData.maxLikes);
  const [radius, setRadius] = useState("");
  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory({ ...category, [e.target.name]: e.target.checked });
  };
  const { marker } = useMarkerStore();
  const { setPostsSlot } = usePostsSlot();

  const saveData = async () => {
    const formCondition = {
      searchText,
      startDate,
      endDate,
      category,
      isOwnPost,
      likes,
      maxLikes,
    };
    setIsLoading(true);
    try {
      localStorage.setItem("formCondition", JSON.stringify(formCondition));
      console.log(formCondition);
      // const data = await searchPost(formData);
      // if (data) {
      //   console.log("Data exits");
      //   setPostsSlot(data);
      // }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      closeModal();
    }
  };

  const resetFormCondition = () => {
    setSearchText("");
    setStartDate(undefined);
    setEndDate(undefined);
    setCategory({ food: true, base: true, other: true });
    setIsOwnPost(false);
    setLikes("");
    setMaxLikes("");
  };

  const PendLoading = () => {
    const { pending } = useFormStatus();
    return pending ? <Loading /> : "";
  };

  registerLocale("ja", ja as any);

  const SubmitButton = () => {
    const { pending } = useFormStatus();
    return (
      <>
        <button
          type="submit"
          className={`mt-2 bg-gray-700 hover:bg-gray-600 duration-200 text-white font-semibold max-w-40 py-2 px-4 rounded disabled:bg-gray-300 mx-auto`}
          disabled={pending}
        >
          検索条件を保存
        </button>
        <PendLoading />
      </>
    );
  };

  const FormClearButton = () => {
    return (
      <>
        <button
          onClick={resetFormCondition}
          className="m-2 flex gap-1 text-sm items-center justify-center bg-gray-700 hover:bg-gray-600 duration-200 text-white font-semibold max-w-40 py-2 px-4 rounded disabled:bg-gray-300 mx-auto"
        >
          <X size={20} color="#fcfcfc" weight="bold" />
          <div>条件をクリア</div>
        </button>
      </>
    );
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-[9000]">
      <div className="bg-white absolute rounded p-4 flex flex-col  items-center w-[90%] max-w-md">
        <div className="flex-grow overflow-y-scroll w-full px-2 pb-4 max-h-[70vh]">
          <div className="w-full bg-gray-700 text-center text-2xl text-white p-2 mb-4">
            検索条件設定
          </div>
          <div className="mb-4">
            <FormClearButton />
          </div>
          <form action={saveData} className="flex flex-col w-full">
            <span>検索キーワード:</span>
            <input
              name="keyword"
              className="w-full p-2 mt-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="キーワードを入力"
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
              value={searchText}
            ></input>

            {/* エリア半径 */}
            {/* <SearchModalRadiusSelector /> */}

            <div className="mb-4">
              {/* <button
                type="button"
                onClick={() => setIsDetailSort(!isDetailSort)}
                className="flex items-center justify-between w-full p-2 bg-gray-100 rounded"
              >
                <span>詳細検索オプション</span>
                {isDetailSort ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </button> */}

              {/* {isDetailSort && ( */}
              <div className="mt-4 space-y-4">
                {/* 日付範囲 */}
                <label className="block my-2">日付範囲:</label>
                <div className="mb-4 flex flex-wrap gap-2">
                  <DatePicker
                    selected={startDate}
                    onChange={(date: Date | null) =>
                      setStartDate(date ?? undefined)
                    }
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    locale="ja"
                    dateFormat="yyyy/MM/dd"
                    placeholderText="開始日"
                    className="p-2 border border-gray-300 rounded"
                    name="startDate"
                  />
                  <DatePicker
                    selected={endDate}
                    onChange={(date: Date | null) =>
                      setEndDate(date ?? undefined)
                    }
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    locale="ja"
                    minDate={startDate}
                    dateFormat="yyyy/MM/dd"
                    placeholderText="終了日"
                    className="p-2 border border-gray-300 rounded"
                    name="endDate"
                  />
                </div>
                {/* category 選択 */}
                <div className="mb-4 flex flex-wrap gap-4">
                  <label className="block">カテゴリ:</label>
                  <div>
                    <label className="inline-flex items-center mr-4">
                      <input
                        type="checkbox"
                        name="food"
                        checked={category.food}
                        onChange={handleCategoryChange}
                        className="form-checkbox"
                      />
                      <span className="ml-2">食事</span>
                    </label>
                    <label className="inline-flex items-center mr-4">
                      <input
                        type="checkbox"
                        name="base"
                        checked={category.base}
                        onChange={handleCategoryChange}
                        className="form-checkbox"
                      />
                      <span className="ml-2">宿泊</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        name="other"
                        checked={category.other}
                        onChange={handleCategoryChange}
                        className="form-checkbox"
                      />
                      <span className="ml-2">その他</span>
                    </label>
                  </div>
                </div>

                {/* いいねの数 */}
                <label className="block mb-2 w-24">いいねの数:</label>
                <div className="mb-4 flex flex-grow items-center justify-between">
                  <input
                    type="number"
                    name="likes"
                    value={likes}
                    onChange={(e) => setLikes(e.target.value)}
                    className="p-2 border border-gray-300 rounded min-w-0"
                    placeholder="最小数"
                  />
                  <div className="text-xl mx-2">~</div>
                  <input
                    type="number"
                    name="maxLikes"
                    value={maxLikes}
                    onChange={(e) => setMaxLikes(e.target.value)}
                    className="p-2 border border-gray-300 rounded min-w-0"
                    placeholder="最大数"
                  />
                </div>

                {/* lat lng */}
                <div className="mb-4 hidden gap-4 items-center">
                  <label className="block mb-2">座標:</label>
                  <input
                    type="number"
                    name="lat"
                    value={marker?.lat}
                    className="p-2 border border-gray-300 rounded"
                    readOnly
                  />
                  <input
                    type="number"
                    name="lng"
                    value={marker?.lng}
                    className="p-2 border border-gray-300 rounded"
                    readOnly
                  />
                </div>

                {/* 自身の投稿を検索に含めるか */}
                <div>
                  <label className="inline-flex items-center mr-4">
                    <input
                      type="checkbox"
                      name="ownPost"
                      checked={isOwnPost}
                      onChange={() => setIsOwnPost(!isOwnPost)}
                      className="form-checkbox"
                    />
                    <span className="ml-2">検索結果に自分の投稿を含める</span>
                  </label>
                </div>
              </div>
              {/* )} */}
            </div>
            <SubmitButton />
          </form>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
