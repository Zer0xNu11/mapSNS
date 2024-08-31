"use client";
import { MapContainer, TileLayer } from "react-leaflet";
import { LatLng, latLng } from "leaflet";
import "leaflet/dist/leaflet.css";
import "./map.css";
import { useEffect, useState } from "react";
import { getPosition } from "@/lib/getPostion";
import { MakingMarker } from "./MakingMarker";
import { mapStyles } from "@/lib/mapSetting";
import { useMarkerStore } from "@/store";

const PostLocation: React.FC = () => {
  const [position, setPosition] = useState<LatLng | null>(null);
  const {marker, addMarker} = useMarkerStore();

  useEffect(() => {
    async function initializeMap() {
      const point = await getPosition();
      console.log({point:point})

      if (point != null) {
        addMarker(latLng([point.lat, point.lng]));
        console.log({position: marker})
      } else {
        // デフォルトの位置
        addMarker(latLng([35.680522, 139.766566]));
        console.log({position: 'デフォルト'})
      }
    }

    initializeMap();
    
  }, []);

  // 初期マップズームレベル
  const zoom = 18;
  const mapStyle = mapStyles.blackWhite;

  if (!marker) {
    return <div>Loading map...</div>;
  }

  return (
    <MapContainer center={marker} zoom={zoom}>
      <TileLayer
        attribution={mapStyle.attribution}
        url={mapStyle.style}
        maxZoom={20}
        minZoom={2}
      />
      <MakingMarker position={marker} />
    </MapContainer>
  );
};

export default PostLocation;
