import { useState } from "react";
import Graph from "./graph-component";

const AddGraph = () => {
  const [addUrl, setAddUrl] = useState<string>("");
  const [addRate, setAddRate] = useState<string>("");
  const [isAddButton, setIsAddButton] = useState<boolean>(false);

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
        <input type="text" onChange={handelAddUrlChange} value={addUrl} />
        <input type="text" onChange={handelAddRateChange} value={addRate} />
        {isAddButton && (
          <Graph
            decimalRound={2}
            sampleRate={Number(addRate)}
            webName={addUrl}
            sortValue={35}
          />
        )}
      </div>
    </div>
  );
};
export default AddGraph;
