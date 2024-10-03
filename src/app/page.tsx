import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Top() {
  return (
    <>
      <main className="flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-700 to-black">
        <div className="space-y-6 text-center">
          <h1 className="text-6xl font-semibold text-white drop-shadow-md">
            ぶらつ記
          </h1>
          <p className="text-white text-lg pb-5 ">
            -さぁ旅に出よう-
          </p>
          <Link href="/login" className="m-5">
            <Button>ログイン</Button>
          </Link>
          <Link href="/register" className="m-5">
            <Button>新規登録</Button>
          </Link>
        </div>
      </main>
    </>
  );
}
