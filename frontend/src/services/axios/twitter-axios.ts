import axios from "axios";

// Twitter requests
export const axiosPostTwitterSamples = async (data: any) => {
  await axios.post("http://127.0.0.1:8000/api/twitter/save/", data);
};
export const axiosGetTwittersample = async (webName: any) => {
  const result = await axios.get(
    "http://127.0.0.1:8000/api/" + webName + "/sample/" 
  );
  return result.data;
};
export const axiosGetAllTwittersamples = async (webName: any) => {
  const result = await axios.get(
    "http://127.0.0.1:8000/api/" + webName + "/samples/"
  );
  return result.data;
};



