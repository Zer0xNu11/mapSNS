"use server";
import { z } from "zod";
import { AuthError } from "next-auth";
import bcrypt from "bcrypt";

import { signIn, signOut } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT, publicRoutes } from "@/routes";
import { LoginSchema, RegisterSchema } from "@/lib/schemas";
import { getUserByEmail } from "@/app/db/user";
import { prismadb } from "@/globals/db";

//Login==================================================================
export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password } = validatedFields.data;

  try {
    await signIn("credentials", {
      email: email,
      password: password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials." };
        default:
          return { error: "Something went wrong." };
      }
    }
    throw error;
  }
  return { success: "Email sent!" };
};

//Logout==================================================================

// export async function logout() {
//   try {
//     console.log('================signout=================')
//     await signOut();
//   } catch (error) {
//     throw error;
//   }
// }

//Register==================================================================

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, name } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "このメールアドレスはすでに使われています" };
  }

  const createdUser = await prismadb.user.create({
    data: {
      name: name,
      email: email,
      password: hashedPassword,
      imageUrl: "",
    },
  });

  const createdNote = await prismadb.note.create({
    data: {
      title: "最初のノート",
      content: "",
      authorId: createdUser.id,
    },
  });

  const createdPost1 = await prismadb.post.create({
    data: {
      content:
        "リストモードの説明:リスト左下の画像マークで画像とコメントの入れ替え/投稿右下の３つの点で投稿の詳細メニュー",
      authorId: createdUser.id,
      imageUrl:
        "/images/manual/listManual.png" ||
        null,
      noteId: createdNote.id,
      category: "other",
      order: 1,
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
          imageUrl: true,
        },
      },
    },
  });

  await prismadb.$executeRaw`
  UPDATE "Post"
  SET location = ST_SetSRID(ST_MakePoint(${39.652924}, ${134.435833}), 4326)
  WHERE id = ${createdPost1.id}
`;

  const createdPost2 = await prismadb.post.create({
    data: {
      content:
        "ようこそ「ぶらつ記」へ、まずは画面右下の緑のピンで初めての投稿をしてみよう。",
      authorId: createdUser.id,
      imageUrl:
        "/images/manual/homeManual.png" ||
        null,
      noteId: createdNote.id,
      category: "other",
      order: 2,
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
          imageUrl: true,
        },
      },
    },
  });

  await prismadb.$executeRaw`
  UPDATE "Post"
  SET location = ST_SetSRID(ST_MakePoint(${39.652924}, ${134.435833}), 4326)
  WHERE id = ${createdPost2.id}
`;

  const createdPlan = await prismadb.plan.create({
    data: {
      title: "最初のプラン",
      content: "",
      userId: createdUser.id,
    },
    include: {
      user: true,
    },
  });

  return {
    success: "User created",
    noteId: createdNote.id,
    noteTitle: createdNote.title,
    planId: createdPlan.id,
    planTitle: createdPlan.title,
  };
};
