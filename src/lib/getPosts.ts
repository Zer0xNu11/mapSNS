import { NoteType, PostType } from '../types'


export const getLatestPosts = async (id : string) : Promise<PostType[]> => {
  const response = await fetch(`${process.env.API_URL}/posts/${id}`,{
    cache:'no-store', //キャッシュ無効化のオプション
  });
  // console.log('Fetching URL:', response);

  if(response.status !== 200){
    throw new Error('不正な値です');
  }

  const data = await response.json();
  console.log({data: data})
  return data.data as PostType[];
}

export const getNotePost = async (noteId: string): Promise<PostType[]> => {
  const response = await fetch(`${process.env.API_URL}/posts/notePost/${noteId}`, {
    cache: "no-store",
  });

  const data = await response.json();
  return data.data as PostType[];
};