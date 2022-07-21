import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const callApi = (path, token) => {
  return axios.create({
    baseURL: `${API_URL}/${path}`,
    headers: {
      "content-type": "application/json",
      "x-access-token": `${token}`,
    },
  });
};

export default callApi;
