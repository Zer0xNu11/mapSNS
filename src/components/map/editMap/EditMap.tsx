"use client";
import { MapContainer, TileLayer, useMap, useMapEvents } from "react-leaflet";
import { LatLng, latLng } from "leaflet";
import "leaflet/dist/leaflet.css";
import "../map.css";
import { useCallback, useEffect, useRef, useState } from "react";
import { getPosition } from "@/lib/getPostion";
import { LINE_COLOR, mapStyles } from "@/lib/mapSetting";
import { EditMapMarker } from "./EditMapMarker";
import { SearchResultMarkers } from "../SearchResultMarkers";
import L from "leaflet";

import "leaflet/dist/leaflet.css";
import { CaretLeft } from "@phosphor-icons/react/dist/ssr/CaretLeft";
import { CaretRight } from "@phosphor-icons/react/dist/ssr/CaretRight";
import { GearSix } from "@phosphor-icons/react/dist/ssr/GearSix";
import { motion } from "framer-motion";
import { navHeight } from "@/lib/commonSetting";
import {
  useEditNote,
  useEditPlan,
  useFocusCoordinate,
  useListDisplayMode,
  useMapStyle,
  useMarkerStore,
  usePlanListDisplayMode,
  usePlanMarkerDisplayMode,
  usePlanSlot,
  usePostsSlot,
  useSearchedNoteSlot,
  useSearchingMode,
  useUserMarkerStore,
} from "@/store";
import ListFromSort from "./ListFromSort";
import ListFromPlan from "./ListFromPlan";
import { getPlanData } from "@/lib/getPlanData";
import UserMarker from "../UserMarker";

import { MapPinSimpleArea } from "@phosphor-icons/react/dist/ssr/MapPinSimpleArea";
import { MapPinArea } from "@phosphor-icons/react/dist/ssr/MapPinArea";
import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr/MagnifyingGlass";
import { MapTrifold } from "@phosphor-icons/react/dist/ssr/MapTrifold";
import { XSquare } from "@phosphor-icons/react/dist/ssr/XSquare";
import { MapPinPlus } from "@phosphor-icons/react/dist/ssr/MapPinPlus";
import { DownloadSimple } from "@phosphor-icons/react/dist/ssr/DownloadSimple";
import { ArrowsDownUp } from "@phosphor-icons/react/dist/ssr/ArrowsDownUp";
import { Notebook } from "@phosphor-icons/react/dist/ssr/Notebook";
import { ArrowsClockwise } from "@phosphor-icons/react/dist/ssr/ArrowsClockwise";
import { FileArrowDown } from "@phosphor-icons/react/dist/ssr/FileArrowDown";
import { Crosshair } from "@phosphor-icons/react/dist/ssr/Crosshair";
import { LineSegments } from "@phosphor-icons/react/dist/ssr/LineSegments";

import { useNoteSlot } from "@/store";
import ListFromNoteId from "@/components/ListFromNoteId";
import { NoteLogMarker } from "../NoteLogMarker";
import { Button } from "@/components/ui/button";
import SearchModal, { formConditionDataProps } from "../modal/SearchModal";
import SelectPlanModal from "../modal/SelectPlanModal";
import SelectNoteModal from "../modal/SelectNoteModal";
import { getNoteData } from "@/lib/getPosts";
import {
  getCurrentNoteData,
  getCurrentPlanData,
  getSearchFormCondition,
} from "@/lib/localStorageHandler";
import Link from "next/link";
import GpsButton from "../GpsButton";
import GetGpsButton from "./GetGpsButton";
import LoadNoteModal from "../modal/LoadNoteModal";
import { AuthorButton } from "@/components/Post/AuthorButton";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import DatePicker, { registerLocale } from "react-datepicker";
import { searchPost } from "@/actions/searchPost";
import ja from "date-fns/locale/ja";
import { Star } from "@phosphor-icons/react/dist/ssr/Star";

const MapUpdater = () => {
  const map = useMap();
  const { focusCoordinate } = useFocusCoordinate();
  const { planListDisplayMode } = usePlanListDisplayMode();
  const { listDisplayMode } = useListDisplayMode();

  useEffect(() => {
    if (focusCoordinate) {
      const windowWidth = 374;
      const offset =
        planListDisplayMode === "map"
          ? listDisplayMode === "map"
            ? 0
            : windowWidth / 2
          : listDisplayMode === "map"
          ? -windowWidth / 2
          : 0;

      // const currentCenter = map.getCenter();
      const newCenter = map.containerPointToLatLng(
        map.latLngToContainerPoint(focusCoordinate).add([offset, 0])
      );
      map.setView(newCenter, map.getZoom(), { animate: true });
    }
  }, [focusCoordinate, map, planListDisplayMode, listDisplayMode]);

  return null;
};

