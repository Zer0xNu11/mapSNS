"use client";
import { useEffect, useState } from "react";
import { LatLng, latLng, icon, LatLngExpression } from "leaflet";
import { Marker, Polyline, Popup, useMapEvent } from "react-leaflet";
import {
  GOOGLEMAPSETTING,
  ICON_HIGHLIGHTED,
  ICON_Marker,
  LINE_COLOR,
} from "@/lib/mapSetting";
import { Button } from "../ui/button";
import { useSelectedPostStore, useSerachDataStore } from "@/store";
import { getNotePoints } from "@/lib/getNotePoints";
import { PostLeafletType } from "@/types";
import { tracePost } from "@/lib/createPlan";

interface SearchResultMarkersProps {
  posts: PostLeafletType[];
  planId: string
}

export const SearchResultMarkers: React.FC<SearchResultMarkersProps> = ({
  posts, planId
}) => {
  // const [posts, setPosts] = useState<Post[]>([]);
  const [points, setPoint] = useState([]);
  const { selectedPostId, setSelectedPostId } = useSelectedPostStore();
  const [polylineCoordinates, setPolylineCoordinates] = useState();
  const { searchedPostId, searchedNoteId, addData } = useSerachDataStore();
  const searchNoteId = async (noteId: string) => {
    const { polylineCoordinates } = await getNotePoints(noteId);
    console.log({ polylineCoordinates: polylineCoordinates });
    setPolylineCoordinates(polylineCoordinates);
  };
  console.log({ posts: posts });

  const onClick = async() =>{
    if(planId && selectedPostId){
      await tracePost(planId, selectedPostId) 
    }
  }

  // console.log(console.log({posts:latLng(posts[1].coordinates[1], posts[1].coordinates[0]), position:position}))

  if (posts) {
    console.log(posts);

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
              <Button onClick={() => searchNoteId(post.noteId)}>
                作成者のノートを表示
              </Button>
              <br />
              <button
                onClick={onClick}
                type="submit"
                className={`mt-2 bg-gray-700 hover:bg-gray-600 duration-200 text-white font-semibold py-2 px-4 rounded disabled:bg-gray-300`}
              >
                プランへ追加
              </button>
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
          <Polyline pathOptions={LINE_COLOR.red} positions={polylineCoordinates} />
        ) : (
          ""
        )}
      </>
    );
  }
};
