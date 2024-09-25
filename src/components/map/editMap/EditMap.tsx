"use client";
import { MapContainer, TileLayer } from "react-leaflet";
import { divIcon, LatLng, latLng } from "leaflet";
import "leaflet/dist/leaflet.css";
import "../map.css";
import { useEffect, useRef, useState } from "react";
import { getPosition } from "@/lib/getPostion";
import { LINE_COLOR, mapStyles } from "@/lib/mapSetting";
import { EditMapMarker } from "./EditMapMarker";
import { SearchResultMarkers } from "../SearchResultMarkers";

import "leaflet/dist/leaflet.css";
import { CaretLeft } from "@phosphor-icons/react/dist/ssr/CaretLeft";
import { CaretRight } from "@phosphor-icons/react/dist/ssr/CaretRight";
import { motion } from "framer-motion";
import { navHeight } from "@/lib/commonSetting";
import {
  useEditNote,
  useEditPlan,
  useListDisplayMode,
  useMapStyle,
  usePlanListDisplayMode,
  usePlanSlot,
  usePostsSlot,
  useSearchedNoteSlot,
  useUserMarkerStore,
} from "@/store";
import ListFromSort from "./ListFromSort";
import ListFromPlan from "./ListFromPlan";
import { getPlanData } from "@/lib/getPlanData";
import UserMarker from "../UserMarker";

import { MapPinSimpleArea } from "@phosphor-icons/react/dist/ssr/MapPinSimpleArea";
import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr/MagnifyingGlass";
import { MapTrifold } from "@phosphor-icons/react/dist/ssr/MapTrifold";
import { XSquare } from "@phosphor-icons/react/dist/ssr/XSquare";
import { MapPinPlus } from "@phosphor-icons/react/dist/ssr/MapPinPlus";
import { DownloadSimple } from "@phosphor-icons/react/dist/ssr/DownloadSimple";
import { ListMagnifyingGlass } from "@phosphor-icons/react/dist/ssr/ListMagnifyingGlass";
import { Notebook } from "@phosphor-icons/react/dist/ssr/Notebook";
import { FileArrowDown } from "@phosphor-icons/react/dist/ssr/FileArrowDown";

import { useNoteSlot } from "@/store";
import ListFromNoteId from "@/components/ListFromNoteId";
import { NoteLogMarker } from "../NoteLogMarker";
import { Button } from "@/components/ui/button";
import SearchModal from "../modal/SearchModal";
import SelectPlanModal from "../modal/SelectPlanModal";
import SelectNoteModal from "../modal/SelectNoteModal";
import { getNoteData } from "@/lib/getPosts";
import {
  getCurrentNoteData,
  getCurrentPlanData,
} from "@/lib/localStorageHandler";
import Link from "next/link";

export interface EditMapProps {}

