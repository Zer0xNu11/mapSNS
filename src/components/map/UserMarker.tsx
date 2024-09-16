'use client'
import { GOOGLEMAPSETTING, ICON_PIN, ICON_USER} from "@/lib/mapSetting";
import { useMarkerStore, useUserMarkerStore } from "@/store";
import { LatLng, latLng, icon } from "leaflet";
import React, { useEffect } from "react";
import { Marker, Popup, useMapEvent } from "react-leaflet";

const UserMarker = () => {

  const {userMarker} = useUserMarkerStore();

  return (
    <>
    {userMarker && (
    <div>
        <Marker key={userMarker?.toString()} position={userMarker} icon={ICON_USER}>
        </Marker>
    </div>
    )}
    </>
  )
}

export default UserMarker
