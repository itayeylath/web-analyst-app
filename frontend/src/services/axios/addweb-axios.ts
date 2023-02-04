import axios from "axios";

// Addweb requests
export const axiosPostAddwebSamples = async (data: any) => {
  await axios.post("http://127.0.0.1:8000/api/addweb/save/", data);
};
export const axiosGetAddwebsample = async (webName: any) => {
  const result = await axios.get(
    "http://127.0.0.1:8000/api/" + webName + "/sample/" 
  );
  return result.data;
};
export const axiosGetAllAddwebsamples = async (webName: any) => {
  const result = await axios.get(
    "http://127.0.0.1:8000/api/" + webName + "/samples/"
  );
  return result.data;
};



