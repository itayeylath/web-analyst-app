import { AvgProps } from "../../types/types";
import "../../styles/main.scss";

const AvgData = (props: AvgProps) => {
  return <div className="letters">AVG {props.avgData}</div>;
};

export default AvgData;
