import { ButtonEditProps } from "../../types/types";


const ButtonEdit = (props: ButtonEditProps) => {
  return (
    <div className="">
      <button  onClick={props.handelButtonEdit}>
        edit

      </button>
      {
        props.isEditButtun && (
        <input
        type="text"
        onChange={props.handelRateChange}
        value={props.rateValue}
      />)
      }
    </div>
  );
};

export default ButtonEdit;
