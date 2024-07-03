//api/auth/* へのルーティング時に発火

import { handlers } from "@/auth";


export const{GET, POST} = handlers;
// export const runtime = "edge" 
//Edge ランタイムは、Vercel や Cloudflare Workers のようなエッジコンピューティング環境で実行されるコード