import { ButtonPauseProps } from "../../types/types";

const ButtonPause = (props: ButtonPauseProps) => {
  return (
    <div className="">
      <button disabled={props.isPauseSample} onClick={props.handelButtonPause}>
        PAUSE
      </button>
    </div>
  );
};

export default ButtonPause;