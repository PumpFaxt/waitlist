import { Route, Routes } from "react-router";
import Home from "./Home";
import Layout from "../shared/layouts";
import ProtectedRoute from "@/shared/components/ProtectedRoute";
import Dashboard from "./Dashboard";
import { usePrivy } from "@privy-io/react-auth";
import { useEffect } from "react";
import { apiClient, setPrivyAccessToken } from "@/shared/utils/api";

export default function () {
  const privy = usePrivy();

  useEffect(() => {
    privy.getAccessToken().then((value) => {
      setPrivyAccessToken(value);
      if (value) {
        alert("ok")
        apiClient.call("user", { method: "POST" });
      }
    });
  }, [privy.authenticated]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout.Default />}>
          <Route element={<ProtectedRoute type="unauthedOnly" />}>
            <Route index element={<Home />} />
          </Route>

          <Route element={<ProtectedRoute type="authedOnly" />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}
