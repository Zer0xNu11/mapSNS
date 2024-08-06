import { auth } from "@/auth";
import Books from "@/components/book/Books";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function BooksPage() {
  const session = await auth();
  return (
    <>
      <Link href="../create/note">
        <Button>新規ノート</Button>
      </Link>
      <div>
        <Books />
      </div>
    </>
  );
}
