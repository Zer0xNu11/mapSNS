'use client'

import {useSession} from 'next-auth/react';
import { PostType } from "@/types";
import { prismadb } from "@/globals/db";
import { PostLikeIcon } from "./PostLikeIcon";
import Image from "next/image";
import { getIsLiked } from '@/lib/getlikes';

export interface PostProps {
  post: PostType;
  isLiked?: boolean;
  countLikes?: number;
  imageUrl?: string;
}


const Post: React.FC<PostProps> = ({ post }) => {


  return (
    <>
      <div className="bg-white shadow-md rounded p-4 mb-4 flex flex-row justify-between h-[20vh]">
        <div className="mb-4 w-1/2 h-full">
          <div className="flex items-center mb-2">
            <Image
              className="w-10 h-10 rounded-full mr-2"
              src="/images/placeholder.png"
              width="100"
              height="100"
              alt="User Avatar"
            />
            <div>
              <h2 className="font-semibold text-md">{post.author?.name}</h2>
              <p className="text-gray-500 text-sm ">
                {new Date(post.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
          <p className="text-gray-700 break-all">{post.content}</p>
          <PostLikeIcon post={post}/>
        </div>
        <div className="w-1/2 h-full items-center">
          <img
            className="mr-2 object-contain h-full"
            src={post.imageUrl || "/images/blank.png"}
            alt="Post Image"
          />
        </div>
      </div>
    </>
  );
};

export default Post;
