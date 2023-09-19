import { Navigate } from "react-router-dom";
import { usePivoSelector } from "../hooks/storeHooks";
import { checkerAuth } from "../libs";
import { Props } from "../types";

function CheckIsLogin({ children }: Props) {
  const user = usePivoSelector((state) => state.currentUser);

  if (checkerAuth(user)) {
    return <Navigate to="/" replace={true} />;
  }

  return <>{children}</>;
}

export default CheckIsLogin;
