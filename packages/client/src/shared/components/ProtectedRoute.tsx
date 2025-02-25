import { usePrivy } from "@privy-io/react-auth";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import Loader from "./Loader";

interface IProps {
  type: "authedOnly" | "unauthedOnly";
}

export default function (props: IProps) {
  const privy = usePrivy();
  const navigate = useNavigate();

  const allowed =
    privy.ready &&
    ((props.type === "authedOnly" && privy.authenticated) ||
      (props.type === "unauthedOnly" && !privy.authenticated));

  useEffect(() => {
    if (privy.ready && !allowed) {
      if (props.type === "unauthedOnly") {
        navigate("/dashboard");
      }
      if (props.type === "authedOnly") {
        navigate("/");
      }
    }
  }, [privy.authenticated]);

  return (
    <>
      {!privy.ready && <Loader className="w-1/4 m-auto" />}
      {privy.ready && allowed && <Outlet />}
    </>
  );
}
