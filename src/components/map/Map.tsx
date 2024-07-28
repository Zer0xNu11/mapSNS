"use client";
import { MapContainer, TileLayer } from "react-leaflet";
import { LatLng, latLng } from "leaflet";
import "leaflet/dist/leaflet.css";
import "./map.css";
import { useEffect, useState } from "react";
import { LocationMarkers } from "./LocationMarkers";
import { getPosition } from "@/lib/getPostion";
import { mapStyles } from "@/lib/mapSetting";

export interface MapProps {
posts: Array<{ id: string, content: string, coordinates: [number, number] }>
polylineCoordinates: [number, number][]
}

const Map: React.FC<MapProps> = ({posts, polylineCoordinates}) => {
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
    <div className="w-full h-[100vh]">
    <MapContainer center={position} zoom={zoom}>
      <TileLayer
        attribution={mapStyle.attribution}
        url={mapStyle.style}
        maxZoom={20}
        minZoom={2}
      />
      <LocationMarkers position={position} posts={posts} polylineCoordinates={polylineCoordinates} />
    </MapContainer>
    </div>
  );
};

export default Map;
