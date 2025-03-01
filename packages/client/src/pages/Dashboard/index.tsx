import { Switch } from "@/components/ui/switch";
import BackgroundMascots from "./components/BackgroundMascots";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useUser } from "@/shared/stores/authStore";
import Header from "./components/Header";
import Leaderboard from "./components/Leaderboard";
import useApi from "@/shared/hooks/useApi";

export default function () {
  const user = useUser();
  const [showMascots, setShowMascots] = useState(true);
  const referralsCount = useApi("getReferralsCount");
  const points = useApi("getPoints");

  if (!user) return <>Redirecting... Please reload if this takes too long</>;

  return (
    <div className="min-h-screen relative flex flex-col py-[5vh] px-[17vw]">
      <div className="text-2xl sm:text-3xl md:text-4xl flex items-center gap-x-3 drop-shadow-lg">
        <img
          src="/logo.png"
          alt="logo"
          className="size-[1.2em] sm:size-[2em]"
        />
        <h1 className="font-semibold tracking-widest">PUMPFAXT</h1>
      </div>

      <Header />

      {referralsCount.data && points.data && (
        <div className="flex p-4 bg-card items-center justify-evenly">
          <div className="">
            <p className="text-sm text-foreground/70">POINTS EARNED</p>
            <p>{points.data.points}</p>
          </div>

          <div className="">
            <p className="text-sm text-foreground/70">YOUR REFERRALS</p>
            <p>{referralsCount.data.count}</p>
          </div>
        </div>
      )}

      <Leaderboard />

      <div className="flex top-[96vh] right-4 fixed gap-x-2 items-center">
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
