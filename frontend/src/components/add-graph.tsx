import { useEffect, useState } from "react";
import { axiosGetAddwebsample, axiosGetAllAddwebsamples, axiosPostAddwebSamples } from "../services/axios/addweb-axios";
import Graph from "./graph-component";
import Add from "../assets/add.png"
import "../styles/add-web.scss"

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
    
    <div className="add-web-div">
      <div>
        <button className="add-logo-btn" onClick={handelAddButton}><img className="add-logo" src={Add}/></button>
        
        <input className="add-url" type="text" onChange={handelAddUrlChange} placeholder={addUrl} />
        <input className="add-rate" type="text" onChange={handelAddRateChange} placeholder={addRate} />
        {isAddButton && (
          <Graph decimalRound={2} sampleRate={1000} webName={addUrl} sortValue={35} axiosGetAllsamples={axiosGetAllAddwebsamples} axiosGetsample={axiosGetAddwebsample} axiosPostSamples={axiosPostAddwebSamples}/>
        )}
      </div>
    </div>
  );
};
export default AddGraph;
