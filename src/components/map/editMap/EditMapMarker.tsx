"use client";
import { GOOGLEMAPSETTING, ICON_HIGHLIGHTED, ICON_Marker, ICON_PLAN_HIGHLIGHTED, ICON_PlanMarker, LINE_COLOR } from "@/lib/mapSetting";
import { useMarkerStore, useSelectedPlanPointStore, useSelectedPostStore } from "@/store";
import { LatLng, latLng, icon } from "leaflet";
import React, { useEffect } from "react";
import { Marker, Polyline, Popup, useMapEvent } from "react-leaflet";
import MakePlanOnMarker from "./MakePlanOnMarker";
import { PlanLeafletType } from "@/types";

export interface EditMapMarkerProps {
  planId: string;
  position: LatLng;
  polylineCoordinates: [number, number][];
  planPoints: PlanLeafletType[];
}

const ICON = icon({
  iconUrl: "/images/pinsmall.svg",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [0, -30],
});

export const EditMapMarker: React.FC<EditMapMarkerProps> = ({
  planId,
  position,
  polylineCoordinates,
  planPoints,
}) => {
  const { marker, setMarker } = useMarkerStore();
  const { selectedPlanPointId, setSelectedPlanPointId } = useSelectedPlanPointStore();

  useEffect(() => {
    if (!marker) {
      setMarker(position);
    }
  }, [position]);

  const map = useMapEvent("click", (e) => {
    const { lat, lng } = e.latlng;
    setMarker(latLng(lat, lng));
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
      {planPoints.map((planPoint) => (
        <Marker
          key={planPoint.id}
          position={latLng(planPoint.coordinates[0], planPoint.coordinates[1])}
          icon={selectedPlanPointId === planPoint.id ? ICON_PLAN_HIGHLIGHTED : ICON_PlanMarker}
          eventHandlers={{
            click: () => setSelectedPlanPointId(planPoint.id),
          }}
        >
          <Popup>
            {`${planPoint.content}`}
            <br />
            <a
              href={GOOGLEMAPSETTING(planPoint.coordinates[0], planPoint.coordinates[1])}
              target="_blank"
              rel="noopener noreferrer"
            >
              googleMapで付近を探索
            </a>
          </Popup>
        </Marker>
      ))}
      <Polyline pathOptions={LINE_COLOR.blue} positions={polylineCoordinates} />
    </>
  );
};

//toString() オブジェクトを文字列に変換
