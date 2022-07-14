import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const callApi = (path, token) => {
  return axios.create({
    baseURL: `${process.env.URL_API}/${path}`,
    headers: {
      "content-type": "application/json",
      "x-access-token": `${token}`,
    },
  });
};

export default callApi;
