import { ButtonStartProps } from "../../types/types";
import Start from "../../assets/play.png";
import "../../styles/main.scss";
const ButtonStart = (props: ButtonStartProps) => {
  return (
    <div className="start">
      <button className="start" disabled={props.isStartSample} onClick={props.handelButtonStart}>
      <div className="start-img">
          <img src={Start} />
        </div>
      </button>
    </div>
  );
};

export default ButtonStart;
