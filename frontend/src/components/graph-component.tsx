import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import ClipLoader from "react-spinners/ClipLoader";
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
  const [graphData, setGraphData] = useState<GraphData[] | []>([]);
  const [newData, setNewdata] = useState<GraphData[] | []>([]);
  const [isGraphLoad, setIsGraphLoad] = useState<boolean>(false);
  const [graphObj, setGraphObj] = useState<graphObj>(defultGraphData);
  const [intervalId, setIntervalId] = useState<NodeJS.Timer>();
  const [isStartSample, setIsStartSample] = useState<boolean>(false);
  const [isPauseSample, setIsPauseSample] = useState<boolean>(true);
  const [isStopSample, setIsStopSample] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true)
    setTimeout( () => {
        setLoading(false)
    },500)
  }, []);

  // Get all semples from DB ONLY at the first time of lodeing the page.
  useEffect(() => {
    axiosGetAllsamples("facebook").then((result) => {
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
        setGraphData((oldArr: any) => [...oldArr, result]);
        setNewdata((oldArr: any) => [...oldArr, result]);
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
    setIsStopSample(false);

    setIsGraphLoad((prev: any) => !prev);
    console.log("Pause");
  };

  const handelButtonStop = () => {
    setIsStartSample(false);
    setIsPauseSample(true);
    setIsStopSample(true);
    clearInterval(intervalId);
    setIsGraphLoad((prev: any) => !prev);
    console.log("Stop");
    setLoading(true)
    axiosPostSamples({ "arr": newData }).then((result) => {
        setLoading(false)
      console.log("saved!")
    });
  };

  return (
    <div>
      <div style={{ width: "500px", height: "200px" }}>
        {
        loading ?
        
        <ClipLoader
        color={"#36d7b7"}
        loading={loading}
        size={150}
        cssOverride={{}}
      />
      :

        <Line data={graphObj}>Fiest test</Line>
        }
      </div>
      <button disabled={isStartSample} onClick={handelButtonStart}>
        START
      </button>
      <button disabled={isPauseSample} onClick={handelButtonPause}>
        PAUSE
      </button>
      <button disabled={isStopSample} onClick={handelButtonStop}>
        STOP
      </button>
    </div>
  );
};

export default Graph;
