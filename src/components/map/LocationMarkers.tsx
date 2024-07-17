'use client'
import { useState } from "react";
import { LatLng, latLng, icon } from "leaflet";
import { Marker, Popup, useMapEvent } from "react-leaflet";

const ICON = icon({
  iconUrl: "/images/pinsmall.svg",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [0, -30],
});

export const LocationMarkers = (): JSX.Element => {
const [markers, setMarkers] = useState<LatLng[]>([]);
  // useMapEvent は `<MapContainer>` の内側からしか呼び出せない
  const map = useMapEvent("click", (e) => {
    const { lat, lng } = e.latlng;
    setMarkers((markers) => [...markers, latLng(lat, lng)]);
  });

  return (
    <>
      {markers.map((marker) => (
        <Marker key={marker.toString()} position={marker} icon={ICON}>
          <Popup>{marker.toString()}</Popup>
        </Marker>
      ))}
    </>
  );
};