import { useEffect, useState } from "react";
import {
  axiosPostFacebookSamples,
  axiosGetFacebooksample,
  axiosGetAllFacebooksamples,
} from "../services/axios/facebook-axios";
import Graph from "./graph-component";

const AddGraph = () => {
  const [addUrl, setAddUrl] = useState<string>("");
  const [addRate, setAddRate] = useState<string>("");
  const [isAddButton, setIsAddButton] = useState<boolean>(false);
 
  useEffect(() => {
    setAddUrl("url")
    setAddRate("rate")
  }, []);

    
  // add button.
  const handelAddButton = () => {
    setIsAddButton((prev: any) => !prev);
  };
  const handelAddUrlChange = (event: any) => {
    let value = event.target.value;
    console.log("url", event.target.value);
    setAddUrl(event.target.value);
  };
  const handelAddRateChange = (event: any) => {
    let value = event.target.value;

    console.log("rate", event.target.value);

    setAddRate(event.target.value);
  };
  return (
    <div className="">
      <div>
        <button onClick={handelAddButton}>add</button>
        <input type="text" onChange={handelAddUrlChange} placeholder={addUrl} />
        <input type="text" onChange={handelAddRateChange} placeholder={addRate} />
        {isAddButton && (
          <Graph decimalRound={2} sampleRate={1000} webName={"facebook"} sortValue={35} axiosGetAllsamples={axiosGetAllFacebooksamples} axiosGetsample={axiosGetFacebooksample} axiosPostSamples={axiosPostFacebookSamples}/>
        )}
      </div>
    </div>
  );
};
export default AddGraph;
