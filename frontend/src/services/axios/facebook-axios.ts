import axios from "axios";

// Axios requests
export const axiosPostFacebookSamples = async (data: any) => {
  await axios.post("http://127.0.0.1:8000/api/facebook/new/save", data);
};
export const axiosGetFacebooksample = async (webName: any) => {
  const result = await axios.get(
    "http://127.0.0.1:8000/api/facebook/new/sample/" + webName
  );
  return result.data;
};
//todo: webname inside url ""+webname+""
export const axiosGetAllFacebooksamples = async (webName: any) => {
  const result = await axios.get(
    "http://127.0.0.1:8000/api/" + webName + "/new/samples"
  );
  return result.data;
};
