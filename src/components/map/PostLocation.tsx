"use client";
import { MapContainer, TileLayer } from "react-leaflet";
import { LatLng, latLng } from "leaflet";
import "leaflet/dist/leaflet.css";
import "./map.css";
import { useEffect, useState } from "react";
import { getPosition } from "@/lib/getPostion";
import { MakingMarker } from "./MakingMarker";
import { mapStyles } from "@/lib/mapSetting";

const PostLocation: React.FC = () => {
  const [position, setPosition] = useState<LatLng | null>(null);

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

  // 初期マップズームレベル
  const zoom = 18;
  const mapStyle = mapStyles.google;

  if (!position) {
    return <div>Loading map...</div>;
  }

  return (
    <MapContainer center={position} zoom={zoom}>
      <TileLayer
        attribution={mapStyle.attribution}
        url={mapStyle.style}
        maxZoom={20}
        minZoom={2}
      />
      <MakingMarker position={position} />
    </MapContainer>
  );
};

export default PostLocation;
