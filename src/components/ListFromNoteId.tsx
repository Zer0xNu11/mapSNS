"use client";
import React, { useEffect, useState } from "react";
import Posts from "./Post/Posts";
import { getNotePosts } from "@/lib/getPosts";
import { PostType } from "@/types";
import { Image } from "@phosphor-icons/react/dist/ssr/Image";
import { ChatText } from "@phosphor-icons/react/dist/ssr/ChatText";
import { usePostDisplayMode } from "@/store";

export interface NoteIdProps {
  noteId: string;
}

const ListFromNoteId = ({ noteId }: NoteIdProps) => {
  const [posts, setPosts] = useState<PostType[]>();
  const { postDisplayMode, setPostDisplayMode } = usePostDisplayMode();

  const togglePostDisplayMode = () => {
    postDisplayMode === "pict"
      ? setPostDisplayMode("text")
      : setPostDisplayMode("pict");
  };

  useEffect(() => {
    const initialize = async () => {
      const data = await getNotePosts(noteId);
      setPosts(data);
    };

    initialize();
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gray-100 rounded-xl relative">
        <div className="fixed bottom-0 h-12 my-4 z-[1000]">
          <button
            className="bg-gray-100 rounded-tr-full p-4"
            onClick={togglePostDisplayMode}
          >
            {postDisplayMode === "pict" ? (
              <ChatText
                className="mt-2"
                size={32}
                color="#080808"
                weight="duotone"
              />
            ) : (
              <Image
                className="mt-2"
                size={32}
                color="#262626"
                weight="duotone"
              />
            )}
          </button>
        </div>
        <main className="container mx-auto py-4">
          {posts ? <Posts posts={posts} /> : ""}
        </main>
      </div>
    </>
  );
};

export default ListFromNoteId;
