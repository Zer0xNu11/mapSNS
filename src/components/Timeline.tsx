import React from 'react'
import Posts from './Post/Posts'
import { PostsProps } from './Post/Posts'

const Timeline = ({noteId}:PostsProps) => {
  return (
    <div className="min-h-screen bg-gray-100">
    <main className="container mx-auto py-4">
      <Posts noteId = {noteId}/>
    </main>
  </div>
  )
}

export default Timeline