import axios from "axios";

// Google requests
export const axiosPostGoogleSamples = async (data: any) => {
  await axios.post("http://127.0.0.1:8000/api/google/save/", data);
};
export const axiosGetGooglesample = async (webName: any) => {
  const result = await axios.get(
    "http://127.0.0.1:8000/api/" + webName + "/sample/" 
  );
  return result.data;
};
export const axiosGetAllGooglesamples = async (webName: any) => {
  const result = await axios.get(
    "http://127.0.0.1:8000/api/" + webName + "/samples/"
  );
  return result.data;
};



