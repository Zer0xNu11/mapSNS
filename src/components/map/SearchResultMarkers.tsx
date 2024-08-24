"use client";
import { useEffect, useState } from "react";
import { LatLng, latLng, icon, LatLngExpression } from "leaflet";
import { Marker, Polyline, Popup, useMapEvent } from "react-leaflet";
import { GOOGLEMAPSETTING } from "@/lib/mapSetting";
import { Button } from "../ui/button";
import { useSerachDataStore } from "@/store";
import { getNotePoints } from "@/lib/getNotePoints";
import { PostLeafletType } from "@/types";

interface SearchResultMarkersProps {
  posts: PostLeafletType[];
}

const ICON = icon({
  iconUrl: "/images/circleRed.svg",
  iconSize: [25, 25],
  iconAnchor: [12.5, 12.5],
  popupAnchor: [0, -30],
});

const limeOptions = { color: "lime" };

export const SearchResultMarkers: React.FC<SearchResultMarkersProps> = ({
  posts,
}) => {
  // const [posts, setPosts] = useState<Post[]>([]);
  const [points, setPoint] = useState([]);
  const [polylineCoordinates, setPolylineCoordinates] = useState();
  const { searchedPostId, searchedNoteId, addData } = useSerachDataStore();
  const searchNoteId = async (noteId: string) => {
    const { posts, polylineCoordinates } = await getNotePoints(noteId);
    console.log({ polylineCoordinates: polylineCoordinates });
    setPolylineCoordinates(polylineCoordinates);
  };
  console.log({ posts: posts });

  // console.log(console.log({posts:latLng(posts[1].coordinates[1], posts[1].coordinates[0]), position:position}))

  if (posts) {
    console.log(posts);

    return (
      <>
        {posts.map((post) => (
          <Marker
            key={post.id}
            position={latLng(post.coordinates[0], post.coordinates[1])}
            icon={ICON}
          >
            <Popup>
              {`${post.content}`}
              <br />
                <Button onClick={() => searchNoteId(post.noteId)}>
                  作成者のノートを表示
                </Button>
              <br />
              <a
                href={GOOGLEMAPSETTING(
                  post.coordinates[0],
                  post.coordinates[1]
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                googleMapで付近を探索
              </a>
            </Popup>
          </Marker>
        ))}
        {polylineCoordinates ? (
          <Polyline pathOptions={limeOptions} positions={polylineCoordinates} />
        ) : (
          ""
        )}
      </>
    );
  }
};
