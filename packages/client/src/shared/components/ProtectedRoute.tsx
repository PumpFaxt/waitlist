import { usePrivy } from "@privy-io/react-auth";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";

interface IProps {
  type: "authedOnly" | "unauthedOnly";
}

export default function (props: IProps) {
  const privy = usePrivy();
  const navigate = useNavigate();

  const allowed =
    (props.type === "authedOnly" && privy.authenticated) ||
    (props.type === "unauthedOnly" && !privy.authenticated);

  useEffect(() => {
    if (!allowed) {
      if (props.type === "unauthedOnly") {
        navigate("/dashboard");
      }
      if (props.type === "authedOnly") {
        navigate("/");
      }
    }
  }, [privy.authenticated]);

  return <>{allowed && <Outlet />}</>;
}
