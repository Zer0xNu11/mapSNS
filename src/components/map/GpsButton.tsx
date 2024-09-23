"use client";
import "leaflet/dist/leaflet.css";
import "./map.css";

import { Crosshair } from "@phosphor-icons/react/dist/ssr/Crosshair";

interface GapButtonProps {
  initializeMap: () => void;
}

 const GpsButton : React.FC<GapButtonProps> = ({initializeMap}) => {

  return (
    <div>
      <button
        className="absolute right-4 top-4 rounded-full drop-shadow-md border-2 bg-gray-100 w-10 h-10 z-[900]"
        onClick={initializeMap}
      >
        <Crosshair className="m-auto" size={32} color="#290dde" weight="fill" />
      </button>
    </div>
  );
};

export default GpsButton;
