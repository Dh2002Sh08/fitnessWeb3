import { ConnectEmbed, ThirdwebProvider } from "@/app/thirdweb";
import { client } from "../../client";
import { chain } from "../../chain";
import { Stake } from "@/components/Stake";

export default function Home() {
  return (
<div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-black to-[#4B0082]">

    <div className="bg-white/50 dark:bg-white/10 backdrop-blur-md shadow-md rounded-lg p-4 max-w-md w-full mx-auto flex flex-col gap-4 items-center justify-center">
        <ThirdwebProvider>
          <ConnectEmbed client={client} chain={chain} />
        <Stake />
        </ThirdwebProvider>
        
      </div>
    </div>
  );
}
