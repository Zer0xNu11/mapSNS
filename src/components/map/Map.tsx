"use client";
import { MapContainer, TileLayer } from "react-leaflet";
import { LatLng, latLng } from "leaflet";
import "leaflet/dist/leaflet.css";
import "./map.css";
import { useEffect, useMemo, useState } from "react";
import { NoteLogMarker } from "./NoteLogMarker";
import { getPosition } from "@/lib/getPostion";
import { mapStyles } from "@/lib/mapSetting";
import ListFromNoteId from "../ListFromNoteId";
import Link from "next/link";
import { MapPinPlus } from "@phosphor-icons/react/dist/ssr/MapPinPlus";
import { CaretLeft } from "@phosphor-icons/react/dist/ssr/CaretLeft";
import { CaretRight } from "@phosphor-icons/react/dist/ssr/CaretRight";
import { motion } from "framer-motion";
import { useListDisplayMode, useMapStyle, useNoteSlot } from "@/store";
import { navHeight } from "@/lib/commonSetting";
import { getNoteData } from "@/lib/getPosts";
import UserMarker from "./UserMarker";
import { useUserMarkerStore } from "@/store";


export interface MapProps {
  noteId: string;
}

const Map: React.FC<MapProps> = ({ noteId }) => {
  const [position, setPosition] = useState<LatLng | null>(null);
  const { listDisplayMode, setListDisplayMode } = useListDisplayMode();
  const {noteSlot, setNoteSlot} = useNoteSlot();
  const [mode, setMode] = useState<string>("list");
  const {setUserMarker} = useUserMarkerStore();
  const {mapStyle, setMapStyle} = useMapStyle();


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

  const modeChangeButton = () => {
    listDisplayMode === "list"
      ? setListDisplayMode("map")
      : setListDisplayMode("list");
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
      setNoteSlot([]);
      const data = await getNoteData(noteId);
      setNoteSlot(data);
    }

    slotInitializing();
  }, []);

  // 初期マップズームレベル
  const zoom = 18;

  if (!position) {
    return <div>Loading map...</div>;
  }

  return (
    <>
      <div className="overflow-hidden">
        <motion.div
          className="xs:hidden fixed right-0 top-0 bottom-0 my-auto h-20 z-[1000]"
          initial="closed"
          animate={listDisplayMode === "list" ? "open" : "closed"}
          variants={menuButtonVariantsSmall}
        >
          <button
            className="h-20 z-[1000]"
            onClick={modeChangeButton}
          >
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
          <button
            className="h-20  z-[1000]"
            onClick={modeChangeButton}
          >
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
          {noteId ? <ListFromNoteId postsData={noteSlot.map(item => ({id: item.id, content: item.content, coordinates: item.coordinates, imageUrl: item.imageUrl, totalLikes: item.totalLikes, noteId: item.noteId, createdAt: item.createdAt, authorId: item.authorId, author: item.author}))} /> : ""}
        </motion.div>
        <div className={`absolute top-0 pt-[${navHeight}px]  w-full h-[100vh]`}>
          <MapContainer center={position} zoom={zoom}>
            <TileLayer
              attribution={mapStyle.attribution}
              url={mapStyle.style}
              maxZoom={20}
              minZoom={2}
            />
            <NoteLogMarker
              position={position}
              posts={noteSlot.map(item => ({id: item.id, content: item.content, coordinates: item.coordinates, imageUrl: item.imageUrl, totalLikes: item.totalLikes, noteId: item.noteId}))}
              polylineCoordinates={noteSlot.map(item => item.coordinates)}
            />
            <UserMarker/>
          </MapContainer>
        </div>
      </div>
      <div className="fixed bottom-0 right-0 h-16 my-4 mr-8 z-[1000]">
        <Link
          href={`${process.env.NEXT_PUBLIC_BASE_URL}/create/post/${noteId}`}
        >
          <button className="bg-green-400 rounded-full p-2 m-2 border-black border-2">
            <MapPinPlus size={32} color="#050505" weight="duotone" />
          </button>
        </Link>
      </div>
    </>
  );
};

export default Map;
