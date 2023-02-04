import { ButtonStopProps } from "../../types/types";

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
