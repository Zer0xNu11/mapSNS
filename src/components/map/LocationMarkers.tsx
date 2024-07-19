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
    console.log(markers)
  });

  return (
    <>
      {markers.map((marker) => (
        <Marker key={marker.toString()} position={marker} icon={ICON}>
          <Popup><a href={`https://www.google.co.jp/maps/@${marker.lat},${marker.lng},${16}z` } target="_blank" rel="noopener noreferrer">googleMapで開く</a></Popup>
        </Marker>
      ))}
    </>
  );
};

//toString() オブジェクトを文字列に変換