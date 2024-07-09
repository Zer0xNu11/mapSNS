'use client'

import React from 'react'
import Posts from './Posts'
import Link from 'next/link'
import { Button } from './ui/button'
import { post } from '@/actions/post'
import { createPost, FormState } from '@/actions/createPost'
import { useFormState } from 'react-dom'

const PostForm = () => {
  const initialState: FormState = {error: ''};
  const [state, formAction] = useFormState(createPost, initialState);
  useFormState


  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded p-4 mb-4">
        <form action={formAction}>
          <textarea
            name='post'
            className="w-full h-24 p-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="What's on your mind?"
          ></textarea>
          <button
            type="submit"
            className="mt-2 bg-gray-700 hover:bg-green-700 duration-200 text-white font-semibold py-2 px-4 rounded"
          >
            投稿
          </button>
        </form>
      </div>
  </div>
  )
}

export default PostForm