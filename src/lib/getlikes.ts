export const getIsLiked = async (postId: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/like/getIsLiked/${postId}`,{
    cache:'no-store', //キャッシュ無効化のオプション
  });

  if(response.status !== 200){
    throw new Error('不正な値です');
  }

  const data = await response.json();
  console.log({data: data})
  return data;
}