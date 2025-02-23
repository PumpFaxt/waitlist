import { PrivyProvider } from "@privy-io/react-auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router";
import privy from "./shared/config/privy";

const queryClient = new QueryClient();

export default function (props: { children: React.ReactNode }) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <PrivyProvider {...privy}>{props.children}</PrivyProvider>  
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}
