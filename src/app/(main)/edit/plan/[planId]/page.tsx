import PlanEditForm from "@/components/plan/PlanEditForm";
import { prismadb } from "@/globals/db";
import { PlanType } from "@/types";

interface Params {
  params: { planId: string };
}

const EditPlanPage = async ({ params }: Params) => {
  const planId = params.planId;
  
  try{
    if (!planId) {
      return new Error('存在しないノート')
    }
    const planData = await prismadb.plan.findUnique({
      where:{
        id: planId
      },
      include: {
        user:true,
      }
    });

    if (!planData) {
      return <div>ノートが見つかりませんでした。</div>;
    }

    const plan: PlanType = {
      id: planData.id,
      title: planData.title,
      content: planData.content ?? undefined,
      createdAt: planData.createdAt.toISOString(),
      userId: planData.userId,
      imageUrl: planData.imageUrl ?? undefined,
    };



    return(
      <>
      <PlanEditForm plan ={plan}/>
      </>
    )
  }catch(err){
    return(<div>{`${err}`}</div>)
  }
  
}

export default EditPlanPage;

