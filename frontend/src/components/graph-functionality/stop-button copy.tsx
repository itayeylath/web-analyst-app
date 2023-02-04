import { ButtonStartProps } from "../../types/graph-component-types";


const ButtonStart = (props: ButtonStartProps) => {
  return (
    <div className="">
  <button disabled={props.isStartSample} onClick={props.handelButtonStart}>
        START
      </button>
    </div>
  );
};

export default ButtonStart;