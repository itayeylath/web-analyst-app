import axios from "axios";

// Amazon requests
export const axiosPostAmazonSamples = async (data: any) => {
  await axios.post("http://127.0.0.1:8000/api/amazon/save/", data);
};
export const axiosGetAmazonsample = async (webName: any) => {
  const result = await axios.get(
    "http://127.0.0.1:8000/api/" + webName + "/sample/" 
  );
  return result.data;
};
export const axiosGetAllAmazonsamples = async (webName: any) => {
  const result = await axios.get(
    "http://127.0.0.1:8000/api/" + webName + "/samples/"
  );
  return result.data;
};



