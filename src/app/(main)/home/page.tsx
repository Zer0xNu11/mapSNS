import { logout } from "@/actions/authAction";
import { auth } from "@/auth";
import Timeline from "@/components/Timeline";
import {Button} from "@/components/ui/button"
import { supabase } from "@/lib/supabase";

export default async function Home() {
  {console.log({supabase : supabase})}

  const session = await auth();
  // console.log({sessionhome: session})
  return (
    <>    
    <div>
      <Timeline />
    </div>
    </>
    
  );
}
