"use client";
import { MapContainer, TileLayer } from "react-leaflet";
import { LatLng, latLng } from "leaflet";
import "leaflet/dist/leaflet.css";
import "./map.css";
import { LocationMarkers } from "./LocationMarkers";
import { useEffect, useState } from "react";

async function getPosition(): Promise<{ lat: number; lng: number } | null> {
  if (!navigator.geolocation) {
    console.log("位置情報を取得できません");
  }

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const point = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        console.log({point: point});
        resolve(point);
      },

      (error) => {
        console.log(error)
        resolve(null);
      }
    );
  });
}

const Map: React.FC = () => {
  const [position, setPosition] = useState<LatLng | null>(null);

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

  // 初期マップズームレベル
  const zoom = 12;
  const mapStyles = {
    google: {
      attribution: "https://developers.google.com/maps/documentation",
      style: "https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}",
    },
    blackWhite: {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      style: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
    },
    monochro: {
      attribution:
        '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      style:
        "https://tiles.stadiamaps.com/tiles/stamen_toner/{z}/{x}/{y}{r}.png",
    },
    template: { attribution: "", style: "" },
  };
  const mapStyle = mapStyles.google;

  if (!position) {
    return <div>Loading map...</div>;
  }

  return (
    <MapContainer center={position} zoom={zoom}>
      <TileLayer
        attribution={mapStyle.attribution}
        url={mapStyle.style}
        maxZoom={20}
        minZoom={2}
      />
      <LocationMarkers />
    </MapContainer>
  );
};

export default Map;
