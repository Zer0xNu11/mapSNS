'use server';

import { cookies } from 'next/headers';

export async function currentDataReset() {
  const cookieNames = ['currentPlanId', 'currentPlanTitle', 'currentNoteId', 'currentNoteTitle'];

  cookieNames.forEach((name) => {
    cookies().set({
      name,
      value: '', 
      expires: new Date(0), 
      path: '/', 
    });
  });
}




// 'use server'; 

// import { cookies } from 'next/headers';

// export async function deleteCookieServerSide() {
//   cookies().set({
//     name: 'currentPlanId',
//     value: '', // 空の値に設定
//     expires: new Date(0), // 期限を過去に設定
//     path: '/', // クッキーの適用範囲
//   });
//   cookies().set({
//     name: 'currentPlanTitle',
//     value: '', // 空の値に設定
//     expires: new Date(0), // 期限を過去に設定
//     path: '/', // クッキーの適用範囲
//   });
//   cookies().set({
//     name: 'currentNoteId',
//     value: '', // 空の値に設定
//     expires: new Date(0), // 期限を過去に設定
//     path: '/', // クッキーの適用範囲
//   });
//   cookies().set({
//     name: 'currentNoteTitle',
//     value: '', // 空の値に設定
//     expires: new Date(0), // 期限を過去に設定
//     path: '/', // クッキーの適用範囲
//   });
// }