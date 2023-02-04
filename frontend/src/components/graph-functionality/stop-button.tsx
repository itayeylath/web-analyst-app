import { ButtonStopProps } from "../../types/graph-component-types";

const ButtonStop = (props: ButtonStopProps) => {
  return (
    <div className="">
  <button disabled={props.isStopSample} onClick={props.handelButtonStop}>
        STOP
      </button>
    </div>
  );
};

export default ButtonStop;