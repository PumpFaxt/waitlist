import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import { SparklesText } from "@/components/magicui/sparkles-text";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import useApi from "@/shared/hooks/useApi";
import useQueryParams from "@/shared/hooks/useQueryParams";
import { useAuthActions } from "@/shared/stores/authStore";
import { useLoginWithOAuth } from "@privy-io/react-auth";
import { useNavigate } from "react-router";

export default function () {
  const query = useQueryParams();
  const ref = query.get("ref");
  const navigate = useNavigate();

  const authActions = useAuthActions();
  const login = useLoginWithOAuth({
    onComplete: (_) => {
      ref && authActions.setReferrer(ref);
      navigate("/dashboard");
    },
  });

  const referrer = useApi("getUserInfoByReferralCode", ref);

  return (
    <section className="flex flex-col items-center min-h-screen py-[5vh] px-[10vw] sm:px-10 md:px-20 lg:px-32">
      <div className="text-2xl sm:text-3xl md:text-4xl flex items-center gap-x-3">
        <img
          src="/logo.png"
          alt="logo"
          className="size-[1.2em] sm:size-[2em]"
        />
        <h1 className="font-semibold tracking-widest">PUMPFAXT</h1>
      </div>

      <figure role="separator" className="flex-1" />

      <div className="flex flex-col items-center">
        <p className="w-full sm:w-[80vw] md:w-[60vw] lg:w-[50vw] text-center mb-[3vh] text-xs sm:text-sm md:text-base opacity-60">
          Pumpfaxt is a memecoin launchpad and AI launchpad with leveraged
          trading <br />
          Explore the greatest and latest memes on the Fraxtal network <br />
          We aim to make memecoins community-focused again
        </p>

        <Card className="flex flex-col items-center w-full sm:w-[80vw] md:w-[70vw] lg:w-[64vw] p-5 bg-card/5 backdrop-blur-lg relative">
          <img
            src="/images/pepe-wow.webp"
            className="absolute bottom-0 right-0 w-1/6 -z-[1] hidden sm:block"
          />
          <CardTitle className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-wider leading-relaxed text-center">
            JOIN OUR WAITLIST TO START
            <SparklesText
              text="EARNING POINTS"
              sparklesCount={20}
              colors={{ first: "#e41064", second: "#79c056" }}
            />
          </CardTitle>
          <CardDescription className="text-xs sm:text-sm text-center">
            You can earn points by participating in the pre-launch campaigns and
            referral program.
          </CardDescription>

          <CardContent className="relative z-10 flex flex-col items-center">
            <Button
              className="cursor-pointer"
              asChild
              onClick={() => login.initOAuth({ provider: "twitter" })}
            >
              <AnimatedGradientText className="group overflow-hidden">
                <span className="inline font-semibold animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent">
                  JOIN THE WAITLIST
                </span>
                <div className="relative size-[1.5em]">
                  <span className="ml-1 duration-150 ease-in-out absolute translate-y-10 -translate-x-8 group-hover:translate-x-0 group-hover:translate-y-0">
                    🚀
                  </span>
                  <span className="ml-1 duration-150 ease-in-out absolute group-hover:-translate-y-10 group-hover:translate-x-8">
                    🚀
                  </span>
                </div>
              </AnimatedGradientText>
            </Button>
            {referrer.data?.name && (
              <p className="text-center mt-2 font-mono">{`> Referred by @${referrer.data?.name}`}</p>
            )}
          </CardContent>
        </Card>
      </div>

      <figure role="separator" className="flex-1" />

      <div className="flex flex-col sm:flex-row justify-between self-stretch w-full">
        <div className="flex flex-col gap-y-2 items-center sm:items-start">
          <h4 className="text-xs sm:text-sm">Built with the best</h4>
          <div className="flex gap-x-3 h-[4vh]">
            <img
              src="/images/frax-finance.webp"
              alt="Frax finance"
              className="h-full"
            />
            <div className="w-1 scale-75 bg-foreground" />
            <img
              src="/images/superchain.webp"
              alt="Superchain Ecosystem"
              className="h-full"
            />
          </div>
        </div>

        <div className="flex flex-col gap-y-2 items-center sm:items-end mt-4 sm:mt-0">
          <h4 className="text-xs sm:text-sm">Socials</h4>
          <div className="flex gap-x-3 h-[4vh] py-1">
            <img
              src="https://logos-world.net/wp-content/uploads/2023/08/X-Logo.png"
              alt="X logo"
              className="invert h-full"
            />
            <img
              src="/images/tg-logo.webp"
              alt="Telegram logo"
              className="h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
