import Plans from "@/components/plan/Plans";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function PlanPage() {
  return (
    <>
      <Link href="../create/plan">
        <Button className="mt-2 ml-2">＋新規メモリ</Button>
      </Link>
      <div>
        <Plans />
      </div>
    </>
  );
}

