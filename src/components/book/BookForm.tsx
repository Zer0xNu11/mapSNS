'use client'

import { useFormState } from 'react-dom'
import { useEffect, useRef, useState } from 'react'
import type { PutBlobResult } from '@vercel/blob';
import {BookFormState, createBook} from '@/actions/createBook'



const BookForm = () => {
  const [titleText, setTitleText] = useState('');
  const initialState: BookFormState = {error: ''};
  const [state, formAction] = useFormState(createBook, initialState);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  const limitLength = 16;  //文字数制限
  const [remLength, setRemLength] = useState(limitLength);
  

  const fileSelectRef = useRef<HTMLInputElement>(null);

  useEffect(()=>{
    setRemLength(limitLength-titleText.length)
  }, [titleText])


  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded p-4 mb-4 flex flex-col items-center">
        <form action={formAction}>
          <input type='text' name='title' placeholder="ブックのタイトル" className='w-full p-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-400'
          onChange={(e)=>{setTitleText(e.target.value)}}
          />
          <textarea
            name='post'
            className="w-full h-24 p-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="ノートの紹介文(省略可)"
          ></textarea>
          <div className={`${remLength>=0 ? '' : 'text-red-500'}`}>{`残り${remLength}文字`}</div>

          <button
            type="submit"
            className={`mt-2 bg-gray-700 hover:bg-green-700 duration-200 text-white font-semibold py-2 px-4 rounded disabled:opacity-40`}
            disabled={remLength>=0 ? false : true}
          >
            作成
          </button>
        </form>
      </div>
  </div>
  )
}

export default BookForm