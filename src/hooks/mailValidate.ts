import { useState, useEffect } from "react";
import { stringRegXpEmail } from "../types";

export function useEMailValidate(paramValue: string) {
  const [eMailErrorValue, setEmailErrorValue] = useState<string>(paramValue);
  const [isEmailError, setIsEmailError] = useState<boolean>(true);
  const [isEmailBlur, setIsEmailBlur] = useState<boolean>(false);

  useEffect(() => {
    if (isEmailBlur) {
      if (!stringRegXpEmail.test(paramValue)) {
        setEmailErrorValue("Не верный почтовый адрес...");
        setIsEmailError(true);
      } else {
        setEmailErrorValue("OK");
        setIsEmailError(false);
      }
    }
  }, [paramValue, setIsEmailError, isEmailBlur]);

  return {
    eMailErrorValue,
    isEmailError,
    isEmailBlur,
    setIsEmailBlur,
  };
}

export default useEMailValidate;
