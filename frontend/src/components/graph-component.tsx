import { useEffect, useState } from "react";
import {
  getAvgSample,
  getHighestAndLowestSamples,
  getRoundArr,
  getSortArr,
  getSortArrLeft,
  getSortArrRight,
  isHighestOrLowestSamples,
} from "../utilities/sort-arr";
import { GraphData, GraphLabels, graphObj, GraphProps } from "../types/types";
import ChartJs from "./chart-js-component";
import AvgData from "./graph-data/avg-data";
import Highestsample from "./graph-data/highest-sample";
import LowestSample from "./graph-data/lowest-sample";
import ButtonLeft from "./graph-functionality/button-left";
import ButtonRight from "./graph-functionality/button-right";
import ButtonStop from "./graph-functionality/stop-button";
import ButtonPause from "./graph-functionality/pause-button";
import ButtonStart from "./graph-functionality/stop-button copy";
import ButtonEdit from "./graph-functionality/button-left copy";
import "../styles/main.scss";

// Defult data for Chart-js components otherwise, it's falls.
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
  const [isEditButtun, setIsEditButtun] = useState<boolean>(false);
  const [rateValue, setSrateValue] = useState<string>("");

  // Get all samples from DB ONLY at lodeing the page.
  useEffect(() => {
    const roundRate = props.sampleRate / 1000;
    setSrateValue(roundRate.toString());
    props.axiosGetAllsamples(props.webName).then((result: any) => {
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
            label: "Sample",
            data: data,
            backgroundColor: "#5FFAF1",
            
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

  // Handle requests to start/pause/stop/right/left/edit.
  // Start button.
  const handelButtonStart = () => {
    if (intervalId) {
      clearInterval(intervalId);
    }
    setIsStartSample(true);
    let sampleInterval = setInterval(() => {
      props.axiosGetsample(props.webName).then((result: any) => {
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
    }, Number(rateValue) * 1000);

    setIntervalId(sampleInterval);
    setIsPauseSample(false);
    setIsStopSample(false);
    setIsPaginationLeft(true);
    setIsPaginationRight(true);
    console.log("Start");
  };
  // Pause button.
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
  // Stop button.
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
    props.axiosPostSamples({ arr: newData }).then((result: any) => {
      setLoading(false);
      console.log("saved!");
    });
  };
  // right button.
  const handelButtonRight = () => {
    console.log("RIGHT");
    setIsRight((prev: any) => !prev);
    setIsGraphLoad((prev: any) => !prev);
    if (index + 10 > graphData.length) {
      setIsPaginationRight(false);
    } else {
      setIsPaginationRight(true);
    }
    if (index - 10 < 0) {
      setIsPaginationLeft(false);
    } else {
      setIsPaginationLeft(true);
    }
  };
  // Left button.
  const handelButtonLeft = () => {
    console.log("left");
    setIsLeft((prev: any) => !prev);
    setIsGraphLoad((prev: any) => !prev);
    if (index - 10 < 0) {
      setIsPaginationLeft(false);
    } else {
      setIsPaginationLeft(true);
    }
    if (index + 10 > graphData.length) {
      setIsPaginationRight(false);
    } else {
      setIsPaginationRight(true);
    }
  };
  // Edit button.
  const handelButtonEdit = () => {
    setSrateValue(rateValue.toString());
    setIsEditButtun((prev: any) => !prev);
  };
  const handelRateChange = (event: any) => {
    let value = event.target.value;

    if (typeof value === "number") {
      console.log("change", event.target.value);
    }

    setSrateValue(event.target.value);
  };

  return (
    <div>
      <div className="graph-data">
        <div className="graph-data-text">


        <AvgData avgData={avgData} />
        <Highestsample Highestsample={highestSample} />
        <LowestSample LowestSample={lowestSample} />
      <ButtonEdit
        isEditButtun={isEditButtun}
        handelButtonEdit={handelButtonEdit}
        handelRateChange={handelRateChange}
        rateValue={rateValue}
      />
        </div>
      </div>

      <ChartJs graphObj={graphObj} loading={loading} />
      <ButtonStart
        isStartSample={isStartSample}
        handelButtonStart={handelButtonStart}
      />
      <ButtonPause
        isPauseSample={isPauseSample}
        handelButtonPause={handelButtonPause}
      />
      <ButtonStop
        isStopSample={isStopSample}
        handelButtonStop={handelButtonStop}
      />
      <ButtonLeft
        isPaginationLeft={isPaginationLeft}
        handelButtonLeft={handelButtonLeft}
      />
      <ButtonRight
        isPaginationRight={isPaginationRight}
        handelButtonRight={handelButtonRight}
      />
    </div>
  );
};
export default Graph;
