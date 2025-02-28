import { Switch } from "@/components/ui/switch";
import BackgroundMascots from "./components/BackgroundMascots";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { useUser } from "@/shared/stores/authStore";
import UserAvatar from "@/shared/components/UserAvatar";
import { Button } from "@/components/ui/button";
import Icon from "@/shared/components/Icon";

export default function () {
  const user = useUser();
  const [showMascots, setShowMascots] = useState(true);

  const referralLink = location.hostname + "?ref=" + user?.referralCode;

  if (!user) return <>plese wait</>;

  return (
    <div className="min-h-screen relative flex flex-col items-center py-[5vh] px-[17vw]">
      <div className="text-2xl sm:text-3xl md:text-4xl flex items-center gap-x-3 drop-shadow-lg">
        <img
          src="/logo.png"
          alt="logo"
          className="size-[1.2em] sm:size-[2em]"
        />
        <h1 className="font-semibold tracking-widest">PUMPFAXT</h1>
      </div>

      <div className="flex self-stretch gap-x-5 my-5">
        <Card className="flex-1 bg-card/5 backdrop-blur-sm rounded-md">
          <CardContent className="flex gap-x-5">
            <UserAvatar
              user={user}
              className="aspect-square object-cover rounded-md border"
            />
            <div className="flex max-w-2/3 flex-col gap-y-8">
              <div className="flex">
                <h2 className="text-3xl truncate flex-1">{user.name}</h2>
              </div>

              <div className="flex gap-x-3">
                <Button
                  variant="outline"
                  className="bg-black flex items-center text-white font-mono text-sm gap-x-2 tracking-tighter uppercase"
                >
                  <img
                    src="https://x.com/favicon.ico"
                    className="size-[1.5em]"
                  />
                  {`@${user.twitter}`}
                </Button>

                <div className="relative">
                  <Button
                    variant="default"
                    className="text-[#24a2df] flex items-center font-bold font-mono text-sm gap-x-2 tracking-tighter uppercase"
                  >
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/2111/2111644.png"
                      className="size-[1.5em]"
                    />
                    {`Connect`}
                  </Button>
                  <p className="text-xs absolute top-full text-foreground/80 py-1">
                    + 50 points
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="flex-1 bg-card/5 backdrop-blur-sm rounded-md">
          <CardContent className="flex flex-col">
            <div className="flex gap-x-5">
              <p className="flex gap-x-2 text-xl">
                <Icon name="user-plus" /> Referral
              </p>
            </div>

            <p className="text-xs text-foreground/50">Earn points by referring your friends</p>

            <div className="border p-2 rounded-md flex justify-between items-center mt-2">
              <p className="text-foreground/75">{referralLink} <span className="select-none pl-5 text-[10px] text-foreground">{"( +100 points )"}</span></p>
              <Button className="text-sm active:motion-preset-shake" variant={"secondary"}>
                <Icon name="copy" /> Copy
              </Button>
            </div>
          </CardContent>
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
