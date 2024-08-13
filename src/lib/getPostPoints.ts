export const getPostPointsCreatedAt = async () => {
  // 絶対pathだとなぜかうまく行かない
  const response = await fetch(`/api/posts/points/createdAt`,{
    cache:'no-store', //キャッシュ無効化のオプション
  });

  if(response.status !== 200){
    throw new Error('不正な値です');
  }

  const data = await response.json();
  console.log({data: data})
  return data.posts;
}