"use client";

import * as z from "zod";

import { CardWrapper } from "./card-wrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { useState, useTransition } from "react";
import { LoginSchema } from "@/lib/schemas";
import { login} from "@/actions/authAction";


export const LoginForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition(); //遅延処理用のhook

  /*useFormの中身 
  register inputタグに{...register('key名')}として含めるとhandlesubmit内の関数にdataオブジェクトのプロパティとして渡せる。useStateのかわりとなる機能。
  handleSubmit 入力値と関数の橋渡し
  formState:{error} エラーメッセージ管理
  */

  //z.infer zodのスキーマから型を作成する
  //resolver useFormのプロパティに含めることでバリデーションを適用する
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError(""); //送信処理開始時の初期化
    setSuccess("");

    //startTransition内のステート更新は優先度が低いとみなされる=>ユーザー操作の妨げにならないようにする
    startTransition(() => {
      login(values)
      .then((data)=>{
        setError(data.error);
        setSuccess(data.success)
      });
    });
  };

  return (
    <CardWrapper
      headerLabel="Login"
      backButtonLabel="Create an account?"
      backButtonHref="/register"
      showSocial
    >
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="sapce-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="email"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="password"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default LoginForm;
