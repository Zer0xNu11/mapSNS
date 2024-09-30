'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const NotFoundPage = () => {
  return (
    <div className='relative w-full h-full'>
      <div className='absolute m-auto inset-0 w-96 h-96 text-center flex flex-col justify-center'>
        <div className='text-4xl'>404 NotFound</div>
        <div className='text-2xl m-4'><Link href={`${process.env.NEXT_PUBLIC_BASE_URL}`}><Button>タイトルへ</Button></Link></div>
        </div>
    </div>
  )
}

export default NotFoundPage
