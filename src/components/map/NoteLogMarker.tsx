"use client";
import { useState } from "react";
import { LatLng, latLng } from "leaflet";
import { Marker, Polyline, Popup } from "react-leaflet";
import {
  GOOGLEMAPSETTING,
  ICON_HIGHLIGHTED,
  ICON_Marker,
  LINE_COLOR,
} from "@/lib/mapSetting";
import { MapProps } from "./Map";
import { useEditPlan, usePlanSlot, useSearchedNoteSlot, useSelectedPostStore } from "@/store";
import { PostLeafletType, PostType } from "@/types";
import { tracePost, tracePostAll } from "@/lib/createPlan";

interface NoteLogMarkerProps {
  pathOption: object;
  posts: PostLeafletType[];
  polylineCoordinates: [number, number][];
  searchedMode?: boolean;
  planId?: string;
}

export const NoteLogMarker: React.FC<NoteLogMarkerProps> = ({
  searchedMode,
  pathOption,
  posts,
  polylineCoordinates,
  planId,
}) => {
  // const [posts, setPosts] = useState<Post[]>([]);
  const { selectedPostId, setSelectedPostId } = useSelectedPostStore();
  const { searchedNoteSlot} = useSearchedNoteSlot();
  const { planSlot, setPlanSlot } = usePlanSlot();
  const { editPlanData } = useEditPlan();
  const [points, setPoint] = useState([]);

  const addPlan = async (lat: number, lng: number) => {
    if (planId && selectedPostId) {
      const data = await tracePost(planId, selectedPostId);
      const newPlan = {
        ...data,
        coordinates: [lat, lng] as [number, number],
      };
      setPlanSlot(planSlot.concat(newPlan));
      setSelectedPostId("");
    }
  };

  const addPlanAll = async (noteId: string, posts: PostLeafletType[]) => {
    if (planId && selectedPostId) {
      const datas = await tracePostAll(planId, noteId);
      const newPlans = datas.map((data : object, index : number)=>{
        const newPlan = {
          ...data,
          coordinates: [posts[index].coordinates[0], posts[index].coordinates[1]] as [number, number],
        };
        return newPlan
      })
      setPlanSlot(planSlot.concat(newPlans));
      setSelectedPostId("");
    }
  };

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
          {searchedMode ? (
            <Popup>
              <div>
                {post.imageUrl ? (
                  <img
                    className="object-cover w-full h-full rounded-2xl mb-2"
                    src={post.imageUrl}
                    alt="Post Image"
                  />
                ) : (
                  ""
                )}
                {`${post.content}`}
              </div>
              <br />
              <div className="flex flex-row gap-2">
                <br />
                <button
                  onClick={() =>
                    addPlan(post.coordinates[0], post.coordinates[1])
                  }
                  type="submit"
                  className={`mt-2 bg-gray-700 hover:bg-gray-600 duration-200 text-white font-semibold py-2 px-4 rounded disabled:bg-gray-300`}
                  disabled={editPlanData.id ? false : true}
                >
                  プランへ追加
                </button>
                <button
                  onClick={() =>
                    addPlanAll(post.noteId, posts)
                  }
                  type="submit"
                  className={`mt-2 bg-gray-700 hover:bg-gray-600 duration-200 text-white font-semibold py-2 px-4 rounded disabled:bg-gray-300 `}
                  disabled={editPlanData.id ? false : true}
                >
                  すべて追加
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
          ) : (
            <Popup>
              {`${post.content}`}
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
          )}
        </Marker>
      ))}
      <Polyline pathOptions={pathOption} positions={polylineCoordinates} />
    </>
  );
};

//toString() オブジェクトを文字列に変換
