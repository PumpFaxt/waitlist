import { cn } from "@/lib/utils";

interface IProps {
  className?: string;
}

export default function (props: IProps) {
  return (
    <div className={cn("", props.className)}>
      <img src="/images/pepe-rave-loader.webp" alt="Loading" className="w-full h-full object-contain" />
      <p className="text-xl text-center mt-4 uppercase tracking-widest text-foreground/70">Please wait</p>
    </div>
  );
}