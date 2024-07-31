import { auth } from "@/auth";
import { prismadb } from "@/globals/db";
import { NoteType } from "@/types";
import Image from "next/image";
import { Button } from "../ui/button";

export interface NoteProps {
  note: NoteType;
  isLiked?: boolean;
  countLikes? : number;
  imageUrl? : string;
}

interface dataModel{
  userExists : boolean,
  countLikes : number,
}

const getIsLiked = async (noteId: string) => {
  console.log({noteId : noteId})
  const session = await auth();
  const userId = session?.user?.id
  try {
    if (userId) { 
      if (!noteId) {
        console.log('無効な投稿')
        return ''
      }
      const note = await prismadb.note.findUnique({
        where:{
          id: noteId
        }
      });


      if(!note){
        throw new Error('invalid ID')
      }

      const userExists = note?.likedIds.includes(userId) ?? false;
      const countLikes = note?.likedIds.length

      const data : dataModel = {
        userExists : userExists,
        countLikes : countLikes,
      }

      console.log({
        noteId : note.id,
        userExists : userExists,
        countLikes : countLikes,
      })

      return data;
      
      
    }
  } catch (err) {
    console.log("いいねできない");
    return err;
  }

}



const Note: React.FC<NoteProps> = async ({note}) => {
  // const isLiked = await getIsLiked(note.id);
  const data : dataModel = await getIsLiked(note.id) as dataModel;
  const {userExists, countLikes} = data
  const isLiked = userExists;
  

  console.log({ isLiked: isLiked });

  return (
    <>
    <div className="bg-white shadow-md rounded p-4 mb-4 flex flex-row justify-between h-[20vh]">
      <div className="mb-4 w-1/2 h-full">
        <div className="flex items-center mb-2">
          <Image
            className="w-10 h-10 rounded-full mr-2"
            src='/images/placeholder.png'
            width='100'
            height='100'
            alt="User Avatar"
          />
          <div>
            <h2 className="font-semibold text-md">{note.author?.name}</h2>
            <p className="text-gray-500 text-sm ">
              {new Date(note.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
        <p className="text-gray-700 break-all">{note.title}</p>
      </div>
      <div className="w-1/2 h-full items-center">
        <img
            className="mr-2 object-contain h-full"
            src={note.imageUrl || '/images/blank.png'}
            alt="User Avatar"
          />
      </div>
      <Button><a href={`/home/notes/${note.id}`}>書く</a></Button>
    </div>
    </>
  );
};

export default Note;
