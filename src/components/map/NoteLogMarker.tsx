"use client";
import { useState } from "react";
import { LatLng, latLng} from "leaflet";
import { Marker, Polyline, Popup } from "react-leaflet";
import { GOOGLEMAPSETTING, ICON_HIGHLIGHTED, ICON_Marker, LINE_COLOR} from "@/lib/mapSetting";
import { MapProps } from "./Map";
import { useSelectedPostStore } from "@/store";
import { PostLeafletType } from "@/types";


interface NoteLogMarkerProps {
  position: LatLng;
  posts: PostLeafletType[];
  polylineCoordinates: [number, number][];
}

export const NoteLogMarker: React.FC<NoteLogMarkerProps> = ({
  position,
  posts,
  polylineCoordinates,
}) => {
  // const [posts, setPosts] = useState<Post[]>([]);
  const { selectedPostId, setSelectedPostId } = useSelectedPostStore();
  const [points, setPoint] = useState([]);
  // console.log(console.log({posts:latLng(posts[1].coordinates[1], posts[1].coordinates[0]), position:position}))

  return (
    <>
      {posts.map((post) => (
        <Marker
          key={post.id}
          position={latLng(post.coordinates[0], post.coordinates[1])}
          icon={selectedPostId === post.id ? ICON_HIGHLIGHTED : ICON_Marker}
          eventHandlers={{
            click: () => setSelectedPostId(post.id),
          }}
        >
          <Popup>
            {`${post.content}`}
            <br />
            <a
              href={GOOGLEMAPSETTING(post.coordinates[0], post.coordinates[1])}
              target="_blank"
              rel="noopener noreferrer"
            >
              googleMapで付近を探索
            </a>
          </Popup>
        </Marker>
      ))}
      <Polyline pathOptions={LINE_COLOR.red} positions={polylineCoordinates} />
    </>
  );
};

//toString() オブジェクトを文字列に変換
