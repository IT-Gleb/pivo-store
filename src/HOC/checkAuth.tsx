import { usePivoSelector } from "../hooks/storeHooks";
import { Navigate } from "react-router-dom";
import { type Props } from "../types";
import { checkerAuth } from "../libs";

const CheckAuth = ({ children }: Props) => {
  const isValidate = usePivoSelector((state) => state.currentUser);
  const userValid: boolean = checkerAuth(isValidate);

  if (!userValid) return <Navigate to="/login" replace={true} />;
  return <>{children}</>;
};

export default CheckAuth;
