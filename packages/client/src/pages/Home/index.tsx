import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import { SparklesText } from "@/components/magicui/sparkles-text";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

export default function () {
  return (
    <>
      <section className="flex flex-col items-center h-screen py-[5vh] px-[10vw]">
        <div className="text-4xl flex items-center gap-x-4">
          <img src="/logo.png" alt="logo" className="size-[1.2em]" />
          <h1 className="font-semibold tracking-widest">PUMPFAXT</h1>
        </div>

        <figure role="separator" className="flex-1" />

        <div className="flex flex-col items-center">
          <p className="w-[50vw] text-center mb-[3vh] text-sm opacity-60">
            Pumpfaxt is a memecoin launchpad and AI launchpad with leveraged trading <br />
            Explore the greatest and latest memes on the Fraxtal network <br />
            Support will soon be extended to the superchain ecosystem
          </p>

          <Card className="flex flex-col items-center w-[64vw] p-5 bg-card/5 backdrop-blur-lg relative">
            <img
              src="/images/pepe-wow.webp"
              className="absolute bottom-0 right-0 w-1/6 -z-[1]"
            />
            <CardTitle className="text-5xl font-bold tracking-wider leading-relaxed text-center">
              JOIN OUR WAITLIST TO START
              <SparklesText
                text="EARNING POINTS"
                sparklesCount={20}
                colors={{ first: "#e41064", second: "#79c056" }}
              />
            </CardTitle>
            <CardDescription className="text-sm">
              You can earn points by participating in the pre launch campaigns
              and referral program.
            </CardDescription>

            <CardContent className="relative z-10">
              <Button className="cursor-pointer" asChild>
                <AnimatedGradientText className="group overflow-hidden">
                  <span className="inline font-semibold animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent">
                    JOIN THE WAILIST
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
            </CardContent>
          </Card>
        </div>

        <figure role="separator" className="flex-1" />

        <div className="flex justify-between self-stretch">
          <div className="flex flex-col gap-y-2">
            <h4 className="text-sm">Built with the best</h4>

            <div className="flex gap-x-3 h-[4vh]">
              <img src="/images/frax-finance.webp" alt="Frax finance" />
              <div className="w-1 scale-75 bg-foreground" />
              <img src="/images/superchain.webp" alt="Superchain Ecosystem" />
            </div>
          </div>

          <div className="flex flex-col gap-y-2 items-end">
            <h4 className="text-sm">Socials</h4>

            <div className="flex gap-x-3 h-[4vh] py-1">
              <img
                src="https://logos-world.net/wp-content/uploads/2023/08/X-Logo.png"
                alt="X logo"
                className="invert"
              />
              <img src="/images/tg-logo.webp" alt="Telegram logo" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
