"use client";
import { MapContainer, TileLayer } from "react-leaflet";
import { LatLng, latLng } from "leaflet";
import "leaflet/dist/leaflet.css";
import "../map.css";
import { useEffect, useState } from "react";
import { LocationMarkers } from "../LocationMarkers";
import { getPosition } from "@/lib/getPostion";
import { mapStyles } from "@/lib/mapSetting";
import { EditMapMarker } from "./EditMapMarker";
import { SearchResultMarkers } from "../SearchResultMarkers";
import { Button } from "@/components/ui/button";
import { PostType } from "@/types";
import { getPostPointsCreatedAt } from "@/lib/getPostPoints";

export interface EditMapProps {
planId : string
posts: Array<{ id: string, content: string, coordinates: [number, number] }>
polylineCoordinates: [number, number][]
}

const EditMap: React.FC<EditMapProps> = ({planId, posts, polylineCoordinates}) => {
  const [position, setPosition] = useState<LatLng | null>(null);
  const [searchPosts, setSearchPosts] = useState<Array<{ id: string, content: string, coordinates: [number, number] }>>();

  useEffect(() => {
    async function initializeMap() {
      const point = await getPosition();

      if (point) {
        setPosition(latLng([point.lat, point.lng]));
      } else {
        // デフォルトの位置
        setPosition(latLng([35.3607411, 138.727262]));
      }
    }

    initializeMap();
    console.log({position: position})
  }, []);

  const onClickCreatedAt = async() =>{
    const postPoints = await getPostPointsCreatedAt()
    setSearchPosts(postPoints);
  }

  // 初期マップズームレベル
  const zoom = 15;
  const mapStyle = mapStyles.google;

  if (!position) {
    return <div>Loading map...</div>;
  }

  return (
    <div className="w-full h-[100vh]">
      <Button>いいね順</Button>
      <Button onClick={onClickCreatedAt}>投稿日時順</Button>
    <MapContainer center={position} zoom={zoom}>
      <TileLayer
        attribution={mapStyle.attribution}
        url={mapStyle.style}
        maxZoom={20}
        minZoom={2}
      />
      <EditMapMarker planId={planId}  position={position} polylineCoordinates={polylineCoordinates}/>
      {searchPosts? <SearchResultMarkers  posts={searchPosts} /> : '' }

    </MapContainer>
    </div>
  );
};

export default EditMap;
