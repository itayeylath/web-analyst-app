import AddGraph from "../components/add-graph";
import Graph from "../components/graph-component";
import {
  axiosGetAllAmazonsamples,
  axiosGetAmazonsample,
  axiosPostAmazonSamples,
} from "../services/axios/amazon-axios";
import {
  axiosGetAllCnetsamples,
  axiosGetCnetsample,
  axiosPostCnetSamples,
} from "../services/axios/cnet-axios";
import {
  axiosPostFacebookSamples,
  axiosGetFacebooksample,
  axiosGetAllFacebooksamples,
} from "../services/axios/facebook-axios";
import {
  axiosGetAllGooglesamples,
  axiosGetGooglesample,
  axiosPostGoogleSamples,
} from "../services/axios/google-axios";
import {
  axiosGetAllTwittersamples,
  axiosGetTwittersample,
  axiosPostTwitterSamples,
} from "../services/axios/twitter-axios";
import "../styles/landing-page.scss";
import "../styles/main.scss";
import LightSpinLogo from "../assets/lightspinLogo.png";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="light-spin-logo">
        <img src={LightSpinLogo} />
      </div>
      <AddGraph />
      <div className="first-row">
        <div className="google-div">
          <Graph
            decimalRound={2}
            sampleRate={1000}
            webName={"google"}
            sortValue={35}
            axiosGetAllsamples={axiosGetAllGooglesamples}
            axiosGetsample={axiosGetGooglesample}
            axiosPostSamples={axiosPostGoogleSamples}
          />
        </div>

        <div className="cnet-div">
          <Graph
            decimalRound={2}
            sampleRate={1000}
            webName={"cnet"}
            sortValue={35}
            axiosGetAllsamples={axiosGetAllCnetsamples}
            axiosGetsample={axiosGetCnetsample}
            axiosPostSamples={axiosPostCnetSamples}
          />
        </div>
        <div className="facebook-div">
          <Graph
            decimalRound={2}
            sampleRate={1000}
            webName={"facebook"}
            sortValue={35}
            axiosGetAllsamples={axiosGetAllFacebooksamples}
            axiosGetsample={axiosGetFacebooksample}
            axiosPostSamples={axiosPostFacebookSamples}
          />
        </div>
      </div>

      <div className="scond-row">
        
      <div className="amaozon-div">
          <Graph
            decimalRound={2}
            sampleRate={1000}
            webName={"amazon"}
            sortValue={35}
            axiosGetAllsamples={axiosGetAllAmazonsamples}
            axiosGetsample={axiosGetAmazonsample}
            axiosPostSamples={axiosPostAmazonSamples}
          />
        </div>
        
        <div className="twitter-div">
          <Graph
            decimalRound={2}
            sampleRate={1000}
            webName={"twitter"}
            sortValue={35}
            axiosGetAllsamples={axiosGetAllTwittersamples}
            axiosGetsample={axiosGetTwittersample}
            axiosPostSamples={axiosPostTwitterSamples}
          />
        </div>
      </div>
    </div>
  );
};
export default LandingPage;
