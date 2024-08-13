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



const Book: React.FC<BookProps> = async ({book}) => {

  return (
    <>
    <div className="bg-green-300 shadow-md rounded-lg m-4 p-4 mb-4 flex flex-row justify-between h-[20vh]">
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
