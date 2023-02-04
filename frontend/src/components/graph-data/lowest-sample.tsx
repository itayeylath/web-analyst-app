import { AvgProps, LowestSampleProps } from "../../types/graph-component-types";

const LowestSample = (props: LowestSampleProps) => {
    return (
      <div className="">
        avg: {props.LowestSample} 
      </div>
    );
  };
  
  export default LowestSample;