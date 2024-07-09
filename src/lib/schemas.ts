import {z} from 'zod';

export const RegisterSchema = z.object({
  name: z.string().min(1,{
    message:'ユーザーネームを入力してください'
  }),
  email: z.string().email({
    message:'メールアドレスを入力してください'
  }),
  password: z.string().min(1,{
    message: 'パスワードを入力してください'
  }),
})

export const LoginSchema = z.object({
  email: z.string().email({
    message:'メールアドレスを入力してください'
  }),
  password: z.string().min(1,{
    message: 'パスワードを入力してください'
  }),
})

export const PostSchema = z.object({
  postText: z.string().max(60,{
    message:'最大60文字です'
  }),
})

