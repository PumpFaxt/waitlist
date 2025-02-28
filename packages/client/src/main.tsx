import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/styles/index.css";
import Providers from "./Providers.tsx";
import Router from "./pages/Router.tsx";
import Wrapper from "./Wrapper.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <main className="dark">
      <Providers>
        <Wrapper>
          <Router />
        </Wrapper>
      </Providers>
    </main>
  </StrictMode>
  );
