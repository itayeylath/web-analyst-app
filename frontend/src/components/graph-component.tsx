import axios from "axios";
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

ChartJS.register(
  Title,
  Tooltip,
  LineElement,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement
);

const FirstdataChart = {
  labels: [],
  datasets: [
    {
      lable: "",
      data: [],
      backgroundColor: "",
    },
  ],
};

const Graph = () => {
  //labels
  const [labelsArr, setLabelsArr] = useState<any>([]);
  // facebookDataArr=>grafdata
  const [facebookDataArr, setFacebookDataArr] = useState<any>([]);
  // ischanges=>setgrafLoad
  const [isChanged, setIsChanged] = useState<any>(false);
  //graf object
  const [facebook, setFacebook] = useState<any>(FirstdataChart);

  const [intervalId, setIntervalId] = useState<any>();
  // is start/pause/stop sample
  const [isStartSample, setIsStartSample] = useState<any>(false);
  const [isPauseClick, setIsPauseClick] = useState<any>(false);
  const [isStopClick, setIsStopClick] = useState<any>(false);

  // Axios requests
  const axiosPostSamples = async (data: any) => {
    await axios.post("http://127.0.0.1:8000/api/facebook/new/save", data);
  };
  const axiosGetsample = async (webName: any) => {
    const result = await axios.get(
      "http://127.0.0.1:8000/api/facebook/new/sample/" + webName
    );
    return result.data;
  };
  //todo: webname inside url ""+webname+""
  const axiosGetAllsamples = async (webName: any) => {
    const result = await axios.get(
      "http://127.0.0.1:8000/api/" + webName + "/new/samples"
    );
    return result.data;
  };
  const getSortArr = (arr: any) => {
    const sortValue = 35;
    if (arr.length > sortValue) {
      const value = arr.length - sortValue;
      const sortArr = arr.slice(value);
      return sortArr;
    }
    return arr;
  };
  // Get all semples from DB at ONLY the first time (or at lodeing the page).
  useEffect(() => {
    axiosGetAllsamples("facebook").then((result) => {
      setLabelsArr((oldArr: any) => [...result]);
      setFacebookDataArr((oldArr: any) => [...result]);
      const data = getSortArr(result);
      setFacebook({
        labels: data || [],
        datasets: [
          {
            lable: "First Dataset",
            data: data,
            backgroundColor: "red",
          },
        ],
      });
    });
  }, []);
  // render if click start and get sample from state.
  useEffect(() => {
    //todo: needed?
    //if (isStartSample) {}
    const dataLabels = getSortArr(labelsArr);
    const data = getSortArr(facebookDataArr);
    setFacebook({
      labels: [...dataLabels],
      datasets: [
        {
          lable: "First Dataset",
          data: [...data],
          backgroundColor: "red",
        },
      ],
    });
  }, [isChanged]);

  // interval func
  let milliseconds = 1000;
  let webName = "facebook";

  // Handle requests
  const handelButtonStart = () => {
    if (intervalId) clearInterval(intervalId);
    setIsStartSample(true);

    let sampleInterval = setInterval(() => {
      axiosGetsample(webName).then((result) => {
        setLabelsArr((oldArr: any) => [...oldArr, result]);
        setFacebookDataArr((oldArr: any) => [...oldArr, result]);
        //TODO: delete console.log
        setIsChanged((prev: any) => !prev);
      });
    }, milliseconds);

    setIntervalId(sampleInterval);
    setIsPauseClick(false);
    setIsStopClick(false);

    console.log("Start");
  };

  const handelButtonPause = () => {
    clearInterval(intervalId);
    setIsStartSample(false);
    setIsPauseClick(true);

    setIsChanged((prev: any) => !prev);
    //TODO: delete console.log
    console.log("Pause");
  };

  const handelButtonStop = () => {
    setIsStartSample(false);
    setIsStopClick(true);
    clearInterval(intervalId);
    //todo: is the last saple here?

    setIsChanged((prev: any) => !prev);
    //TODO: delete console.log
    console.log("Stop");
    axiosPostSamples({ arr: facebookDataArr }).then((result) => {
      //todo: load ui until it ok
    });
  };

  return (
    <div>
      <div style={{ width: "500px", height: "200px" }}>
        <Line data={facebook}>Fiest test</Line>
      </div>
      <button onClick={handelButtonStart}>START</button>
      <button onClick={handelButtonPause}>PAUSE</button>
      <button onClick={handelButtonStop}>STOP</button>
    </div>
  );
};

export default Graph;
