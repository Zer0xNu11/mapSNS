import { auth } from "@/auth";
import Plans from "@/components/plan/Plans";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function PlanPage() {
  const session = await auth();
  // console.log({sessionhome: session})
  return (
    <>
      {/* <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/home/books`}>
        <Button>Bookの編集</Button>
      </Link> */}
      <Link href="../create/plan">
        <Button>新規プラン</Button>
      </Link>
      <div>
        <Plans />
      </div>
    </>
  );
}