import { ButtonRightProps } from "../../types/types";

const ButtonRight = (props: ButtonRightProps) => {
  return (
    <div className="">
      <button
        disabled={props.isPaginationRight}
        onClick={props.handelButtonRight}
      >
        RIGHT
      </button>
    </div>
  );
};

export default ButtonRight;