const EditMap: React.FC<EditMapProps> = ({}) => {
  const [position, setPosition] = useState<LatLng | null>(null);

  const [isSearchModal, setIsSearchModal] = useState(false);
  const [isSelectPlanModal, setIsSelectPlanModal] = useState(false);
  const [isSelectNoteModal, setIsSelectNoteModal] = useState(false);
  const [noteMode, setNoteMode] = useState("selfNote"); //selfNote, searchNote

  const { listDisplayMode, setListDisplayMode } = useListDisplayMode();
  const { planListDisplayMode, setPlanListDisplayMode } =
    usePlanListDisplayMode();

  const { planSlot, setPlanSlot } = usePlanSlot();
  const { postsSlot, setPostsSlot } = usePostsSlot();
  const { noteSlot, setNoteSlot } = useNoteSlot();
  const { searchedNoteSlot, setSearchedNoteSlot } = useSearchedNoteSlot();
  const { editPlanData, setEditPlanData } = useEditPlan();
  const { editNoteData, setEditNoteData } = useEditNote();
  const { mapStyle, setMapStyle } = useMapStyle();
  const { setUserMarker } = useUserMarkerStore();

  const closeNoteModalRef = useRef(null);
  const closePlanModalRef = useRef(null);

  const modeChangeButton = () => {
    listDisplayMode === "list"
      ? setListDisplayMode("map")
      : setListDisplayMode("list");
  };

  const planModeChangeButton = () => {
    planListDisplayMode === "list"
      ? setPlanListDisplayMode("map")
      : setPlanListDisplayMode("list");
  };

  const noteModeChangeButton = () => {
    console.log("clicked");
    noteMode === "selfNote"
      ? setNoteMode("searchNote")
      : setNoteMode("selfNote");
    console.log(listDisplayMode);
  };

  const changeMapStyle = () => {
    setMapStyle(
      mapStyle === mapStyles.google ? mapStyles.blackWhite : mapStyles.google
    );
  };

  // const planModalHandler = () =>{
  //   setIsSelectPlanModal(true)
  // }

  useEffect(() => {
    async function initializeMap() {
      const point = await getPosition();

      if (point) {
        setPosition(latLng([point.lat, point.lng]));
        setUserMarker(latLng([point.lat, point.lng]));
      } else {
        // デフォルトの位置
        setPosition(latLng([35.680522, 139.766566]));
        setUserMarker(latLng([35.680522, 139.766566]));
      }
    }

    initializeMap();
    console.log({ position: position });
  }, []);

  useEffect(() => {
    async function slotInitializing() {
      setPostsSlot([]);
      setSearchedNoteSlot([]);
    }

    slotInitializing();
  }, []);

  useEffect(() => {
    async function editSlotInitializing() {
      //note初期読み込み
      const currentNoteData = getCurrentNoteData();
      const noteId = currentNoteData.id;
      const noteTitle = currentNoteData.title;
      if (noteId && noteTitle) {
        setEditNoteData(noteId, noteTitle);
      } else {
        setNoteSlot([]);
      }

      //plan初期読み込み
      const currentPlanData = getCurrentPlanData();
      const planId = currentPlanData.id;
      const planTitle = currentPlanData.title;
      if (planId && planTitle) {
        setEditPlanData(planId, planTitle);
      }
    }

    editSlotInitializing();
  }, []);

  useEffect(() => {
    async function editSlotUpdating() {
      //note読み込み
      const noteId = editNoteData.id;
      const noteTitle = editNoteData.title;
      if (noteId && noteTitle) {
        const data = await getNoteData(noteId);
        setNoteSlot(data);
      } else {
        setNoteSlot([]);
      }

      //plan読み込み
      const planId = editPlanData.id;
      const planTitle = editPlanData.title;
      if (planId && planTitle) {
        const data = await getPlanData(planId);
        setPlanSlot(data);
      } else {
        setPlanSlot([]);
      }
    }

    editSlotUpdating();
  }, [editNoteData, editPlanData]);

  // useEffect(() => {
  //   console.log("postsSlot changed");
  // }, [postsSlot]);

  // const onClickCreatedAt = async () => {
  //   const postPoints = await getPostPointsCreatedAt();
  //   setPostsSlot(postPoints);
  // };

  // 初期マップズームレベル
  const zoom = 15;

  if (!position) {
    return <div>Loading map...</div>;
  }

  const menuVariants = {
    closed: {
      x: "100%",
      pointerEvents: "none" as "none",
    },
    open: {
      x: 0,
      pointerEvents: "auto" as "auto",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
  };

  const menuButtonVariants = {
    closed: {
      x: 0,
    },
    open: {
      x: -374,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
  };

  const menuButtonVariantsSmall = {
    closed: {
      x: 0,
    },
    open: {
      x: "calc(-83vw)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
  };

  const planMenuVariants = {
    closed: {
      x: "-100%",
      pointerEvents: "none" as "none",
    },
    open: {
      x: 0,
      pointerEvents: "auto" as "auto",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
  };

  const planMenuButtonVariants = {
    closed: {
      x: 0,
    },
    open: {
      x: 374,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
  };

  const planMenuButtonVariantsSmall = {
    closed: {
      x: 0,
    },
    open: {
      x: "calc(83vw)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
  };

  return (
    <>
      {isSearchModal && (
        <div className="fixed top-4 right-4 z-[9999]">
          <button onClick={() => setIsSearchModal(false)}>
            <XSquare size={48} color="#f1f1f3" weight="fill" />
          </button>
        </div>
      )}
      {isSearchModal && (
        <SearchModal closeModal={() => setIsSearchModal(false)} />
      )}

      {isSelectNoteModal && (
        <div className="fixed top-4 right-4 z-[9999]">
          <button
            ref={closeNoteModalRef}
            onClick={() => setIsSelectNoteModal(false)}
          >
            <XSquare size={48} color="#f1f1f3" weight="fill" />
          </button>
        </div>
      )}
      {isSelectNoteModal && (
        <SelectNoteModal closeButtonRef={closeNoteModalRef} />
      )}

      {isSelectPlanModal && (
        <div className="fixed top-4 right-4 z-[9999]">
          <button
            ref={closePlanModalRef}
            onClick={() => setIsSelectPlanModal(false)}
          >
            <XSquare size={48} color="#f1f1f3" weight="fill" />
          </button>
        </div>
      )}
      {isSelectPlanModal && (
        <SelectPlanModal closeButtonRef={closePlanModalRef} />
      )}

      {/* 検索リスト */}
      <div className="w-full h-[100vh]">
        <motion.div
          className="xs:hidden  fixed right-0 top-0 bottom-0 my-auto h-20 z-[1000]"
          initial="closed"
          animate={listDisplayMode === "list" ? "open" : "closed"}
          variants={menuButtonVariantsSmall}
        >
          <button className=" h-20 z-[1000]" onClick={modeChangeButton}>
            {listDisplayMode === "list" ? (
              <CaretRight size={32} color="#6b6b6b" weight="light" />
            ) : (
              <CaretLeft size={32} color="#3d3d3d" weight="light" />
            )}
          </button>
        </motion.div>
        <motion.div
          className="xs:fixed right-0 top-0 bottom-0 my-auto h-20 z-[1000]"
          initial="closed"
          animate={listDisplayMode === "list" ? "open" : "closed"}
          variants={menuButtonVariants}
        >
          <button className=" h-20 z-[1000]" onClick={modeChangeButton}>
            {listDisplayMode === "list" ? (
              <CaretRight size={32} color="#6b6b6b" weight="light" />
            ) : (
              <CaretLeft size={32} color="#3d3d3d" weight="light" />
            )}
          </button>
        </motion.div>
        <motion.div
          className={`absolute bg-gray-100  top-0 pt-[${navHeight}px] overflow-y-scroll w-[90vw] right-0 z-[500] xs:w-[400px] h-[100vh]`}
          initial="closed"
          animate={listDisplayMode === "list" ? "open" : "closed"}
          variants={menuVariants}
          aria-hidden={listDisplayMode !== "list"}
        >
          <div className="bg-yellow-600 w-full h-16 flex flex-row justify-end items-center gap-4">
            {/* ノートスロット */}
            {noteMode === "selfNote" ? (
              <div className="flex flex-row items-center justify-between">
                {editNoteData.title ? (
                  <div className="flex flex-row justify-end items-center text-xl gap-4">
                    <div>{editNoteData.title}</div>
                    <Button onClick={() => setIsSelectNoteModal(true)}>
                      <DownloadSimple size={32} weight="fill" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex justify-center">
                    <Button onClick={() => setIsSelectNoteModal(true)}>
                      <div className="mx-2">記録ノートを選択</div>
                      <DownloadSimple size={32} weight="fill" />
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-row justify-end items-center text-xl gap-4">
                <div className="font-bold text-xl text-white w-full text-center">
                  検索結果
                </div>
                <Button onClick={() => setIsSelectNoteModal(true)}>
                  <FileArrowDown size={32} color="#f2f2f2" weight="fill" />
                </Button>
              </div>
            )}
            {/* 検索ノート切り替え */}
            <div>
              <Button onClick={noteModeChangeButton}>
                {noteMode === "selfNote" ? (
                  <div>
                    <ListMagnifyingGlass
                      size={32}
                      color="#f6f6f9"
                      weight="fill"
                    />
                  </div>
                ) : (
                  <div>
                    <Notebook size={32} color="#f6f6f9" weight="fill" />
                  </div>
                )}
              </Button>
            </div>
          </div>

          {noteMode === "selfNote" ? (
            <ListFromNoteId postsData={noteSlot} />
          ) : (
            ""
          )}
          {noteMode === "searchNote" ? (
            <div>
              <ListFromSort postsData={postsSlot} />
              {searchedNoteSlot.length > 0 ? (
                <div>
                  <div className="flex justify-center items-center">
                    <div className="text-xl inline-block mb-2 mr-4">
                      Users Note
                    </div>
                    <div>
                      <button onClick={() => setSearchedNoteSlot([])}>
                        <XSquare size={32} color="#080707" weight="fill" />
                      </button>
                    </div>
                  </div>
                  <ListFromNoteId postsData={searchedNoteSlot} />
                </div>
              ) : (
                ""
              )}
            </div>
          ) : (
            ""
          )}
        </motion.div>
        {/* プランリスト */}
        <div>
          <motion.div
            className="xs:hidden  fixed left-0 top-0 bottom-0 my-auto h-20 z-[1000]"
            initial="closed"
            animate={planListDisplayMode === "list" ? "open" : "closed"}
            variants={planMenuButtonVariantsSmall}
          >
            <button className=" h-20 z-[1000]" onClick={planModeChangeButton}>
              {planListDisplayMode === "list" ? (
                <CaretLeft size={32} color="#6b6b6b" weight="light" />
              ) : (
                <CaretRight size={32} color="#3d3d3d" weight="light" />
              )}
            </button>
          </motion.div>
          <motion.div
            className="xs:fixed left-0 top-0 bottom-0 my-auto h-20 z-[1000]"
            initial="closed"
            animate={planListDisplayMode === "list" ? "open" : "closed"}
            variants={planMenuButtonVariants}
          >
            <button className=" h-20 z-[1000]" onClick={planModeChangeButton}>
              {planListDisplayMode === "list" ? (
                <CaretLeft size={32} color="#6b6b6b" weight="light" />
              ) : (
                <CaretRight size={32} color="#3d3d3d" weight="light" />
              )}
            </button>
          </motion.div>
          <motion.div
            className={`absolute bg-blue-100  top-0 pt-[${navHeight}px] overflow-y-scroll w-[90vw] left-0 z-[500] xs:w-[400px] h-[100vh]`}
            initial="closed"
            animate={planListDisplayMode === "list" ? "open" : "closed"}
            variants={planMenuVariants}
            aria-hidden={planListDisplayMode !== "list"}
          >
            <div className="bg-sky-500 w-full h-16 flex flex-row items-center">
              {editPlanData.title ? (
                <div className="flex flex-row items-center text-xl w-full justify-end gap-4">
                  <div className="w-full">{editPlanData.title}</div>
                  <Button
                    className="mx-4"
                    onClick={() => setIsSelectPlanModal(true)}
                  >
                    <DownloadSimple size={32} weight="fill" />
                  </Button>
                </div>
              ) : (
                <div className="w-full flex justify-center">
                  <Button onClick={() => setIsSelectPlanModal(true)}>
                    <div className="mx-2">プランを選択</div>
                    <DownloadSimple size={32} weight="fill" />
                  </Button>
                </div>
              )}
            </div>
            {editPlanData.id ? <ListFromPlan planId={editPlanData.id} /> : ""}
          </motion.div>
        </div>
        <div className={`absolute top-0 pt-[${navHeight}px]  w-full h-[100vh]`}>
          <MapContainer center={position} zoom={zoom} zoomControl={false}>
            <TileLayer
              attribution={mapStyle.attribution}
              url={mapStyle.style}
              maxZoom={20}
              minZoom={2}
            />
            <EditMapMarker
              planId={editPlanData.id}
              position={position}
              polylineCoordinates={planSlot.map((item) => item.coordinates)}
              planPoints={planSlot.map((item) => ({
                id: item.id,
                content: item.content,
                coordinates: item.coordinates,
                imageUrl: item.imageUrl,
              }))}
            />
            {postsSlot ? (
              <SearchResultMarkers planId={editPlanData.id} posts={postsSlot} />
            ) : (
              ""
            )}
            <NoteLogMarker
              pathOption={LINE_COLOR.paleRed}
              posts={searchedNoteSlot}
              polylineCoordinates={searchedNoteSlot.map(
                (item) => item.coordinates
              )}
              searchedMode={true}
              planId={editPlanData.id}
            />
            <NoteLogMarker
              pathOption={LINE_COLOR.red}
              posts={noteSlot}
              polylineCoordinates={noteSlot.map((item) => item.coordinates)}
            />
            <UserMarker />
          </MapContainer>
        </div>
        <div className="fixed bottom-0 right-0 h-16 my-4 mr-8 z-[1000]">
          <button className="bg-green-400 rounded-full p-2 m-2 border-black border-2">
            <MapPinSimpleArea size={32} color="#050505" weight="duotone" />
          </button>
          <button
            className="bg-green-400 rounded-full p-2 m-2 border-black border-2"
            onClick={() => setIsSearchModal(true)}
          >
            <MagnifyingGlass size={32} color="#050505" />
          </button>
          <button
            className="bg-green-400 rounded-full p-2 m-2 border-black border-2"
            onClick={() => changeMapStyle()}
          >
            <MapTrifold size={32} color="#080707" weight="fill" />
          </button>
          <Link
            href={`${process.env.NEXT_PUBLIC_BASE_URL}/create/post/${editNoteData.id}`}
          >
            <button
              className="bg-green-400 rounded-full p-2 m-2 border-black border-2 disabled:opacity-50 "
              disabled={editNoteData.id ? false : true}
            >
              <MapPinPlus size={32} color="#050505" weight="fill" />
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default EditMap;
