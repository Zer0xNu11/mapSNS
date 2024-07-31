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
export const login = async (values: z.infer<typeof LoginSchema> ) => {
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
  return {success: 'Email sent!'};
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

  await prismadb.user.create({
    data: {
      name: name,
      email: email,
      password: hashedPassword,
      imageUrl: ''
    },
  });

  return { success: "User created" };
};
