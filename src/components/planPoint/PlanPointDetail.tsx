"use client";

import { PlanPointType} from "@/types";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { deletePost } from "@/lib/deletePost";

interface PlanPointDetailProps {
  planPoint: PlanPointType;
  path: string;
}

const PlanPointDetail: React.FC<PlanPointDetailProps> = ({ planPoint, path }) => {
  const currentPath = path;

  return (
    <>
      <div className="bg-white w-full h-full">
        <Link href={currentPath}>
          <Button>←戻る</Button>
        </Link>

        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-row items-center pt-2 pl-2">
            <Image
              className="w-10 h-10 rounded-full mr-2"
              src="/images/placeholder.png"
              width="100"
              height="100"
              alt="User Avatar"
            />
            <div className="flex flex-col w-full">
              <h2 className="font-semibold text-md">{planPoint.user.name}</h2>
              <p className="text-gray-500 text-sm ">
                {new Date(planPoint.createdAt).toLocaleString()}
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center my-4">
            {planPoint.imageUrl ? (
              <img
                className="max-w-[80vw] max-h-[50vh] object-contain"
                src={planPoint.imageUrl || "/images/blank.png"}
                alt="PlanPoint Image"
              />
            ) : (
              ""
            )}
            <div className="w-full my-4">
              <p className="text-gray-700 break-word whitespace-pre-line m-4">
                {planPoint.content}
              </p>
            </div>
          </div>
        </div>

          <div className="flex flex-row justify-center gap-4">
            <Link
              href={`${process.env.NEXT_PUBLIC_BASE_URL}/edit/planPoint/${planPoint.id}`}
            >
              <Button className="w-full">編集</Button>
            </Link>
            {/* <Button className="" onClick={() => deletePost(planPoint.id, path)}>
              削除
            </Button> */}
          </div>
      </div>
    </>
  );
};

export default PlanPointDetail;
