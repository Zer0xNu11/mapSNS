import React from 'react'
import { PlanType} from '@/types'
import { auth } from '@/auth'
import Plan from './Plan';


const getLatestplan = async () : Promise<PlanType[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/plans/getPlans`,{
    cache:'no-store', //キャッシュ無効化のオプション
  });
  // console.log('Fetching URL:', response);

  if(response.status !== 200){
    throw new Error('不正な値です');
  }

  const data = await response.json();
  console.log({data: data})
  return data.data as PlanType[];
}

export default async function Plans(){
  const plans = await getLatestplan();

  return (
    <>
      {plans ? plans.map((plan)=><Plan key={plan.id} plan={plan}/>) : 'No plan'}
    </>
  )
}
