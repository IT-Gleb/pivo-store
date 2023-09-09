import { IRightButtonProps } from "../../../types";

const RightButton: React.FC<IRightButtonProps> = ({
  title,
  buttonClass,
  iconClass,
  iClass,
  hasName = true,
  onClick,
}: IRightButtonProps) => {
  const Mr = " mr-1";
  return (
    <button className={buttonClass} title={title} onClick={onClick}>
      <div className={hasName ? iconClass + Mr : iconClass}>
        <i className={iClass}></i>
      </div>

      {hasName ? title : ""}
    </button>
  );
};

export default RightButton;
