import { logout } from "@/actions/authAction";
import { auth } from "@/auth";
import Timeline from "@/components/Timeline";
import {Button} from "@/components/ui/button"

export default async function Home() {

  const session = await auth();
  console.log({session: session})
  return (
    <>    
    <div>
      <Timeline />
    </div>
    </>
    
  );
}
