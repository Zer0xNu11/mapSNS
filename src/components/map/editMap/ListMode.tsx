import Loading from "@/app/loading";
import Posts from "@/components/Post/Posts";
import { getPostsCreatedAt } from "@/lib/getPosts";
import { PostType } from "@/types";
import React, { useEffect, useState } from "react";

const ListMode = async() => {

const posts = await getPostsCreatedAt();

  return (
    <div>
      ListMode
      {posts ? <Posts posts={posts} /> : Loading()}
    </div>
  );
};

export default ListMode;
