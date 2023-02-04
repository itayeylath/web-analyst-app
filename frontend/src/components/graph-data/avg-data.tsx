import { AvgProps } from "../../types/graph-component-types";

const AvgData = (props: AvgProps) => {
    return (
      <div className="">
        avg: {props.avgData} 
      </div>
    );
  };
  
  export default AvgData;