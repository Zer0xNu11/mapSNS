'use client'
import { useEffect, useState } from "react";
import { LatLng, latLng, icon, LatLngExpression } from "leaflet";
import { Marker, Polyline, Popup, useMapEvent } from "react-leaflet";
import { GOOGLEMAPSETTING} from "@/lib/mapSetting";
import { prismadb } from "@/globals/db";
import { MapProps } from "./Map";
import { PostType } from "@/types";

interface SearchResultMarkersProps {
  posts: Array<{ id: string, content: string, coordinates: [number, number] }>
}

const ICON = icon({
  iconUrl: "/images/circleRed.svg",
  iconSize: [25, 25],
  iconAnchor: [12.5, 12.5],
  popupAnchor: [0, -30],
});

export const SearchResultMarkers : React.FC<SearchResultMarkersProps> = ({posts}) => {
// const [posts, setPosts] = useState<Post[]>([]);
const [points, setPoint] = useState([]);
console.log({posts:posts});
// console.log(console.log({posts:latLng(posts[1].coordinates[1], posts[1].coordinates[0]), position:position}))

if(posts){
  console.log(posts)
  return (
    <>
      {posts.map((post) => (
        <Marker key={post.id} position={latLng(post.coordinates[0], post.coordinates[1])} icon={ICON}>
          <Popup>{`${post.content}`}<a href={GOOGLEMAPSETTING(post.coordinates[0],post.coordinates[1])} target="_blank" rel="noopener noreferrer">googleMapで付近を探索</a></Popup>
        </Marker>
      ))}
    </>
  );
}
};
