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
import { useListDisplayMode } from "@/store";

export interface MapProps {
  posts: Array<{ id: string; content: string; coordinates: [number, number] }>;
  polylineCoordinates: [number, number][];
  noteId?: string;
}

const Map: React.FC<MapProps> = ({ posts, polylineCoordinates, noteId }) => {
  const [position, setPosition] = useState<LatLng | null>(null);
  const {listDisplayMode, setListDisplayMode} = useListDisplayMode()
  const [mode, setMode] = useState<string>("list");
  const menuVariants = {
    closed: {
      x: "100%",
      pointerEvents: 'none' as 'none',      
    },
    open: {
      x: 0,
      pointerEvents: 'auto' as 'auto',
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

  const modeChangeButton = () => {
    listDisplayMode === "list" ? setListDisplayMode("map") : setListDisplayMode("list");
  };

  useEffect(() => {
    async function initializeMap() {
      const point = await getPosition();

      if (point) {
        setPosition(latLng([point.lat, point.lng]));
      } else {
        // デフォルトの位置
        setPosition(latLng([35.680522, 139.766566]));
      }
    }

    initializeMap();
    console.log({ position: position });
  }, []);

  // 初期マップズームレベル
  const zoom = 18;
  const mapStyle = mapStyles.blackWhite;

  if (!position) {
    return <div>Loading map...</div>;
  }

  return (
    <>
      <div className="">
        <motion.div
          className="fixed right-0 top-0 bottom-0 my-auto h-20 z-[1000]"
          initial="closed"
          animate={listDisplayMode === "list" ? "open" : "closed"}
          variants={menuButtonVariants}
        >
          <button
          className="fixed right-0 top-0 bottom-0  z-[1000]"
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
          className={`absolute overflow-y-scroll right-0 z-[500] w-[400px] h-[100vh] `}
          initial="closed"
          animate={listDisplayMode === "list" ? "open" : "closed"}
          variants={menuVariants}
          aria-hidden={listDisplayMode !== "list"}
        >
          {noteId ? <ListFromNoteId noteId={noteId} /> : ""}
        </motion.div>
        <div className={`w-full h-[100vh]`}>
          <MapContainer center={position} zoom={zoom}>
            <TileLayer
              attribution={mapStyle.attribution}
              url={mapStyle.style}
              maxZoom={20}
              minZoom={2}
            />
            <NoteLogMarker
              position={position}
              posts={posts}
              polylineCoordinates={polylineCoordinates}
            />
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
