import { prismadb } from "@/globals/db";
import { auth } from "@/auth";
import PlanPointDetail from "@/components/planPoint/PlanPointDetail";

const DetailPlanPoint = async ({
  params,
}: {
  params: { planPointId: string };
}) => {
  console.log("====== Detail PlanPoint========");
  const session = await auth();
  const userId = session?.user?.id;

  const data = await prismadb.planPoint.findUnique({
    where: {
      id: params.planPointId,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          imageUrl: true,
        },
      },
    },
  });


  if (!data) {
    return <div>存在しない投稿です</div>;
  }

  const planPoint = {
    ...data, 
    createdAt: data.createdAt.toISOString(),
    updatedAt: data.updatedAt.toISOString(),
    content: data.content ?? undefined,
    imageUrl: data.imageUrl ?? undefined,  
    postId: data.postId ?? undefined,  
  }

  // const isOwn = userId === planPoint.user.id ? true : false;

  return (
    <>
    <PlanPointDetail planPoint = {planPoint}  path={'/home'}/>
    </>
  );
};

export default DetailPlanPoint;
