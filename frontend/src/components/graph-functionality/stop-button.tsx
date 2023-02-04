import { ButtonStopProps } from "../../types/types";
import Stop from "../../assets/stop.png";
import "../../styles/main.scss";
const ButtonStop = (props: ButtonStopProps) => {
  return (
    <div  className="stop">
      <button className="stop" disabled={props.isStopSample} onClick={props.handelButtonStop}>
      <div  className="stop-img">
          <img src={Stop} />
        </div>
      </button>
    </div>
  );
};

export default ButtonStop;
