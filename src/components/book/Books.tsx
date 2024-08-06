import React from 'react'
import { BookType} from '@/types'
import { auth } from '@/auth'
import Book from './Book';


const getLatestBooks = async (id : string) : Promise<BookType[]> => {
  const response = await fetch(`${process.env.API_URL}/books/${id}`,{
    cache:'no-store', //キャッシュ無効化のオプション
  });
  // console.log('Fetching URL:', response);

  if(response.status !== 200){
    throw new Error('不正な値です');
  }

  const data = await response.json();
  console.log({data: data})
  return data.data as BookType[];
}

export default async function Books(){
  const session = await auth();
  const userId = session?.user?.id
  const books = userId? await getLatestBooks(userId) : null;

  return (
    <>
      {books ? books.map((book)=><Book key={book.id} book={book}/>) : 'No Books'}
    </>
  )
}
