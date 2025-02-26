import { Switch } from "@/components/ui/switch";
import BackgroundMascots from "./components/BackgroundMascots";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Card, CardTitle } from "@/components/ui/card";
import { usePrivy } from "@privy-io/react-auth";

export default function () {
  const privy = usePrivy();
  const [showMascots, setShowMascots] = useState(true);

  return (
    <div className="min-h-screen relative flex flex-col items-center py-[5vh] px-[10vw]">
      <div className="text-2xl sm:text-3xl md:text-4xl flex items-center gap-x-3 drop-shadow-lg">
        <img
          src="/logo.png"
          alt="logo"
          className="size-[1.2em] sm:size-[2em]"
        />
        <h1 className="font-semibold tracking-widest">PUMPFAXT</h1>
      </div>

      <div className="flex gap-x-5 my-5">
        <Card className="flex-1">
          <CardTitle>{}</CardTitle>
        </Card>

        <Card className="flex-1">
          <CardTitle>{}</CardTitle>
        </Card>
      </div>

      <div className="flex top-[96vh] right-4 absolute gap-x-2 items-center">
        <p className="text-sm text-foreground/70">It's raining memes</p>
        <Switch
          checked={showMascots}
          onCheckedChange={() => setShowMascots((s) => !s)}
        />
      </div>

      <BackgroundMascots
        className={cn(
          "absolute-cover h-screen duration-1000 z-[-1]",
          !showMascots && "opacity-0"
        )}
      />
    </div>
  );
}
