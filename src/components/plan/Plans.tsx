import React from 'react'
import { PlanType} from '@/types'
import { auth } from '@/auth'
import Plan from './Plan';


const getLatestplan = async (id : string) : Promise<PlanType[]> => {
  const response = await fetch(`${process.env.API_URL}/plans/${id}`,{
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
  const session = await auth();
  const userId = session?.user?.id
  const plans = userId? await getLatestplan(userId) : null;

  return (
    <>
      {plans ? plans.map((plan)=><Plan key={plan.id} plan={plan}/>) : 'No plan'}
    </>
  )
}
