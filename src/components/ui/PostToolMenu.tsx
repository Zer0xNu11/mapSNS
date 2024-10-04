"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { Button } from "./button";

import { DotsThreeOutlineVertical } from "@phosphor-icons/react/dist/ssr/DotsThreeOutlineVertical";
import Link from "next/link";
import { getNoteData } from "@/lib/getPosts";
import { useEditPlan, usePlanSlot, useSearchedNoteSlot } from "@/store";
import { PostLeafletType, PostType } from "@/types";
import { tracePost } from "@/lib/createPlan";

interface PostToolMenuProps {
  post: PostLeafletType,
}


const PostToolMenu :React.FC<PostToolMenuProps>= ({post}) => {
  const { setSearchedNoteSlot} = useSearchedNoteSlot();
  const { planSlot, setPlanSlot } = usePlanSlot();
  const { editPlanData } = useEditPlan();

  const searchNoteId = async (noteId: string) => {
    const data = await getNoteData(noteId);
    setSearchedNoteSlot(data);
  };

  const addPlan = async (lat: number, lng: number) => {
    if (editPlanData && post.id) {
      const data = await tracePost(editPlanData.id, post.id);
      const newPlan = {
        ...data,
        coordinates: [lat, lng] as [number, number],
      };
      setPlanSlot(planSlot.concat(newPlan));
    }
  };

    return (
      <>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="focus:outline-none focus:ring-0 h-6 w-4 bg-gray-100 bg-opacity-50"
            >
              <DotsThreeOutlineVertical size={16} color="#000000" weight="fill" />
            </Button>
            {/* <div className="flex w-5 h-2 justify-center items-center">
              <DotsThreeOutlineVertical size={16} color="#000000" weight="fill" />
            </div> */}
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="z-[3000]"
            align="end"
            side="top"
            forceMount
          >
            {/* <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {session.user.name}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {session.user.email}
                  </p>
                </div>
              </DropdownMenuLabel> */}
            <DropdownMenuItem asChild><Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/detail/post/${post.id}`}>詳細を見る</Link></DropdownMenuItem>
            <DropdownMenuItem asChild><button onClick={()=>{searchNoteId(post.noteId)}} className="w-full">ノート表示</button></DropdownMenuItem>
            <DropdownMenuItem asChild><button onClick={()=>{addPlan(post.coordinates[0], post.coordinates[1])}} className="w-full disabled:text-gray-400" disabled={!editPlanData || editPlanData.id ===''}>プランへ追加</button></DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </>
    );
};

export default PostToolMenu;
