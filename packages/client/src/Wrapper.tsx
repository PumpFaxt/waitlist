import { usePrivy } from "@privy-io/react-auth";
import { useSyncUserWithPrivy } from "./shared/stores/authStore";
import Loader from "./shared/components/Loader";

export default function ({ children }: { children: React.ReactNode }) {
  const privy = usePrivy();
  useSyncUserWithPrivy();

  return (
    <>{privy.ready ? <>{children}</> : <Loader className="w-1/4 m-auto" />}</>
  );
}
