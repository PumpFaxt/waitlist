import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/styles/index.css";
import Providers from "./Providers.tsx";
import Router from "./pages/Router.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <main className="dark">
    <Providers>
      <Router />
    </Providers>
    </main>
  </StrictMode>
);
