"use client";
import {
  GOOGLEMAPSETTING,
  ICON_PIN,
  ICON_PLAN_HIGHLIGHTED,
  ICON_PlanMarker,
  LINE_COLOR,
} from "@/lib/mapSetting";
import {
  useEditPlan,
  useMarkerStore,
  useSelectedPlanPointStore,
} from "@/store";
import { LatLng, latLng, icon } from "leaflet";
import React, { useEffect } from "react";
import { Marker, Polyline, Popup, useMapEvent } from "react-leaflet";
import { PlanLeafletType } from "@/types";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export interface EditMapMarkerProps {
  planId: string;
  position: LatLng;
  polylineCoordinates: [number, number][];
  planPoints: PlanLeafletType[];
  openSearchModal: () => void;
}

export const EditMapMarker: React.FC<EditMapMarkerProps> = ({
  planId,
  position,
  polylineCoordinates,
  planPoints,
  openSearchModal,
}) => {
  const { marker, setMarker } = useMarkerStore();
  const { selectedPlanPointId, setSelectedPlanPointId } =
    useSelectedPlanPointStore();
  const { editPlanData } = useEditPlan();

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
      <Marker
        key={marker.toString()}
        position={marker}
        icon={ICON_PIN}
        eventHandlers={{}}
      >
        <Popup>
          <div className="flex flex-row gap-4">
            <Button onClick={() => openSearchModal()}>周囲を検索</Button>
            {editPlanData.id ? (
              <Link
                href={`${process.env.NEXT_PUBLIC_BASE_URL}/create/planPoint/${planId}`}
              >
                <Button>プラン追加</Button>
              </Link>
            ) : (
              <Button disabled={true}>プラン追加</Button>
            )}
          </div>
          <br />
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
          icon={
            selectedPlanPointId === planPoint.id
              ? ICON_PLAN_HIGHLIGHTED
              : ICON_PlanMarker
          }
          eventHandlers={{
            click: () => setSelectedPlanPointId(planPoint.id),
          }}
        >
          {selectedPlanPointId === planPoint.id ? (
            <Popup>
              {`${planPoint.content}`}
              <br />
              <a
                href={GOOGLEMAPSETTING(
                  planPoint.coordinates[0],
                  planPoint.coordinates[1]
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                googleMapで付近を探索
              </a>
            </Popup>
          ) : (
            ""
          )}
        </Marker>
      ))}
      <Polyline pathOptions={LINE_COLOR.blue} positions={polylineCoordinates} />
    </>
  );
};

//toString() オブジェクトを文字列に変換
