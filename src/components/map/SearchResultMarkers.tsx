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
import { useNoteSlot, usePlanSlot, useSearchedNoteSlot, useSelectedPostStore } from "@/store";
import { PostLeafletType } from "@/types";
import { tracePost } from "@/lib/createPlan";
import { getNoteData } from "@/lib/getPosts";

interface SearchResultMarkersProps {
  posts: PostLeafletType[];
  planId: string;
}

export const SearchResultMarkers: React.FC<SearchResultMarkersProps> = ({
  posts,
  planId,
}) => {
  // const [posts, setPosts] = useState<Post[]>([]);
  const [points, setPoint] = useState([]);
  const { selectedPostId, setSelectedPostId } = useSelectedPostStore();
  const { planSlot, setPlanSlot } = usePlanSlot();
  const [polylineCoordinates, setPolylineCoordinates] = useState();
  const {searchedNoteSlot, setSearchedNoteSlot} = useSearchedNoteSlot();

  const searchNoteId = async (noteId: string) => {
    const data = await getNoteData(noteId);
    setSearchedNoteSlot(data);
  };

  const addPlan = async (lat:number,lng:number) => {
    if (planId && selectedPostId) {
      const data = await tracePost(planId, selectedPostId);
      const newPlan = {
        ...data,
        coordinates: [lat,lng] as [number,number],
      }
      setPlanSlot(planSlot.concat(newPlan));
      setSelectedPostId("");
    }
  };

  if (posts) {
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
              <div>
                {post.imageUrl ? <img
                  className="object-cover w-full h-full rounded-2xl mb-2"
                  src={post.imageUrl}
                  alt="Post Image"
                /> : ""}
                {`${post.content}`}
              </div>
              <br />
              <div className="flex flex-row gap-2">
                <button
                  onClick={() => searchNoteId(post.noteId)}
                  className={`mt-2 bg-gray-700 hover:bg-gray-600 duration-200 text-white font-semibold py-2 px-4 rounded disabled:bg-gray-300`}
                >
                  レコード表示
                </button>
                <br />
                <button
                  onClick={() => addPlan(post.coordinates[0], post.coordinates[1])}
                  type="submit"
                  className={`mt-2 bg-gray-700 hover:bg-gray-600 duration-200 text-white font-semibold py-2 px-4 rounded disabled:bg-gray-300`}
                >
                  プランへ追加
                </button>
              </div>
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
          <Polyline
            pathOptions={LINE_COLOR.red}
            positions={polylineCoordinates}
          />
        ) : (
          ""
        )}
      </>
    );
  }
};
