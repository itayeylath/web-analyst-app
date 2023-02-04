import Graph from "../components/graph-component";
import {
  axiosPostFacebookSamples,
  axiosGetFacebooksample,
  axiosGetAllFacebooksamples,
} from "../services/axios/facebook-axios";

const LandingPage = () => {
    return (
      
      <div className="" >
       <Graph decimalRound={2} sampleRate={1000} webName={"facebook"} sortValue={35} axiosGetAllsamples={axiosGetAllFacebooksamples} axiosGetsample={axiosGetFacebooksample} axiosPostSamples={axiosPostFacebookSamples}/>
      </div>
      
    );
  };
  export default LandingPage;