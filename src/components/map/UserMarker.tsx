'use client'
import {  ICON_USER} from "@/lib/mapSetting";
import { useUserMarkerStore } from "@/store";
import { Marker } from "react-leaflet";

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
