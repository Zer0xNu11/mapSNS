'use client'

import { Button } from "../ui/button";
import { logout } from "@/actions/logout";
import { deleteCurrentNoteData, deleteCurrentPlanData } from "@/lib/localStorageHandler";
import { useEditNote, useEditPlan } from "@/store";


export function SignOut({
  provider,
  ...props
}: { provider?: string } & React.ComponentPropsWithRef<typeof Button>) {
  
  const { setEditPlanData } = useEditPlan();
  const { setEditNoteData } = useEditNote();
  const handleSignOut = async () => {
  
    try {
      deleteCurrentNoteData();
      deleteCurrentPlanData();
      setEditPlanData('','');
      setEditNoteData('','');

    }catch(err){
      console.error('ログアウト中にエラーが発生しました:', err);
    }
  }
      

  return (
    <form className="w-full" 
      action={ async () =>{
        await handleSignOut();
        await logout();
      }
        
        }>
      <Button variant="ghost" className="w-full p-0" {...props}>
        ログアウト
      </Button>
    </form>
  );
}