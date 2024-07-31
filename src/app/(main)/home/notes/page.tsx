import { auth } from "@/auth";
import Notes from "@/components/note/Notes";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function NotesPage() {
  const session = await auth();
  // console.log({sessionhome: session})
  return (
    <>
      <Link href="../create/note">
        <Button>新規ノート</Button>
      </Link>
      <div>
        <Notes />
      </div>
    </>
  );
}
