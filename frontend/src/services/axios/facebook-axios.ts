import axios from "axios";

// Facebook
export const axiosPostFacebookSamples = async (data: any) => {
  await axios.post("http://127.0.0.1:8000/api/facebook/save/", data);
};
export const axiosGetFacebooksample = async (webName: any) => {
  const result = await axios.get(
    "http://127.0.0.1:8000/api/" + webName + "/sample/" 
  );
  return result.data;
};
export const axiosGetAllFacebooksamples = async (webName: any) => {
  const result = await axios.get(
    "http://127.0.0.1:8000/api/" + webName + "/samples/"
  );
  return result.data;
};




