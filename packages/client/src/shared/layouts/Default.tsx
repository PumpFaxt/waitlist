import { Outlet } from "react-router";

export default function () {
  return (
    <div>
      <img src="/images/background.webp" className="absolute-cover" />
      <Outlet />
    </div>
  );
}
