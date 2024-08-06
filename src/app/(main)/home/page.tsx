import { auth } from "@/auth";
import Timeline from "@/components/Timeline";
import { Button } from "@/components/ui/button";
import { Link1Icon } from "@radix-ui/react-icons";
import Link from "next/link";

export default async function Home() {
  const session = await auth();
  // console.log({sessionhome: session})
  return (
    <>
      <div>
        <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/home/plan`}>
        <Button>プラン</Button>
        </Link>

        <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/home/notes`}>
        <Button>レコード</Button>
        </Link>

        <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/home/notes`}>
        <Button>シェア</Button>
        </Link>
      </div>
    </>
  );
}
