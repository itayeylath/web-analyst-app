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
import {
  getRoundArr,
  getSortArr,
  getSortArrLeft,
  getSortArrRight,
} from "../utilities/sort-arr";
import {
  CharJSProps,
  GraphData,
  GraphLabels,
  graphObj,
  GraphProps,
} from "../types/graph-component-types";
import { AnyARecord } from "dns";

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

const ChartJs = (props: CharJSProps) => {
   // Loding component when lodeing the page.
   const [loading, setLoading] = useState<boolean>(false);
   useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);
  return (
    <div style={{ width: "500px", height: "200px" }}>
      {props.loading || loading? (
        <ClipLoader
          color={"#36d7b7"}
          loading={props.loading}
          size={150}
          cssOverride={{}}
        />
      ) : (
        <Line data={props.graphObj}>Fiest test</Line>
      )}
    </div>
  );
};

export default ChartJs;
