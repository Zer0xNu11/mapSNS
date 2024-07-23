'use client'

import { createPost, FormState } from '@/actions/createPost'
import { useFormState } from 'react-dom'
import { useEffect, useRef, useState } from 'react'
import { useMarkerStore } from '@/store'
import PostLocation from '../map/PostLocation'



const PostForm = () => {
  const [text, setText] = useState('');
  const initialState: FormState = {error: ''};
  const [state, formAction] = useFormState(createPost, initialState);
  const limitLength = 60;  //文字数制限
  const [remLength, setRemLength] = useState(limitLength);
  
  const {marker} = useMarkerStore();

  const fileSelectRef = useRef<HTMLInputElement>(null);
  const fileSelect = () => {
    console.log(fileSelectRef.current);
    if(fileSelectRef.current){
    fileSelectRef.current.click();
    }
  };

  useEffect(()=>{
    setRemLength(limitLength-text.length)
  }, [text])

  useEffect(()=>{
    state.positionLat = marker?.lat || null;
    state.positionLng = marker?.lng || null;
    console.log({zustandmarker: marker})
    console.log({state: state.positionLng})
  },[marker])

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded p-4 mb-4 flex flex-col items-center">
        <form action={formAction}>
          <textarea
            name='post'
            className="w-full h-24 p-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="What's on your mind?"
            onChange={(e)=>{setText(e.target.value)}}
          ></textarea>
          <div className={`${remLength>=0 ? '' : 'text-red-500'}`}>{`残り${remLength}文字`}</div>
          <input type="file" name='file' ref={fileSelectRef}/>

          <button
            type="submit"
            className={`mt-2 bg-gray-700 hover:bg-green-700 duration-200 text-white font-semibold py-2 px-4 rounded disabled:opacity-40`}
            disabled={remLength>=0 ? false : true}
          >
            投稿
          </button>
        </form>
        <div className='w-[80%] h-[50vh]'>
         <PostLocation/>
        </div>
      </div>
  </div>
  )
}

export default PostForm