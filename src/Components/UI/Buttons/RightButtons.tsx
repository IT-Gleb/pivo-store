import React from "react";
import { IRightButtonProps } from "../../../types";

const RightButton: React.FC<IRightButtonProps> = ({
  title,
  buttonClass,
  iconClass,
  iClass,
  hasName = true,
  isCount = -1,
  onClick,
}: IRightButtonProps) => {
  const Mr = " mr-1";

  return (
    <div style={{ position: "relative" }}>
      <button className={buttonClass} title={title} onClick={onClick}>
        <span className={hasName ? iconClass + Mr : iconClass}>
          <i className={iClass}></i>
        </span>

        {hasName ? title : ""}
      </button>
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          left: "75%",
          top: "60%",
          transform: "translate(-75%, -50%)",
          WebkitTextStroke: "1px #000",
          overflow: "hidden",
          cursor: "pointer",
        }}
        onClick={onClick}
      >
        {isCount > 0 && (
          <span className="is-size-4 has-text-weight-bold is-clickable has-text-primary">
            {isCount}
          </span>
        )}
      </div>
    </div>
  );
};

export default React.memo(RightButton);
