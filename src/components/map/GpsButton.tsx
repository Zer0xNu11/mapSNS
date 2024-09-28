"use client";
import "leaflet/dist/leaflet.css";
import "./map.css";

import { Crosshair } from "@phosphor-icons/react/dist/ssr/Crosshair";
import { ArrowUUpLeft } from "@phosphor-icons/react/dist/ssr/ArrowUUpLeft";

interface GpsButtonProps {
  initializeMap: () => void;
  isEdit? : boolean
}

 const GpsButton : React.FC<GpsButtonProps> = ({initializeMap, isEdit = false}) => {

  return (
    <div>
      <button
        className="absolute right-4 top-4 rounded-full drop-shadow-md border-2 bg-gray-100 w-10 h-10 z-[900]"
        onClick={initializeMap}
      >
        {isEdit ? 
        <ArrowUUpLeft className="m-auto" size={32} color="#290dde" weight="fill" />
        :<Crosshair className="m-auto" size={32} color="#290dde" weight="fill" />
 }
      </button>
    </div>
  );
};

export default GpsButton;
