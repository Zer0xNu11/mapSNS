"use server";

import { auth } from "@/auth";
import { prismadb } from "@/globals/db";
import { NoteSlotType } from "@/types";
import { Prisma } from "@prisma/client";
import { redirect } from "next/navigation";

export async function searchPost(formData: FormData) {
  const session = await auth();
  const userId = session?.user?.id
  const latString: string | null = formData.get("lat") as string;
  const lngString: string | null = formData.get("lng") as string;
  const lat = latString ? parseFloat(latString) : null;
  const lng = lngString ? parseFloat(lngString) : null;

  const keyword: string | null = formData.get("keyword") as string;

  const startDateInput: string | null = formData.get("startDate") as string;
  const endDateInput: string | null = formData.get("endDate") as string;
  const startDate = startDateInput
    ? new Date(startDateInput)
    : new Date("2024-01-01");
  const endDate = endDateInput
    ? new Date(endDateInput)
    : new Date("2500-12-31");

  const category = ["food", "base", "other"].filter(
    (key) => formData.get(`${key}`) === "on"
  );

  const isOwnPost = formData.get('ownPost') === 'on' ? true : false;

  const likes = formData.get("likes")
    ? parseInt(formData.get("likes") as string, 10)
    : null;
  const maxLikes = formData.get("maxLikes")
    ? parseInt(formData.get("maxLikes") as string, 10)
    : null;
  const radius = formData.get("radius") as string | null;

  const searchRadius = () => {
    if (radius === null) return 620;
    if (radius === "small") return 200;
    if (radius === "medium") return 1000;
    if (radius === "large") return 5000;
  };
  console.log({ searchRadius: searchRadius() });
  console.log({ category: category });

  if (keyword === null) {
    throw new Error();
  }

  const conditions: Prisma.Sql[] = [
    Prisma.sql`location IS NOT NULL`,
    startDate && endDate
      ? Prisma.sql`"createdAt" BETWEEN ${startDate.toISOString()}::timestamp AND ${endDate.toISOString()}::timestamp`
      : Prisma.empty,
    category.length > 0
      ? Prisma.sql`"category" = ANY(${category}::text[])`
      : Prisma.empty,
    likes ? Prisma.sql`"totalLikes" >= ${likes}` : Prisma.empty,
    maxLikes === 0 || maxLikes ? Prisma.sql`"totalLikes" <= ${maxLikes}` : Prisma.empty,
    Prisma.sql`ST_DWithin(
     ST_Transform(location, 3857), 
     ST_Transform(ST_SetSRID(ST_MakePoint(${lng}, ${lat}), 4326), 3857), 
  ${searchRadius()})`,
    keyword ? Prisma.sql`"content" LIKE ${"%" + keyword + "%"}` : Prisma.empty,
    !isOwnPost && userId ? Prisma.sql`p."authorId" != ${userId}` : Prisma.empty,
  ].filter((condition): condition is Prisma.Sql => condition !== Prisma.empty);

  try {
    if (session?.user?.id) {
      const postData = await prismadb.$queryRaw<NoteSlotType[]>`
      SELECT
        p.id, 
        p."content", 
        p."createdAt", 
        p."updatedAt", 
        p."authorId", 
        p."imageUrl", 
        p."open", 
        p."noteId", 
        p."category", 
        p."tag", 
        p."totalLikes", 
        p."order",
        CASE 
        WHEN p.location IS NOT NULL THEN 
          json_build_array(
            (ST_AsGeoJSON(p.location)::json->'coordinates'->>1)::float,
            (ST_AsGeoJSON(p.location)::json->'coordinates'->>0)::float
          )
        ELSE NULL
      END as coordinates,
        u.id as "userId",
        u.name as "userName",
        u."imageUrl" as "userImageUrl"
      FROM "Post" p
      JOIN 
        "User" u ON p."authorId" = u.id
      WHERE ${Prisma.join(conditions, " AND ")}
      ORDER BY p."createdAt" DESC
      LIMIT 100
    `;

      const postIds = postData.map((post) => post.id);
      const like = await prismadb.like.findMany({
        where: {
          userId: session.user.id,
          postId: { in: postIds },
        },
        select: { postId: true },
      });

      const likedPostIds = new Set(like.map((like) => like.postId));
      const postsWithLikes = postData.map((post) => ({
        ...post,
        isLiked: likedPostIds.has(post.id),
      }));

      return postsWithLikes;
    }
  } catch (error) {
    console.log("検索失敗");
    throw error;
  }
}
