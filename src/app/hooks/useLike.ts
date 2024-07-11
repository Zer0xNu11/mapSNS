// 'use client'
// import { useSession } from "next-auth/react"
// import { useCallback, useMemo } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";



// const useLike = ({ postId, userId }: { postId: string; userId?: string }) => {
//   const {data:session, status} = useSession();
//   const currentUser = session?.user
  
//   const { data: fetchedPost, mutate: mutateFetchedPost } = usePosts(postId);
//   const { mutate: mutateFetchedPosts } = usePosts(userId);

//   // const loginModal = useLoginModal();

//   const hasLiked = useMemo(() => {
//     const list = fetchedPost?.likedIds || [];

//     return list.includes(currentUser?.id);
//   }, [currentUser?.id, fetchedPost?.likedIds]);

//   const toggleLike = useCallback(async () => {
//     // if (!currentUser) {
      
//     //   return loginModal.onOpen();
//     // }

//     try {
//       let request;

//       if (hasLiked) {
//         request = () => axios.delete("/api/like", { data: { postId } });
//       } else {
//         request = () => axios.post("/api/like", { postId });
//       }

//       await request();
//       mutateFetchedPost();
//       mutateFetchedPosts();

//       toast.success('Success');
//     } catch (error) {
//       toast.error("something went wrong");
//     }
//   }, [
//     currentUser,
//     hasLiked,
//     postId,
//     mutateFetchedPost,
//     mutateFetchedPosts,
//     // loginModal
//   ]);

//   return{
//     hasLiked,
//     toggleLike
//   }
// };

// export default useLike