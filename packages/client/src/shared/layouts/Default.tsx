import { Outlet } from "react-router";

export default function () {
  return (
    <div>
      <img
        src="/images/background.webp"
        className="absolute-cover object-cover opacity-[0.07] -z-10"
      />
      <Outlet />
    </div>
  );
}
