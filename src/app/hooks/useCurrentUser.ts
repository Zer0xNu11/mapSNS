// 'use client'
// import fetcher from "@/lib/fetcher";
// import useSWR from "swr";


// const useCurrentUser = () => {
//   const {data, error, isLoading, mutate} = useSWR('/api/current', fetcher);

//   return {
//     data,
//     error,
//     isLoading,
//     mutate
//   }
// };

// export default useCurrentUser;

// /*
// useSWR 
// 第一引数 '/api/current' データをフェッチするAPIエンドポイント
// 第二引数 (今回はfetcher)  実際にデータを取得する関数
// */