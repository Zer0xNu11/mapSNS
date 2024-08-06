import { auth } from "@/auth";
import { prismadb } from "@/globals/db";
import { BookType } from "@/types";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

export interface BookProps {
  book: BookType;
  isLiked?: boolean;
  countLikes? : number;
  imageUrl? : string;
}

interface dataModel{
  userExists : boolean,
  countLikes : number,
}

const getIsLiked = async (bookId: string) => {
  console.log({bookId : bookId})
  const session = await auth();
  const userId = session?.user?.id
  try {
    if (userId) { 
      if (!bookId) {
        console.log('無効な投稿')
        return ''
      }
      const book = await prismadb.book.findUnique({
        where:{
          id: bookId
        }
      });


      if(!book){
        throw new Error('invalid ID')
      }

      // const userExists = book?.likedIds.includes(userId) ?? false;
      // const countLikes = book?.likedIds.length

      // const data : dataModel = {
      //   userExists : userExists,
      //   countLikes : countLikes,
      // }

      // console.log({
      //   bookId : book.id,
      //   userExists : userExists,
      //   countLikes : countLikes,
      // })

      // return data;
      
      
    }
  } catch (err) {
    console.log("いいねできない");
    return err;
  }

}



const Book: React.FC<BookProps> = async ({book}) => {
  // const isLiked = await getIsLiked(book.id);
  const data : dataModel = await getIsLiked(book.id) as dataModel;
  const {userExists, countLikes} = data
  const isLiked = userExists;
  

  console.log({ isLiked: isLiked });

  return (
    <>
    <div className="bg-yellow-300 shadow-md rounded-lg m-4 p-4 mb-4 flex flex-row justify-between h-[20vh]">
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
            <h2 className="font-semibold text-md">{book.author?.name}</h2>
            <p className="text-gray-500 text-sm ">
              {new Date(book.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
        <p className="text-gray-700 break-all">{book.title}</p>
      </div>
      <div className="w-1/2 h-full items-center">
        <img
            className="mr-2 object-contain h-full"
            src={book.imageUrl || '/images/blank.png'}
            alt="User Avatar"
          />
      </div>
      <Link href={`/home/books/${book.id}`}>
      <Button>書く</Button>
      </Link>
    </div>
    </>
  );
};

export default Book;
