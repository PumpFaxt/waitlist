import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Icon from "@/shared/components/Icon";
import UserAvatar from "@/shared/components/UserAvatar";
import useApi from "@/shared/hooks/useApi";
import { useUser } from "@/shared/stores/authStore";
import { useLinkAccount, usePrivy } from "@privy-io/react-auth";

export default function () {
  const user = useUser();
  const privy = usePrivy();

  const referralLink = location.hostname + "?ref=" + user?.referralCode;
  const referrer = useApi("getReferrer");

  if (!user) return null;

  return (
    <div className="flex self-stretch gap-x-5">
      <Card className="flex-1 bg-card/5 backdrop-blur-sm rounded-md">
        <CardContent className="flex gap-x-5">
          <Button
            className="absolute top-5 right-5"
            variant="destructive"
            onClick={() => {
              if (confirm("Are you sure you want to logout?")) {
                privy.logout();
              }
            }}
          >
            <Icon name="log-out" className="size-5" />
          </Button>

          <UserAvatar
            user={user}
            className="aspect-square object-cover rounded-md border"
          />
          <div className="flex max-w-2/3 flex-col gap-y-8">
            <div className="relative">
              <h2 className="text-3xl truncate flex-1">{user.name}</h2>
              <p className="text-xs text-foreground/50 absolute top-full translate-y-1 font-mono">
                {referrer.data && `Referred by @${referrer.data.name}`}
              </p>
            </div>

            <div className="flex gap-x-3">
              <Button
                variant="outline"
                className="bg-black flex items-center text-white font-mono text-sm gap-x-2 tracking-tighter uppercase"
              >
                <img src="https://x.com/favicon.ico" className="size-[1.5em]" />
                {`@${user.twitter}`}
              </Button>

              <div
                className={cn(
                  "relative",
                  user.telegram && "pointer-events-none"
                )}
              >
                <Button
                  variant="default"
                  onClick={() => {
                    privy.linkTelegram();
                  }}
                  className="text-[#24a2df] flex items-center font-bold font-mono text-sm gap-x-2 tracking-tighter uppercase"
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/2111/2111644.png"
                    className="size-[1.5em]"
                  />
                  {user.telegram || `Connect`}
                </Button>
                {!user.telegram && (
                  <p className="text-xs absolute top-full text-foreground/80 py-1">
                    + 50 points
                  </p>
                )}
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

          <p className="text-xs text-foreground/50">
            Earn points by referring your friends
            <br />
            <span className="text-foreground">+100 points</span>
          </p>

          <div className="border px-2 py-1 rounded-md flex justify-between items-center mt-2">
            <p className="text-foreground/75 font-mono">{referralLink}</p>
            <Button
              className="text-sm active:motion-preset-shake"
              variant={"secondary"}
              onClick={() => navigator.clipboard.writeText(referralLink)}
            >
              <Icon name="copy" /> Copy
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
