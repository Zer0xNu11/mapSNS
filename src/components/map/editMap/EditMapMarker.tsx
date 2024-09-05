"use client";
import { GOOGLEMAPSETTING } from "@/lib/mapSetting";
import { useMarkerStore, useSelectedPostStore } from "@/store";
import { LatLng, latLng, icon } from "leaflet";
import React, { useEffect } from "react";
import { Marker, Polyline, Popup, useMapEvent } from "react-leaflet";
import MakePlanOnMarker from "./MakePlanOnMarker";

export interface EditMapMarkerProps {
  planId: string;
  position: LatLng;
  polylineCoordinates: [number, number][];
}

const ICON = icon({
  iconUrl: "/images/pinsmall.svg",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [0, -30],
});

const limeOptions = { color: "lime" };

export const EditMapMarker: React.FC<EditMapMarkerProps> = ({
  planId,
  position,
  polylineCoordinates,
}) => {
  const { marker, addMarker } = useMarkerStore();
  const { selectedPostId, setSelectedPostId } = useSelectedPostStore();

  useEffect(() => {
    if (!marker) {
      addMarker(position);
    }
  }, [position]);

  const map = useMapEvent("click", (e) => {
    const { lat, lng } = e.latlng;
    addMarker(latLng(lat, lng));
    console.log({ lat: marker?.lat, lng: marker?.lng });
    console.log({ pointlat: lat, pointlng: lng });
  });

  if (!marker) return null;

  return (
    <>
      <Marker key={marker.toString()} position={marker} icon={ICON}    eventHandlers={{
          }}>
        <Popup className="w-[300px] h-[200px]">
          <MakePlanOnMarker planId={planId} position={marker} />
          <a
            href={GOOGLEMAPSETTING(marker.lat, marker.lng)}
            target="_blank"
            rel="noopener noreferrer"
          >
            googleMapで付近を探索
          </a>
        </Popup>
      </Marker>
      <Polyline pathOptions={limeOptions} positions={polylineCoordinates} />
    </>
  );
};

//toString() オブジェクトを文字列に変換
