'use client'
import { GOOGLEMAPSETTING} from "@/lib/mapSetting";
import { useMarkerStore } from "@/store";
import { LatLng, latLng, icon } from "leaflet";
import React, { useEffect } from "react";
import { Marker, Popup, useMapEvent } from "react-leaflet";

export interface MakingMarkerProps {
  position: LatLng;
}

const ICON = icon({
  iconUrl: "/images/pinsmall.svg",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [0, -30],
});

export const MakingMarker : React.FC<MakingMarkerProps> = ({position}) => {
const {marker, addMarker} = useMarkerStore();

useEffect(()=>{
  if(!marker){
    addMarker(position)
  }
},[position])

  const map = useMapEvent("click", (e) => {
    const { lat, lng } = e.latlng;
    addMarker(latLng(lat, lng));
    console.log({lat:marker?.lat,lng:marker?.lng})
    // console.log({pointlat:lat, pointlng:lng})
  });

  if (!marker) return null;

  return (
    <>
        <Marker key={marker.toString()} position={marker} icon={ICON}>
        <Popup><a href={GOOGLEMAPSETTING(marker.lat,marker.lng)} target="_blank" rel="noopener noreferrer">googleMapで付近を探索</a></Popup>
        </Marker>
    </>
  );
};

//toString() オブジェクトを文字列に変換