interface MapEventHandlerProps {
  onRightClick: (latlng: L.LatLng) => void;
}

function MapEventHandler({ onRightClick }: MapEventHandlerProps) {
  useMapEvents({
    contextmenu: (e) => {
      e.originalEvent.preventDefault(); // デフォルトの右クリックメニューを防ぐ
      onRightClick(e.latlng);
    },
  });
  return null;
}

export interface EditMapProps {}

const EditMap: React.FC<EditMapProps> = ({}) => {
  const [position, setPosition] = useState<LatLng | null>(null);

  const [isSearchModal, setIsSearchModal] = useState(false);
  const [isSelectPlanModal, setIsSelectPlanModal] = useState(false);
  const [isSelectNoteModal, setIsSelectNoteModal] = useState(false);
  const [noteMode, setNoteMode] = useState("selfNote"); //selfNote, searchNote
  const [isLoadNoteModal, setIsLoadNoteModal] = useState(false);

  const { listDisplayMode, setListDisplayMode } = useListDisplayMode();
  const { planListDisplayMode, setPlanListDisplayMode } =
    usePlanListDisplayMode();
  const { planMarkerDisplayMode, setPlanMarkerDisplayMode } =
    usePlanMarkerDisplayMode();

  const { planSlot, setPlanSlot } = usePlanSlot();
  const { postsSlot, setPostsSlot } = usePostsSlot();
  const { noteSlot, setNoteSlot } = useNoteSlot();
  const { searchedNoteSlot, setSearchedNoteSlot } = useSearchedNoteSlot();
  const { editPlanData, setEditPlanData } = useEditPlan();
  const { editNoteData, setEditNoteData } = useEditNote();
  const { mapStyle, setMapStyle } = useMapStyle();
  const { userMarker, setUserMarker } = useUserMarkerStore();
  const { marker, setMarker } = useMarkerStore();
  const { focusCoordinate, setFocusCoordinate } = useFocusCoordinate();
  const { searchingMode, setSearchingMode } = useSearchingMode();

  // form  ===================================================================
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [category, setCategory] = useState({
    food: true,
    base: true,
    other: true,
  });
  const [isOwnPost, setIsOwnPost] = useState(false);
  const [likes, setLikes] = useState("");
  const [maxLikes, setMaxLikes] = useState("");
  const [radius, setRadius] = useState("");

  const [formConditionData, setFormConditionData] =
    useState<formConditionDataProps>();

  registerLocale("ja", ja as any);

  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const searchButtonHandler = () => {
    submitButtonRef.current?.click();
    setSearchingMode("on");
  };

  const getData = async (formData: FormData) => {
    setIsLoading(true);
    try {
      const data = await searchPost(formData);
      if (data) {
        console.log("Data exits");
        setPostsSlot(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    async function setFormCondition() {
      const formCondition = await getSearchFormCondition();
      setFormConditionData(formCondition);

      setSearchText(formCondition.searchText);
      setStartDate(formCondition.startDate);
      setEndDate(formCondition.endDate);
      setCategory(formCondition.category);
      setIsOwnPost(formCondition.isOwnPost);
      setLikes(formCondition.likes);
      setMaxLikes(formCondition.maxLikes);
    }

    setFormCondition();
    console.log({ searchText, startDate, endDate, category, likes, maxLikes });
  }, [isSearchModal]);
  // ==========================================================================

  const closeNoteModalRef = useRef(null);
  const closePlanModalRef = useRef(null);

  const openSearchModal = () => {
    setIsSearchModal(true);
  };

  const handleRightClick = useCallback((latlng: L.LatLng) => {
    console.log("Right clicked at:", latlng);
    setMarker(latlng);
    setSearchingMode("set");
  }, []);

  useEffect(() => {
    async function searching() {
      if (searchingMode === "set") {
        searchButtonHandler();
      }
    }

    searching();
  }, [marker]);

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

  async function getCurrentPoint() {
    const point = await getPosition();
    console.log({ point: point });

    if (point != null) {
      setMarker(latLng([point.lat, point.lng]));
      setUserMarker(latLng([point.lat, point.lng]));
      setSearchingMode("off");
    } else {
      // デフォルトの位置
      setMarker(latLng([35.680522, 139.766566]));
      setUserMarker(latLng([35.680522, 139.766566]));
      setSearchingMode("off");
      console.log({ position: "デフォルト" });
    }
  }

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
      {isSearchModal && formConditionData && (
        <SearchModal
          formConditionData={formConditionData}
          closeModal={() => setIsSearchModal(false)}
        />
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

      {isLoadNoteModal && (
        <div className="fixed top-4 right-4 z-[9999]">
          <button onClick={() => setIsLoadNoteModal(false)}>
            <XSquare size={48} color="#f1f1f3" weight="fill" />
          </button>
        </div>
      )}
      {isLoadNoteModal && (
        <LoadNoteModal closeModal={() => setIsLoadNoteModal(false)} />
      )}
      {/* 検索リスト */}
      <div className="w-full h-[100vh]">
        <motion.div
          className="xs:hidden  fixed right-0 top-0 bottom-0 my-auto h-20 z-[1000]"
          initial="closed"
          animate={listDisplayMode === "list" ? "open" : "closed"}
          variants={menuButtonVariantsSmall}
        >
          <button
            className=" h-20 z-[1000] focus:outline-none focus:ring-0 focus:border-none"
            onClick={modeChangeButton}
          >
            {listDisplayMode === "list" ? (
              <CaretRight size={32} color="#f7f7f7" />
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
          <button
            className=" h-20 z-[1000] focus:outline-none focus:ring-0 focus:border-none"
            onClick={modeChangeButton}
          >
            {listDisplayMode === "list" ? (
              <CaretRight size={32} color="#f7f7f7" />
            ) : (
              <CaretLeft size={32} color="#3d3d3d" weight="light" />
            )}
          </button>
        </motion.div>
        <motion.div
          className={`absolute top-0 pt-[${navHeight}px] overflow-y-scroll w-[90vw] right-0 z-[500] xs:w-[400px] h-[100vh] bg-gray-500 bg-opacity-40`}
          initial="closed"
          animate={listDisplayMode === "list" ? "open" : "closed"}
          variants={menuVariants}
          aria-hidden={listDisplayMode !== "list"}
        >
          <div
            className={`sticky top-0 w-full h-16 flex flex-row justify-end items-center gap-4 z-10 bg-gray-700 bg-opacity-80`}
          >
            {/* ノートスロット */}
            {noteMode === "selfNote" ? (
              <div className="flex flex-row items-center justify-center w-full">
                {editNoteData.title ? (
                  <div className="w-full text-xl  text-center border-b border-[#faffb8] text-white">
                    {editNoteData.title}
                  </div>
                ) : (
                  ""
                )}
              </div>
            ) : (
              <div className="flex flex-row justify-end items-center text-xl gap-2 w-full">
                <div>
                  <button
                    className="p-2 m-2"
                    onClick={() => setIsSearchModal(true)}
                  >
                    <GearSix size={32} color="#fcfcfc" weight="fill" />
                  </button>
                </div>
                <div className="font-bold text-xl text-white w-full text-center">
                  {/* <MagnifyingGlass size={32} color="#f2f2f2" weight="fill"/> */}
                  検索結果
                </div>
              </div>
            )}
            {/* 検索ノート切り替え */}
            <div className="flex gap-2">
              {noteMode === "selfNote" ? (
                <div>
                  {editNoteData.title ? (
                    <button
                      className="bg-[#11172a] rounded-lg"
                      onClick={() => setIsSelectNoteModal(true)}
                    >
                      <div className="flex flex-row items-center mx-2 h-11">
                        <Notebook size={28} color="#ffffff" weight="fill" />
                        <ArrowsDownUp size={20} color="#ffffff" weight="fill" />
                      </div>
                    </button>
                  ) : (
                    <Button onClick={() => setIsSelectNoteModal(true)}>
                      <div className="mx-2">ノート選択</div>
                      <div className="flex flex-row items-center">
                        <Notebook size={28} color="#ffffff" weight="fill" />
                        <ArrowsDownUp size={20} color="#ffffff" weight="fill" />
                      </div>
                    </Button>
                  )}
                </div>
              ) : (
                <div>
                  <Button onClick={() => setIsLoadNoteModal(true)}>
                    <FileArrowDown size={32} color="#f2f2f2" weight="fill" />
                  </Button>
                </div>
              )}

              <button
                className="bg-[#11172a] rounded-lg"
                onClick={noteModeChangeButton}
              >
                {noteMode === "selfNote" ? (
                  <div className="flex flex-row items-center mx-1">
                    <Notebook size={20} color="#faffb8" weight="fill" />
                    <ArrowsClockwise size={16} color="#ffffff" />
                    <MagnifyingGlass size={20} color="#ababab" weight="fill" />
                  </div>
                ) : (
                  <div className="flex flex-row items-center mx-1">
                    <Notebook size={20} color="#ababab" weight="fill" />
                    <ArrowsClockwise size={16} color="#ffffff" />
                    <MagnifyingGlass size={20} color="#b1f799" weight="fill" />
                  </div>
                )}
              </button>
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
                      {`${searchedNoteSlot[0].userName || "User"}のノート`}
                    </div>
                    <div>
                      <button
                        onClick={() => setSearchedNoteSlot([])}
                        className="hover:opacity-50"
                      >
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
        {/* メモリリスト */}
        <div>
          <motion.div
            className="xs:hidden  fixed left-0 top-0 bottom-0 my-auto h-20 z-[900]"
            initial="closed"
            animate={planListDisplayMode === "list" ? "open" : "closed"}
            variants={planMenuButtonVariantsSmall}
          >
            <button
              className=" h-20 z-[900] focus:outline-none focus:ring-0 focus:border-none"
              onClick={planModeChangeButton}
            >
              {planListDisplayMode === "list" ? (
                <CaretLeft size={32} color="#f7f7f7" weight="light" />
              ) : (
                <CaretRight size={32} color="#3d3d3d" weight="light" />
              )}
            </button>
          </motion.div>
          <motion.div
            className="xs:fixed left-0 top-0 bottom-0 my-auto h-20 z-[900]"
            initial="closed"
            animate={planListDisplayMode === "list" ? "open" : "closed"}
            variants={planMenuButtonVariants}
          >
            <button
              className=" h-20 z-[900] focus:outline-none focus:ring-0 focus:border-none"
              onClick={planModeChangeButton}
            >
              {planListDisplayMode === "list" ? (
                <CaretLeft size={32} color="#f7f7f7" />
              ) : (
                <CaretRight size={32} color="#3d3d3d" weight="light" />
              )}
            </button>
          </motion.div>
          <motion.div
            className={`absolute top-0 pt-[${navHeight}px] overflow-y-scroll w-[90vw] left-0 z-[500] xs:w-[400px] h-[100vh] bg-gray-500 bg-opacity-40`}
            initial="closed"
            animate={planListDisplayMode === "list" ? "open" : "closed"}
            variants={planMenuVariants}
            aria-hidden={planListDisplayMode !== "list"}
          >
            <div className="sticky top-0 z-10  w-full h-16 flex flex-row items-center bg-gray-700 bg-opacity-80">
              {editPlanData.title ? (
                <div className="flex flex-row items-center text-xl w-full justify-end gap-4">
                  <div className="w-full text-white border-b border-[#b8d7ff] text-center">
                    {editPlanData.title}
                  </div>
                  <div className="flex flex-row justify-end">
                    <button
                      className="bg-[#11172a] rounded-lg"
                      onClick={() => setIsSelectPlanModal(true)}
                    >
                      <div className="flex flex-row items-center mx-2 h-11">
                        <Star size={28} color="#ffffff" weight="fill" />
                        <ArrowsDownUp size={20} color="#ffffff" weight="fill" />
                      </div>
                    </button>
                    <button
                      className="bg-[#11172a] rounded-lg mx-1 px-4 h-11"
                      onClick={() =>
                        setPlanMarkerDisplayMode(!planMarkerDisplayMode)
                      }
                    >
                      {planMarkerDisplayMode ? (
                        <LineSegments size={32} color="#4d82ff" weight="fill" />
                      ) : (
                        <LineSegments size={32} color="#b0b0b0" weight="fill" />
                      )}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="w-full flex justify-center">
                  <Button onClick={() => setIsSelectPlanModal(true)}>
                    <div className="mx-2">メモリを選択</div>
                    <div className="flex flex-row items-center mx-2 h-11">
                      <Star size={24} color="#ffffff" weight="fill" />
                      <ArrowsDownUp size={20} color="#ffffff" weight="fill" />
                    </div>
                  </Button>
                </div>
              )}
            </div>
            {editPlanData.id ? <ListFromPlan planId={editPlanData.id} /> : ""}
          </motion.div>
        </div>
        <div className={`absolute top-0 pt-[${navHeight}px]  w-full h-[100vh]`}>
          <MapContainer center={position} zoom={zoom} zoomControl={false}>
            <MapUpdater />
            <MapEventHandler onRightClick={handleRightClick} />
            <TileLayer
              attribution={mapStyle.attribution}
              url={mapStyle.style}
              maxZoom={20}
              minZoom={2}
            />
            <EditMapMarker
              searchButtonHandler={searchButtonHandler}
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
        <div
          className={`fixed bottom-0 right-0 h-16 my-4 mr-8 z-[1000] flex flex-row`}
        >
          {/* <button className="bg-[#b1f799]  rounded-full p-2 m-2 border-black border-2">
            <MapPinSimpleArea size={32} color="#050505" weight="duotone" />
          </button> */}
          <div>
            <button
              className={`bg-[#b1f799] rounded-full p-2 m-2 border-black border-2 ${
                listDisplayMode === "list" || planListDisplayMode === "list"
                  ? "hidden xs:block"
                  : ""
              }`}
              onClick={() => changeMapStyle()}
            >
              <MapTrifold size={32} color="#080707" weight="fill" />
            </button>
          </div>
          <div>
            <button
              className={`w-13 h-13 bg-[#b1f799]  rounded-full p-2 m-2 border-black border-2 ${
                listDisplayMode === "list" || planListDisplayMode === "list"
                  ? "hidden xs:block"
                  : ""
              }`}
              onClick={async () => {
                await getCurrentPoint();
                userMarker && setFocusCoordinate(userMarker);
              }}
            >
              <Crosshair size={32} color="#050505" weight="fill" />
            </button>
          </div>
          <div>
            <button
              className="bg-[#b1f799]  rounded-full p-2 m-2 border-black border-2"
              onClick={async () => {
                await getCurrentPoint();
                userMarker && setFocusCoordinate(userMarker);
                searchButtonHandler();
              }}
            >
              <MapPinArea size={32} color="#050505" weight="fill" />
            </button>
          </div>
          <Link
            href={`${process.env.NEXT_PUBLIC_BASE_URL}/create/post/${editNoteData.id}`}
          >
            <button
              className="bg-[#b1f799]  rounded-full p-2 m-2 border-black border-2 disabled:opacity-50 "
              disabled={editNoteData.id ? false : true}
            >
              <MapPinPlus size={32} color="#050505" weight="fill" />
            </button>
          </Link>
        </div>
      </div>

      {/* 検索処理 */}
      <div className="hidden">
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-[9000]">
          <div className="bg-white absolute rounded p-4 flex flex-col  items-center w-[90%] max-w-md">
            <div className="flex-grow overflow-y-scroll w-full px-2 pb-4 max-h-[70vh]">
              <form action={getData} className="flex flex-col w-full">
                <input
                  name="keyword"
                  className="w-full p-2 my-4 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="キーワードを入力"
                  value={searchText}
                  readOnly
                ></input>
                <div className="mb-4">
                  <div className="mt-4 space-y-4">
                    {/* 日付範囲 */}
                    <label className="block my-2">日付範囲:</label>
                    <div className="mb-4 flex flex-wrap gap-2">
                      <DatePicker
                        selected={startDate}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        locale="ja"
                        dateFormat="yyyy/MM/dd"
                        placeholderText="開始日"
                        className="p-2 border border-gray-300 rounded"
                        name="startDate"
                        readOnly
                      />
                      <DatePicker
                        selected={endDate}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        locale="ja"
                        minDate={startDate}
                        dateFormat="yyyy/MM/dd"
                        placeholderText="終了日"
                        className="p-2 border border-gray-300 rounded"
                        name="endDate"
                        readOnly
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
                            // onChange={handleCategoryChange}
                            className="form-checkbox"
                            readOnly
                          />
                          <span className="ml-2">食事</span>
                        </label>
                        <label className="inline-flex items-center mr-4">
                          <input
                            type="checkbox"
                            name="base"
                            checked={category.base}
                            // onChange={handleCategoryChange}
                            className="form-checkbox"
                            readOnly
                          />
                          <span className="ml-2">宿泊</span>
                        </label>
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            name="other"
                            checked={category.other}
                            // onChange={handleCategoryChange}
                            className="form-checkbox"
                            readOnly
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
                        // onChange={(e) => setLikes(e.target.value)}
                        className="p-2 border border-gray-300 rounded min-w-0"
                        placeholder="最小数"
                        readOnly
                      />
                      <div className="text-xl mx-2">~</div>
                      <input
                        type="number"
                        name="maxLikes"
                        value={maxLikes}
                        // onChange={(e) => setMaxLikes(e.target.value)}
                        className="p-2 border border-gray-300 rounded min-w-0"
                        placeholder="最大数"
                        readOnly
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
                        <span className="ml-2">
                          検索結果に自分の投稿を含める
                        </span>
                      </label>
                    </div>
                  </div>
                  {/* )} */}
                </div>
                <button ref={submitButtonRef}></button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditMap;
