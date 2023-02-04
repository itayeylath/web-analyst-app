import { ButtonEditProps } from "../../types/types";
import Pencil from "../../assets/pencil.png";
import "../../styles/main.scss";
const ButtonEdit = (props: ButtonEditProps) => {
  return (
    <div className="edit-logo-btn">
      <button className="edit-logo-btn" onClick={props.handelButtonEdit}>
      <div className="pencil">
        <img src={Pencil} />
      </div>
      </button>
      {
        props.isEditButtun && (
        <input
        className="add-rate-edit"
        type="text"
        onChange={props.handelRateChange}
        value={props.rateValue}
      />)
      }
    </div>
  );
};

export default ButtonEdit;
