// // クッキーに保存する関数
// export const setCookie = (name: string, value: string, days: number) => {
//   const expires = new Date();
//   expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000); // 日数をミリ秒に変換
//   document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/`;
// };

// // クッキーを読み取る関数
// export const getCookie = (name: string) => {
//   const nameEQ = `${name}=`;
//   const cookiesArray = document.cookie.split(';');
  
//   for (let cookie of cookiesArray) {
//     cookie = cookie.trim();
//     if (cookie.indexOf(nameEQ) === 0) {
//       return decodeURIComponent(cookie.substring(nameEQ.length));
//     }
//   }
//   return null;
// };

// // クッキーを削除する関数
// export const deleteCookie = (name: string) => {
//   document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
// };



// export const setCurrentNoteData = (noteId : string, noteTitle : string) =>{
//   setCookie('currentNoteId', `${noteId}`, 7); 
//   setCookie('currentNoteTitle', `${noteTitle}`, 7); 
// }

// export const getCurrentNoteData = () =>{
//   const data = {
//     id: getCookie('currentNoteId'),
//     title:getCookie('currentNoteTitle'),
//   }
//   return data;
// }


// export const setCurrentPlanData = (planId : string, planTitle : string) =>{
//   setCookie('currentPlanId', `${planId}`, 7); 
//   setCookie('currentPlanTitle', `${planTitle}`, 7); 
// }

// export const getCurrentPlanData = () =>{
//   const data = {
//     id: getCookie('currentPlanId'),
//     title:getCookie('currentPlanTitle'),
//   }
//   return data;
// }

// export const deleteCurrentDataAtClient = async () =>{
//   deleteCookie('currentPlanId');
//   deleteCookie('currentPlanTitle');
//   deleteCookie('currentNoteId');
//   deleteCookie('currentNoteTitle');
// }


export const setCurrentNoteData = (noteId : string, noteTitle : string) =>{
  localStorage.setItem('currentNoteId', `${noteId}`); 
  localStorage.setItem('currentNoteTitle', `${noteTitle}`); 
}

export const getCurrentNoteData = () =>{
  const data = {
    id: localStorage.getItem('currentNoteId'),
    title:localStorage.getItem('currentNoteTitle'),
  }
  return data;
}

export const deleteCurrentNoteData = () =>{
  localStorage.setItem('currentNoteId', ''); 
  localStorage.setItem('currentNoteTitle', ''); 
}


export const setCurrentPlanData = (planId : string, planTitle : string) =>{
  localStorage.setItem('currentPlanId', `${planId}`); 
  localStorage.setItem('currentPlanTitle', `${planTitle}`); 
}

export const getCurrentPlanData = () =>{
  const data = {
    id: localStorage.getItem('currentPlanId'),
    title:localStorage.getItem('currentPlanTitle'),
  }
  return data;
}

export const deleteCurrentPlanData = () =>{
  localStorage.setItem('currentPlanId', ''); 
  localStorage.setItem('currentPlanTitle', ''); 
}

