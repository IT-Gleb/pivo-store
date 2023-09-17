import { usePivoSelector } from "../hooks/storeHooks";
import { Navigate } from "react-router-dom";
import { type Props } from "../types";

const CheckAuth = ({ children }: Props) => {
  const isValidate = usePivoSelector((state) => state.currentUser.isAuth);

  if (!isValidate) return <Navigate to="/login" replace={true} />;
  return <>{children}</>;
};

export default CheckAuth;
