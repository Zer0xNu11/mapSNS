import { auth } from "@/auth";
import Timeline from "@/components/Timeline";

export default function Home() {

  const session = await auth();
  console.log(session);
  return (
    <>
    <div>
      MainMenu
    </div>
    
    <div>
      <Timeline />
    </div>
    </>
    
  );
}
