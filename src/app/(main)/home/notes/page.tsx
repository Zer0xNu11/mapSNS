import { auth } from "@/auth";
import Notes from "@/components/note/Notes";
import { Button } from "@/components/ui/button";
import { SessionProvider } from "next-auth/react";
import Link from "next/link";

export default async function NotesPage() {
  const session = await auth();
  // console.log({sessionhome: session})
  return (
    <>
      <Link href="../create/note">
        <Button className="mt-2 ml-2">＋新規ノート</Button>
      </Link>
      <div>
        <Notes />
      </div>
    </>
  );
}
