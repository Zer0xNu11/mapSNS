'use client'
import { Button } from '@/components/ui/button'
import React from 'react'

const UserSetting = () => {

  const delData = async() =>{
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/control/deleteData`,{
      cache:'no-store', //キャッシュ無効化のオプション
    });
  
    if(response.status !== 200){
      throw new Error('不正な値です');
    }
  
    const data = await response.json();
    console.log({data: data})
    return data.posts;
  }

  const makeDumy = async() =>{
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/control/createData`,{
      cache:'no-store', //キャッシュ無効化のオプション
    });
  
    if(response.status !== 200){
      throw new Error('不正な値です');
    }
  
    const data = await response.json();
    console.log({data: data})
    return data.posts;
  }


  return (
    <>
    <div>UserSetting</div>
    <Button onClick={delData}>delete All</Button>
    <Button onClick={makeDumy}>make dummy</Button>
    </>
  )
}

export default UserSetting