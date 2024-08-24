import Loading from "@/app/loading";
import { BookType} from "@/types";
import React from "react";

interface Params {
  params: { bookId: string };
}

const getBookData = async (bookId: string): Promise<BookType> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/books/getBookData/${bookId}`,
    {
      cache: "no-store", //キャッシュ無効化のオプション
    }
  );

  if (response.status !== 200) {
    throw new Error("不正な値です");
  }

  const data = await response.json();
  return data.data as BookType;
};

const BookPage = async ({ params }: Params) => {
  const bookId = params.bookId;
  
  try {
    const book = await getBookData(bookId);
    if (!book) {
      return <Loading />;
    }
    return (
      <>
      BookPage
      </>
    );
  } catch (err) {
    console.log(err);
  }
};

export default BookPage;
