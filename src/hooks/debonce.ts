import { useEffect, useState } from "react";

function useDebonced(paramVal: string, paramDelay: number = 800): string {
  const [debonceStr, setDebonce] = useState<string>(paramVal);

  useEffect(() => {
    const timerH = setTimeout(() => setDebonce(paramVal), paramDelay);
    return () => clearTimeout(timerH);
  }, [paramVal, paramDelay]);

  return debonceStr;
}

export default useDebonced;
