import { useEffect, useState } from "react";

function usePasswordValidate(paramValidate: {
  Value: string;
  MaxLength: number;
}) {
  const [isPassBlur, setIsPassBlur] = useState<boolean>(false);
  const [isPassError, setIsPassError] = useState<boolean>(true);

  useEffect(() => {
    const MaxPass = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-zA-Z]).{8,20}$/g; //(?=.*[A-Z])
    if (isPassBlur) {
      if (!MaxPass.test(paramValidate["Value"].replaceAll(" ", ""))) {
        setIsPassError(true);
      } else {
        setIsPassError(false);
      }
    }
  }, [isPassBlur, paramValidate, setIsPassError]);

  return {
    isPassBlur,
    setIsPassBlur,
    isPassError,
  };
}

export default usePasswordValidate;
