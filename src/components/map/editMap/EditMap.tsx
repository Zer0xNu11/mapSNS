"use client";
import { MapContainer, TileLayer } from "react-leaflet";
import { divIcon, LatLng, latLng } from "leaflet";
import "leaflet/dist/leaflet.css";
import "../map.css";
import { useEffect, useState } from "react";
import { getPosition } from "@/lib/getPostion";
import { mapStyles } from "@/lib/mapSetting";
import { EditMapMarker } from "./EditMapMarker";
import { SearchResultMarkers } from "../SearchResultMarkers";
import { Button } from "@/components/ui/button";
import { getPostPointsCreatedAt } from "@/lib/getPostPoints";

import "leaflet/dist/leaflet.css";
import { CaretLeft } from "@phosphor-icons/react/dist/ssr/CaretLeft";
import { CaretRight } from "@phosphor-icons/react/dist/ssr/CaretRight";
import { motion } from "framer-motion";
import { navHeight } from "@/lib/commonSetting";
import {
  useListDisplayMode,
  useMapStyle,
  usePlanListDisplayMode,
  usePlanSlot,
  usePostsSlot,
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
import SearchMordal from "../SearchMordal";

export interface EditMapProps {
  planId: string;
}

const EditMap: React.FC<EditMapProps> = ({ planId }) => {
  const [position, setPosition] = useState<LatLng | null>(null);
  const [isSearchModal, setIsSearchModal] = useState(false);
  // const [searchPosts, setSearchPosts] = useState<PostLeafletType[]>();
  const { listDisplayMode, setListDisplayMode } = useListDisplayMode();
  const { planListDisplayMode, setPlanListDisplayMode } =
    usePlanListDisplayMode();
  const { planSlot, setPlanSlot } = usePlanSlot();
  const { postsSlot, setPostsSlot } = usePostsSlot();
  const { mapStyle, setMapStyle } = useMapStyle();
  const { setUserMarker } = useUserMarkerStore();
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

  const changeMapStyle = () => {
    setMapStyle(mapStyle === mapStyles.google ? mapStyles.blackWhite : mapStyles.google);
  };

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
      setPlanSlot([]);
      // setPostsSlot([]);
      const data = await getPlanData(planId);
      setPlanSlot(data);
    }

    slotInitializing();
  }, []);

  useEffect(() => {
  console.log('postsSlot changed')

  }, [postsSlot]);

  const onClickCreatedAt = async () => {
    const postPoints = await getPostPointsCreatedAt();
    setPostsSlot(postPoints);
  };

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
      {isSearchModal && (<div className="fixed top-4 right-4 z-[9999]"><button
      onClick={() => setIsSearchModal(false)}
      ><XSquare size={48} color="#f1f1f3" weight="fill" /></button></div>)}
      {isSearchModal && <SearchMordal/>}
      <div className="w-full h-[100vh]">
        <Button>いいね順</Button>
        <Button className="absolute z-[2000]" onClick={onClickCreatedAt}>
          投稿日時順
        </Button>
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
          <ListFromSort />
        </motion.div>
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
            <ListFromPlan planId={planId} />
          </motion.div>
        </div>
        <div className={`absolute top-0 pt-[${navHeight}px]  w-full h-[100vh]`}>
          <MapContainer center={position} zoom={zoom}>
            <TileLayer
              attribution={mapStyle.attribution}
              url={mapStyle.style}
              maxZoom={20}
              minZoom={2}
            />
            <EditMapMarker
              planId={planId}
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
              <SearchResultMarkers planId={planId} posts={postsSlot} />
            ) : (
              ""
            )}
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
            <MagnifyingGlass size={32} color="#050505"/>
          </button>
          <button 
          className="bg-green-400 rounded-full p-2 m-2 border-black border-2"
          onClick={() => changeMapStyle()}
          >
            <MapTrifold size={32} color="#080707" weight="fill" />
          </button>
        </div>
      </div>
      
    </>
  );
};

export default EditMap;
