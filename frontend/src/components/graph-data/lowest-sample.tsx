import { AvgProps, LowestSampleProps } from "../../types/types";
import "../../styles/main.scss";
const LowestSample = (props: LowestSampleProps) => {
  return <div className="letters">Lowest {props.LowestSample}</div>;
};

export default LowestSample;
