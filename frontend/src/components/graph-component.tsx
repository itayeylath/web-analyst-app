import { useEffect, useState } from "react";
import {
  axiosGetAllsamples,
  axiosGetsample,
  axiosPostSamples,
} from "../services/axios/facebook-axios";
import {
  getAvgSample,
  getHighestAndLowestSamples,
  getRoundArr,
  getSortArr,
  getSortArrLeft,
  getSortArrRight,
  isHighestOrLowestSamples,
} from "../utilities/sort-arr";
import {
  GraphData,
  GraphLabels,
  graphObj,
  GraphProps,
} from "../types/graph-component-types";
import ChartJs from "./chart-js-component";
import AvgData from "./graphData/avg-data";
import Highestsample from "./graphData/highest-sample";
import LowestSample from "./graphData/lowest-sample";

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
  const [index, setIndex] = useState<number>(0);
  const [isLeft, setIsLeft] = useState<boolean>(false);
  const [isRight, setIsRight] = useState<boolean>(false);
  const [isPaginationLeft, setIsPaginationLeft] = useState<boolean>(false);
  const [isPaginationRight, setIsPaginationRight] = useState<boolean>(true);
  const [avgData, setAvgData] = useState<number>(0);
  const [highestSample, setHighestSample] = useState<number>(0);
  const [lowestSample, setLowestSample] = useState<number>(0);
  // Get all samples from DB ONLY at lodeing the page.
  useEffect(() => {
    axiosGetAllsamples("facebook").then((result) => {
      setIndex(result.length);
      setGraphData([...result]);
      const highstAndLowest = getHighestAndLowestSamples(result);
      setLowestSample(highstAndLowest.lowesest);
      setHighestSample(highstAndLowest.highest);
      const avg = getAvgSample(result);
      setAvgData(avg);
      const data = getSortArr(result, props.sortValue);
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

  // Get all samples from State at click on start button.
  useEffect(() => {
    setIndex(graphData.length);
    const avg = getAvgSample(graphData);
    setAvgData(avg);
    const data = getSortArr(graphData, props.sortValue);
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

  // Get all relvant samples from State at click on left button.
  useEffect(() => {
    const sortdata = getSortArrLeft(graphData, props.sortValue, index);
    const value = index - 10;
    setIndex(value);
    const data = getSortArr(sortdata, props.sortValue);
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
  }, [isLeft]);

  // Get all relvant samples from State at click on right button.
  useEffect(() => {
    const sortdata = getSortArrRight(graphData, props.sortValue, index);
    const value = index + 10;
    setIndex(value);
    const data = getSortArr(sortdata, props.sortValue);
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
  }, [isRight]);

  // Handle requests to start/pause/stop/right/left.
  const handelButtonStart = () => {
    if (intervalId) {
      clearInterval(intervalId);
    }
    setIsStartSample(true);
    let sampleInterval = setInterval(() => {
      axiosGetsample(props.webName).then((result) => {
        const highstAndLowest = isHighestOrLowestSamples(
          result,
          highestSample,
          lowestSample
        );
        setLowestSample(highstAndLowest.lowesest);
        setHighestSample(highstAndLowest.highest);
        setGraphData((oldArr: any) => [...oldArr, result]);
        setNewdata((oldArr: any) => [...oldArr, result]);
        setIsGraphLoad((prev: any) => !prev);
      });
    }, props.sampleRate);

    setIntervalId(sampleInterval);
    setIsPauseSample(false);
    setIsStopSample(false);
    setIsPaginationLeft(true);
    setIsPaginationRight(true);
    console.log("Start");
  };
  const handelButtonPause = () => {
    clearInterval(intervalId);

    setIsStartSample(false);
    setIsPauseSample(true);
    setIsStopSample(false);
    setIsPaginationLeft(false);
    setIsPaginationRight(false);

    setIsGraphLoad((prev: any) => !prev);
    console.log("Pause");
  };
  const handelButtonStop = () => {
    setIsStartSample(false);
    setIsPauseSample(true);
    setIsStopSample(true);
    setIsPaginationLeft(false);
    setIsPaginationRight(false);
    clearInterval(intervalId);
    setIsGraphLoad((prev: any) => !prev);
    console.log("Stop");
    setLoading(true);
    axiosPostSamples({ arr: newData }).then((result) => {
      setLoading(false);
      console.log("saved!");
    });
  };
  const handelButtonRight = () => {
    console.log("RIGHT");
    setIsRight((prev: any) => !prev);
    setIsGraphLoad((prev: any) => !prev);
    if (index + 10 < graphData.length) {
      setIsPaginationRight(false);
    } else {
      setIsPaginationRight(true);
    }
    if (index - 10 > 0) {
      setIsPaginationLeft(false);
    } else {
      setIsPaginationLeft(true);
    }
  };
  const handelButtonLeft = () => {
    console.log("left");
    setIsLeft((prev: any) => !prev);
    setIsGraphLoad((prev: any) => !prev);
    if (index - 10 > 0) {
      setIsPaginationLeft(false);
    } else {
      setIsPaginationLeft(true);
    }
    if (index + 10 > 0) {
      setIsPaginationRight(false);
    } else {
      setIsPaginationRight(true);
    }
  };
  return (
    <div>
      <ChartJs graphObj={graphObj} loading={loading} />
      <button disabled={isStartSample} onClick={handelButtonStart}>
        START
      </button>
      <button disabled={isPauseSample} onClick={handelButtonPause}>
        PAUSE
      </button>
      <button disabled={isStopSample} onClick={handelButtonStop}>
        STOP
      </button>
      <button disabled={isPaginationLeft} onClick={handelButtonLeft}>
        LEFT
      </button>
      <button disabled={isPaginationRight} onClick={handelButtonRight}>
        RIGHT
      </button>
      <div>
        <AvgData avgData={avgData}/>
        <Highestsample Highestsample={highestSample}/>
        <LowestSample LowestSample={lowestSample}/>
      </div>
    </div>
  );
};

export default Graph;
