import { ButtonLeftProps } from "../../types/types";
import Left from "../../assets/left.png";
const ButtonLeft = (props: ButtonLeftProps) => {
  return (
    <div className="left">
      <button
        className="left"
        disabled={props.isPaginationLeft}
        onClick={props.handelButtonLeft}
      >
        <div className="left-img">
          <img src={Left} />
        </div>
      </button>
    </div>
  );
};

export default ButtonLeft;
