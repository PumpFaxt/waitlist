import { Route, Routes } from "react-router";
import Home from "./Home";
import Layout from "../shared/layouts";

export default function () {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout.Default />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </>
  );
}
