import { ButtonPauseProps } from "../../types/types";
import Pause from "../../assets/pause.png";
import "../../styles/main.scss";
const ButtonPause = (props: ButtonPauseProps) => {
  return (
    <div className="pause">
      <button className="pause" disabled={props.isPauseSample} onClick={props.handelButtonPause}>
        
        <div className="pause-img">
        <img src={Pause} />
          </div>

      </button>
    </div>
  );
};

export default ButtonPause;
