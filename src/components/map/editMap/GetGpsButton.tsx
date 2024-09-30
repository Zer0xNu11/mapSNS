"use client";
import "leaflet/dist/leaflet.css";

import { Crosshair } from "@phosphor-icons/react/dist/ssr/Crosshair";
import { ArrowUUpLeft } from "@phosphor-icons/react/dist/ssr/ArrowUUpLeft";

interface GpsButtonProps {
  getCurrentPoint: () => void;
}

const GetGpsButton: React.FC<GpsButtonProps> = ({ getCurrentPoint }) => {
  return (
    <div>
      <button
        className="bg-green-400 rounded-full p-2 m-2 border-black border-2"
        onClick={() => getCurrentPoint()}
      >
        <Crosshair size={32} color="#050505" />
      </button>
    </div>
  );
};

export default GetGpsButton;
