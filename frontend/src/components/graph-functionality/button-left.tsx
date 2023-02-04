import { ButtonLeftProps } from "../../types/graph-component-types";

const ButtonLeft = (props: ButtonLeftProps) => {
  return (
    <div className="">
      <button
        disabled={props.isPaginationLeft}
        onClick={props.handelButtonLeft}
      >
        LEFT
      </button>
    </div>
  );
};

export default ButtonLeft;
