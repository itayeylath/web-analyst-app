import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  LineElement,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import {
  axiosGetAllsamples,
  axiosGetsample,
  axiosPostSamples,
} from "../services/axios/facebook-axios";
import { getRoundArr, getSortArr } from "../utilities/sort-arr";
import {
  GraphData,
  GraphLabels,
  graphObj,
  GraphProps,
} from "../types/graph-component-types";

ChartJS.register(
  Title,
  Tooltip,
  LineElement,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement
);

const defultGraphData: graphObj = {
  labels: [],
  datasets: [
    {
      label: "",
      data: [],
      backgroundColor: "",
    },
  ],
};
// todo: type for props
const Graph = (props: GraphProps) => {
  const [graphLabels, setGraphLabels] = useState<GraphLabels[] | []>([]);
  const [graphData, setGraphData] = useState<GraphData[] | []>([]);
  const [isGraphLoad, setIsGraphLoad] = useState<boolean>(false);
  const [graphObj, setGraphObj] = useState<graphObj>(defultGraphData);
  const [intervalId, setIntervalId] = useState<NodeJS.Timer>();
  const [isStartSample, setIsStartSample] = useState<boolean>(false);
  const [isPauseSample, setIsPauseSample] = useState<boolean>(false);
  const [isStopSample, setIsStopSample] = useState<boolean>(false);

  // Get all semples from DB ONLY at the first time of lodeing the page.
  useEffect(() => {
    axiosGetAllsamples("facebook").then((result) => {
      setGraphLabels([...result]);
      setGraphData([...result]);
      const data = getSortArr(result);
      const labels = getRoundArr(data, props.decimalRound);
      setGraphObj({
        labels: labels || [],
        datasets: [
          {
            label: "First Dataset",
            data: data,
            backgroundColor: "red",
          },
        ],
      });
    });
  }, []);
  // Get all semples from State at click on start button.
  useEffect(() => {
    const data = getSortArr(graphData);
    const labels = getRoundArr(data, props.decimalRound);
    setGraphObj({
      labels: [...labels],
      datasets: [
        {
          label: "First Dataset",
          data: [...data],
          backgroundColor: "red",
        },
      ],
    });
  }, [isGraphLoad]);

  // Handle requests to start/pause/stop.
  const handelButtonStart = () => {
    if (intervalId) clearInterval(intervalId);
    setIsStartSample(true);

    let sampleInterval = setInterval(() => {
      axiosGetsample(props.webName).then((result) => {
        setGraphLabels((oldArr: any) => [...oldArr, result]);
        setGraphData((oldArr: any) => [...oldArr, result]);
        setIsGraphLoad((prev: any) => !prev);
      });
    }, props.sampleRate);

    setIntervalId(sampleInterval);
    setIsPauseSample(false);
    setIsStopSample(false);
    console.log("Start");
  };

  const handelButtonPause = () => {
    clearInterval(intervalId);
    setIsStartSample(false);
    setIsPauseSample(true);

    setIsGraphLoad((prev: any) => !prev);
    console.log("Pause");
  };

  const handelButtonStop = () => {
    setIsStartSample(false);
    setIsStopSample(true);
    clearInterval(intervalId);
    setIsGraphLoad((prev: any) => !prev);
    console.log("Stop");
    axiosPostSamples({ arr: graphData }).then((result) => {
      //todo: load ui until it ok
    });
  };

  return (
    <div>
      <div style={{ width: "500px", height: "200px" }}>
        <Line data={graphObj}>Fiest test</Line>
      </div>
      <button onClick={handelButtonStart}>START</button>
      <button onClick={handelButtonPause}>PAUSE</button>
      <button onClick={handelButtonStop}>STOP</button>
    </div>
  );
};

export default Graph;
