'use client'
import { useEffect, useState } from "react";
import { LatLng, latLng, icon, LatLngExpression } from "leaflet";
import { Marker, Polyline, Popup, useMapEvent } from "react-leaflet";
import { GOOGLEMAPSETTING} from "@/lib/mapSetting";
import { prismadb } from "@/globals/db";
import { MapProps } from "./Map";

interface LocationMarkersProps {
  position: LatLng;
}

// interface Post {
//   id: string;
//   content: string;
//   location: {
//     type: 'Point';
//     coordinates: [number, number]; // [longitude, latitude]
//   };
// }

const ICON = icon({
  iconUrl: "/images/pinsmall.svg",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [0, -30],
});

const limeOptions = { color: 'lime' }

export const LocationMarkers : React.FC<LocationMarkersProps&MapProps> = ({position, posts, polylineCoordinates}) => {
// const [posts, setPosts] = useState<Post[]>([]);
const [points, setPoint] = useState([]);
// console.log(console.log({posts:latLng(posts[1].coordinates[1], posts[1].coordinates[0]), position:position}))


  return (
    <>
      {posts.map((post) => (
        <Marker key={post.id} position={latLng(post.coordinates[0], post.coordinates[1])} icon={ICON}>
          <Popup>{`${post.content}`}<a href={GOOGLEMAPSETTING(post.coordinates[0],post.coordinates[1])} target="_blank" rel="noopener noreferrer">googleMapで付近を探索</a></Popup>
        </Marker>
      ))}
      <Polyline pathOptions={limeOptions} positions={polylineCoordinates}/>
    </>
  );
};

//toString() オブジェクトを文字列に変換