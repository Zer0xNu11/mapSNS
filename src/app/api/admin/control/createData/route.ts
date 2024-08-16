import { auth } from "@/auth";
import { prismadb } from "@/globals/db";
import { NextRequest, NextResponse } from "next/server";
import { faker } from "@faker-js/faker";

export const GET = async (_: NextRequest) => {
  console.log("======APIconect GetDeleteData========");
  const session = await auth();
  const userId = session?.user?.id;
  const loop = (n = 10) => Array.from({ length: n });
  try {
    if (userId) {
      const userData = await prismadb.user.findUnique({
        where: { id: userId },
      });
      console.log({ role: userData?.role });
      if (userData?.role !== "ADM") {
        throw new Error("不正なアクセスを検知");
      }
    } else {
      throw new Error("不正なアクセスを検知");
    }
    await Promise.all(
      loop(20).map(async () => {
        if (!session?.user?.id) {
          throw new Error();
        }
        const createdNote = await prismadb.note.create({
          data: {
            title: faker.lorem.words(2),
            content: faker.lorem.paragraph() || "",
            authorId: session?.user?.id,
          },
          include: {
            author: true,
            posts: true,
          },
        });

        loop(5).map(async () => {
          if (!session?.user?.id) {
            throw new Error();
          }
          const createdPost = await prismadb.post.create({
            data: {
              content: faker.lorem.paragraph(),
              authorId: session?.user?.id,
              imageUrl: faker.image.url() || null,
              noteId: createdNote.id,
            },
            include: {
              author: true,
            },
          });

          //位置情報 SQL
          await prismadb.$executeRaw`
        UPDATE "Post"
        SET location = ST_SetSRID(ST_MakePoint
        (
         ${faker.location.longitude({ max: 139.77, min: 139.75, precision: 7})},
         ${faker.location.latitude({ max: 35.69, min: 35.67, precision: 7 })}
        ),
        4326)
        WHERE id = ${createdPost.id}
      `;
        });
      })
    );

    return NextResponse.json({ message: "成功" });
    //jsonレスポンス
  } catch (err) {
    console.log({ err: err });
    return NextResponse.json({ message: "失敗", ERROR: err });
  }
};

export const dynamic = "force-dynamic"; //キャッシュを無視する設定
