"use client";
import { MapContainer, TileLayer } from "react-leaflet";
import { latLng } from "leaflet";
import "leaflet/dist/leaflet.css";
import "./map.css";
import { useEffect } from "react";
import { getPosition } from "@/lib/getPostion";
import { MakingMarker } from "./MakingMarker";
import { mapStyles } from "@/lib/mapSetting";
import { useMarkerStore, useUserMarkerStore } from "@/store";
import UserMarker from "./UserMarker";
import GpsButton from "./GpsButton";

const PostLocation: React.FC = () => {
  const { marker, setMarker } = useMarkerStore();
  const { userMarker, setUserMarker } = useUserMarkerStore();

  async function initializeMap() {
    const point = await getPosition();
    console.log({ point: point });

    if (point != null) {
      setMarker(latLng([point.lat, point.lng]));
      setUserMarker(latLng([point.lat, point.lng]));
      console.log({ position: marker });
    } else {
      // デフォルトの位置
      setMarker(latLng([35.680522, 139.766566]));
      setUserMarker(latLng([35.680522, 139.766566]));
      console.log({ position: "デフォルト" });
    }
  }

  useEffect(() => {
    initializeMap();
  }, []);

  // 初期マップズームレベル
  const zoom = 18;
  const mapStyle = mapStyles.blackWhite;

  if (!marker) {
    return <div>Loading map...</div>;
  }

  return (
    <MapContainer center={marker} zoom={zoom} zoomControl={false}>
      <GpsButton initializeMap={initializeMap}/>
      <TileLayer
        attribution={mapStyle.attribution}
        url={mapStyle.style}
        maxZoom={20}
        minZoom={2}
      />
      <MakingMarker position={marker} />
      <UserMarker />
    </MapContainer>
  );
};

export default PostLocation;
