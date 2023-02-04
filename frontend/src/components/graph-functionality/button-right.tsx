import { ButtonRightProps } from "../../types/types";
import Right from "../../assets/right.png";
import "../../styles/main.scss";
const ButtonRight = (props: ButtonRightProps) => {
  return (
    <div className="right">
      <button
        className="right"
        disabled={props.isPaginationRight}
        onClick={props.handelButtonRight}
      >
        <div className="right-img">
          <img src={Right} />
        </div>
      </button>
    </div>
  );
};

export default ButtonRight;
