import { NextApiRequest, NextApiResponse } from 'next';
import { prismadb } from '@/globals/db';
import { NextRequest, NextResponse } from 'next/server';


export const POST = async (request: Request) => {
  console.log('======APIconect updatePlanOrderData ========')

  const { reorderedPlanPoints } = await request.json()

  try {
    await prismadb.$transaction(
      reorderedPlanPoints.map((point: any, index: number) =>
        prismadb.planPoint.update({
          where: { id: point.id },
          data: { order: index },
        })
      )
    );
    return NextResponse.json({ message: 'Order updated successfully' },{ status: 200 });
  } catch (error) {
    console.error('Error updating PlanPoint order:', error);
    return NextResponse.json({ message: 'Error updating order' }, { status: 500 });
  }
}