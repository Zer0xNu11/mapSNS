"use client";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { latLng } from "leaflet";
import "leaflet/dist/leaflet.css";
import "./map.css";
import { useEffect } from "react";
import { getPosition } from "@/lib/getPostion";
import { MakingMarker } from "./MakingMarker";
import { mapStyles } from "@/lib/mapSetting";
import { useFocusCoordinate, useMarkerStore, useSearchingMode, useUserMarkerStore } from "@/store";
import UserMarker from "./UserMarker";
import GpsButton from "./GpsButton";

interface PostLocationProps {
  isEdit?: boolean;
}

const MapUpdater = () => {
  const map = useMap();
  const { marker } = useMarkerStore();

  useEffect(() => {
    if (marker) {
      map.setView(marker, map.getZoom());
    }
  }, [marker, map]);

  return null;
};

const PostLocation: React.FC<PostLocationProps> = ({ isEdit = false }) => {
  const { marker, setMarker } = useMarkerStore();
  const {focusCoordinate} = useFocusCoordinate();
  const { userMarker, setUserMarker } = useUserMarkerStore();
  const { searchingMode, setSearchingMode } = useSearchingMode();

  async function initializeMap() {
    const point = await getPosition();
    console.log({ point: point });

    if (isEdit && focusCoordinate) {
      setMarker(latLng(focusCoordinate));
      setSearchingMode('off')
    } else {
      if (point != null) {
        setMarker(latLng([point.lat, point.lng]));
        setSearchingMode('off')
        setUserMarker(latLng([point.lat, point.lng]));
        console.log({ position: marker });
      } else {
        // デフォルトの位置
        setMarker(latLng([35.680522, 139.766566]));
        setSearchingMode('off')
        setUserMarker(latLng([35.680522, 139.766566]));
        console.log({ position: "デフォルト" });
      }
    }
  }

  useEffect(() => {
    initializeMap();
  }, []);

  // 初期マップズームレベル
  const zoom = 16;
  const mapStyle = mapStyles.blackWhite;

  if (!marker) {
    return <div>Loading map...</div>;
  }

  return (
    <MapContainer center={marker} zoom={zoom} zoomControl={false}>
      <MapUpdater />
      <GpsButton initializeMap={initializeMap} isEdit = {isEdit}/>
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
