'use client'
import { CIRCLE_OPTION, ICON_USER} from "@/lib/mapSetting";
import { useUserMarkerStore } from "@/store";
import { Circle, CircleMarker, Marker } from "react-leaflet";

const UserMarker = () => {

  const {userMarker} = useUserMarkerStore();

  return (
    <>
    {userMarker && (
    <div>
        <Marker key={userMarker?.toString()} position={userMarker} icon={ICON_USER}>
        </Marker>
        {/* <Circle key={userMarker?.toString()} center={userMarker} radius={500} pathOptions={CIRCLE_OPTION} >
        </Circle> */}
    </div>
    )}
    </>
  )
}

export default UserMarker
