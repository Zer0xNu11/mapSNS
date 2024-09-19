"use client";

import { NoteSlotType, PostType } from "@/types";
import { PostLikeIcon } from "./PostLikeIcon";
import Image from "next/image";
import { useListDisplayMode, usePostDisplayMode, useSelectedPostStore } from "@/store";
import { motion } from "framer-motion";

export interface PostProps {
  post: NoteSlotType;
  imageUrl?: string;
}

const Post: React.FC<PostProps> = ({ post }) => {
  const { selectedPostId, setSelectedPostId } = useSelectedPostStore();
  const { postDisplayMode } = usePostDisplayMode();

  const clickHandler = () => {
    setSelectedPostId(post.id);
  };

  return (
    <>
      <div
        className={`relative shadow-md rounded-2xl  mb-4 h-44 [perspective:1000px]  ${
          selectedPostId === post.id ? "border-2 border-blue-500" : ""
        }`}
        onClick={clickHandler}
        data-post-id={post.id}
      >
        <motion.div
          className={`bg-white mb-4 h-full flex flex-col [backface-visibility:hidden] rounded-2xl p-4`}
          // ${
          //   post.imageUrl && postDisplayMode === "pict" ? "hidden" : ""
          // }
          initial={false}
          animate={{
            rotateY: post.imageUrl && postDisplayMode === "pict" ? 180 : 0,
          }}
          transition={{ duration: 0.6 }}
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          <div className="flex items-center mb-2 w-[280px]">
            <Image
              className="w-10 h-10 rounded-full mr-2"
              src="/images/placeholder.png"
              width="100"
              height="100"
              alt="User Avatar"
            />
            <div className="flex flex-col w-full">
              <h2 className="font-semibold text-md">{post.author?.name}</h2>
              <p className="text-gray-500 text-sm ">
                {new Date(post.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
          <div className="w-full">
            <p className="text-gray-700 break-word whitespace-pre-line line-clamp-4">
              {post.content}
            </p>
          </div>
        </motion.div>
        <motion.div
          className={`bg-white rounded-2xl w-full h-full items-center [backface-visibility:hidden] absolute top-0 `}
          // ${
          //   post.imageUrl && postDisplayMode === "pict" ? "" : "hidden"
          // }
          initial={false}
          animate={{
            rotateY: post.imageUrl && postDisplayMode === "pict" ? 0 : 180,
          }}
          transition={{ duration: 0.6 }}
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          <img
            className="object-cover w-full h-full rounded-2xl"
            src={post.imageUrl || "/images/blank.png"}
            alt="Post Image"
          />
        </motion.div>
        <div className="absolute z-30 right-4 top-4 ">
          <PostLikeIcon post={post} />
        </div>
      </div>
    </>
  );
};

export default Post;
