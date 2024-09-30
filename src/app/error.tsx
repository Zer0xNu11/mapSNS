'use client'

import { Button } from '@/components/ui/button'
import { Link } from 'lucide-react'
import React from 'react'

const ErrorPage = () => {
  return (
    <div className='relative w-full h-full'>
    <div className='absolute m-auto inset-0 w-96 h-96 text-center flex flex-col justify-center'>
      <div className='text-4xl'>問題が発生しました</div>
      <div></div>
      <div className='text-2xl m-4'><Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/home`}><Button>ホームへ</Button></Link></div>
      </div>
  </div>
  )
}

export default ErrorPage
