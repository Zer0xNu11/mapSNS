import React from 'react'
import Link from 'next/link'
import { Button } from './ui/button'
import Posts from './Post/Posts'

const RecordForm = () => {
  return (
    <div className="min-h-screen bg-gray-100">
    <main className="container mx-auto py-4">
      <Link href='/create-post'>
      <Button>投稿</Button>
      </Link>
      <Posts />
    </main>
  </div>
  )
}

export default RecordForm