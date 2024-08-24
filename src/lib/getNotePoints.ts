import { auth } from "@/auth";
import { prismadb } from "@/globals/db";

export async function getNotePoints(noteId : string) {


  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notes/getNotePoints/${noteId}`, {
    cache: "no-store",
  });

  const data = await response.json();
  console.log({data:data})
  return data;
}