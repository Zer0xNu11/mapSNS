export const getPostPointsCreatedAt = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/points/createdAt`,{
    cache:'no-store', //キャッシュ無効化のオプション
  });

  if(response.status !== 200){
    throw new Error('不正な値です');
  }

  const data = await response.json();
  console.log({data: data})
  return data.posts;
}

//削除予定