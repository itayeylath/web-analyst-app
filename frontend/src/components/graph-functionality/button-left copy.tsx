import { ButtonEditProps } from "../../types/types";


const ButtonEdit = (props: ButtonEditProps) => {
  return (
    <div className="">
      <button  onClick={props.handelButtonEdit}>
        edit

      {
        props.isEditButtun && (
        <input
        type="text"
        onChange={props.handelRateChange}
        value={props.rateValue}
      />)
      }
      </button>
    </div>
  );
};

export default ButtonEdit;
