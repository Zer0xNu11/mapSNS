"use client";
// import { MapContainer, TileLayer } from "react-leaflet";
import { LatLng, latLng } from "leaflet";
import "leaflet/dist/leaflet.css";
import "./map.css";
import { useEffect, useState } from "react";
import { LocationMarkers } from "./LocationMarkers";
import { getPosition } from "@/lib/getPostion";

export interface MapProps {
posts: Array<{ id: string, content: string, coordinates: [number, number] }>
polylineCoordinates: [number, number][]
}

const Map: React.FC<MapProps> = ({posts, polylineCoordinates}) => {
  const [position, setPosition] = useState<LatLng | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    async function initializeMap() {
      const point = await getPosition();

      if (point) {
        setPosition(latLng([point.lat, point.lng]));
      } else {
        // デフォルトの位置
        setPosition(latLng([35.3607411, 138.727262]));
      }
    }

    initializeMap();
    console.log({position: position})
  }, []);

//マップコンポーネントが初期化された後にのみレンダリングする
  useEffect(() => {
    if (typeof window !== "undefined" && position && !mapLoaded) {
      import("react-leaflet").then(({ MapContainer, TileLayer }) => {
        import("./LocationMarkers").then(({ LocationMarkers }) => {
          setMapLoaded(true);
        });
      });
    }
  }, [position, mapLoaded]);



  if (!position) {
    return <div>Loading map...</div>;
  }

  if (!mapLoaded) {
    return <div>Initializing map...</div>;
  }

  const MapContent = () => {
    const { MapContainer, TileLayer } = require("react-leaflet");
    const { LocationMarkers } = require("./LocationMarkers");
    require("leaflet/dist/leaflet.css");
    
    const zoom = 18;
    const mapStyle = {
      attribution: "https://developers.google.com/maps/documentation",
      style: "https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}",
    };

    return (
      <MapContainer center={position} zoom={zoom}>
        <TileLayer
          attribution={mapStyle.attribution}
          url={mapStyle.style}
          maxZoom={20}
          minZoom={2}
        />
        <LocationMarkers
          position={position}
          posts={posts}
          polylineCoordinates={polylineCoordinates}
        />
      </MapContainer>
    );
  };

  // 初期マップズームレベル
  // const zoom = 18;
  // const mapStyles = {
  //   google: {
  //     attribution: "https://developers.google.com/maps/documentation",
  //     style: "https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}",
  //   },
  //   blackWhite: {
  //     attribution:
  //       '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  //     style: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
  //   },
  //   monochro: {
  //     attribution:
  //       '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  //     style:
  //       "https://tiles.stadiamaps.com/tiles/stamen_toner/{z}/{x}/{y}{r}.png",
  //   },
  //   template: { attribution: "", style: "" },
  // };
  // const mapStyle = mapStyles.google;

  // if (!position) {
  //   return <div>Loading map...</div>;
  // }

//   return (
//     <div className="w-full h-[100vh]">
//     <MapContainer center={position} zoom={zoom}>
//       <TileLayer
//         attribution={mapStyle.attribution}
//         url={mapStyle.style}
//         maxZoom={20}
//         minZoom={2}
//       />
//       <LocationMarkers position={position} posts={posts} polylineCoordinates={polylineCoordinates} />
//     </MapContainer>
//     </div>
//   );
// };

return (
  <div className="w-full h-[100vh]">
    <MapContent />
  </div>
);
};


export default Map;
