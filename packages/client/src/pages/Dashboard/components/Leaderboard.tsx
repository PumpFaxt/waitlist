import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import UserAvatar from "@/shared/components/UserAvatar";
import useApi from "@/shared/hooks/useApi";
import { useUser } from "@/shared/stores/authStore";

export default function () {
  const leaderboard = useApi("getLeaderboard");
  const user = useUser();

  return (
    <Card className="w-full min-h-[50vh] bg-card/10 backdrop-blur-sm items-center">
      <CardTitle className="text-xl">Leaderboard</CardTitle>

      <CardContent className="self-stretch flex flex-col divide-border divide-y-[1px] px-5">
        <div className="flex px-3 py-2 text-lg">
          <p className="w-10">Rank</p>
          <p className="pl-7 translate-x-1">User</p>
          <p className="flex-1 text-right">Points</p>
        </div>
        {leaderboard.data?.map((item, key) => (
          <div
            key={key}
            className={cn(
              "flex font-mono text-2xl flex-row items-center gap-x-7 py-3 rounded-lg px-3 motion-preset-blur-down",
              user?.twitter === item.twitter && "bg-yellow-200/20 shadow-lg"
            )}
            style={
              { "--motion-delay": `${key * 200}ms` } as React.CSSProperties
            }
          >
            <div className="w-10">
              {user?.twitter === item.twitter ? <p>YOU</p> : <p>#{key + 1}</p>}
            </div>
            <UserAvatar
              className="rounded-md size-12 border"
              avatarImageUrl={item.avatarImageUrl}
              useName={item.twitter}
            />

            <p
              className={cn(
                "text-left flex-1 truncate uppercase",
                key === 0 && "text-amber-500 font-semibold",
                key === 1 && "font-semibold text-transparent bg-linear-to-b from-white to-white/60 bg-clip-text"
              )}
            >
              @{item.twitter}
              {key == 0 && <span>🏆</span>}
              {key == 1 && <span className="saturate-0">🏆</span>}
            </p>

            <p className="text-right">{item.points}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
