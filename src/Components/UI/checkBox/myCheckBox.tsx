import React, { useState } from "react";

function MyCheckBox({
  paramVal,
  paramId,
  onchange,
}: {
  paramVal: boolean;
  paramId: number;
  onchange: (param: number, paramVal: boolean) => void;
}) {
  const [checkValue, setCheckValue] = useState<boolean>(paramVal);

  const handleChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    let tmpVal = event.currentTarget.checked;
    setCheckValue(tmpVal);
    onchange(paramId, tmpVal);
  };

  return (
    <input
      className="checkbox"
      type="checkbox"
      name="myCheckBox1"
      checked={checkValue}
      onChange={handleChecked}
    />
  );
}

export default React.memo(MyCheckBox);
