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

