import axios from "axios";

// Cnet requests
export const axiosPostCnetSamples = async (data: any) => {
  await axios.post("http://127.0.0.1:8000/api/cnet/save/", data);
};
export const axiosGetCnetsample = async (webName: any) => {
  const result = await axios.get(
    "http://127.0.0.1:8000/api/" + webName + "/sample/" 
  );
  return result.data;
};
export const axiosGetAllCnetsamples = async (webName: any) => {
  const result = await axios.get(
    "http://127.0.0.1:8000/api/" + webName + "/samples/"
  );
  return result.data;
};



