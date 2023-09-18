import { useEffect, useState } from "react";

function useNameValidate(paramValidate: { Name: string; MaxLength: number }) {
  const [isNameBlur, setIsNameBlur] = useState<boolean>(false);
  const [isNameError, setNameError] = useState<boolean>(false);

  useEffect(() => {
    if (isNameBlur) {
      if (paramValidate["Name"].trim().length < paramValidate["MaxLength"])
        setNameError(true);
      else setNameError(false);
    }
  }, [isNameBlur, paramValidate]);

  return {
    isNameBlur,
    setIsNameBlur,
    isNameError,
  };
}

export default useNameValidate;
