// "use client"
// import PostForm from "@/components/Post/PostForm";
import dynamic from "next/dynamic";
import React from "react";



const CreatePost = () => {
  const PostForm = React.useMemo(
    () =>
      dynamic(() => import("@/components/Post/PostForm"), { //SSR停止　window error防止
        loading: () => <p>map is loading</p>,
        ssr: false,
      }),
    []
  );
  
  return (
    <>
      <div>
        {/* <PostForm /> */}
      </div>
    </>
  );
};

export default CreatePost;
