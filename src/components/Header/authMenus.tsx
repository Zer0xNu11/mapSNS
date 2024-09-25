import React from "react";
import { signIn, signOut } from "@/auth";
import { Button } from "../ui/button";
import Link from "next/link";
import { currentDataReset } from "@/actions/currendDataReset";

export function SignIn({
  provider,
  ...props
}: { provider?: string } & React.ComponentPropsWithRef<typeof Button>) {
  return (
    <form action={async()=> {
      'use server';
      await signIn(provider);
    }}>
      <Button {...props}>サインイン</Button>
    </form>
  );
}

export function SignOut({
  provider,
  ...props
}: { provider?: string } & React.ComponentPropsWithRef<typeof Button>) {
  return (
    <form className="w-full" 
      action={async()=> {
      'use server';
      currentDataReset()
      await signOut();
    }}>
      <Button variant="ghost" className="w-full p-0" {...props}>
        ログアウト
      </Button>
    </form>
  );
}

export function BioMenu(){
  return(
    <Link href="/bio-menu" className="w-full">
    <Button variant="ghost" className="w-full p-0 ">
      プロフィール
    </Button>
    </Link>
  )
}

export function UserSetting(){
  return(
    <Link href="/user-setting" className="w-full">
    <Button variant="ghost" className="w-full p-0 ">
      設定
    </Button>
    </Link>
  )
}

