import { Route, Routes } from "react-router";
import Home from "./Home";
import Layout from "../shared/layouts";
import ProtectedRoute from "@/shared/components/ProtectedRoute";
import Dashboard from "./Dashboard";

export default function () {
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
