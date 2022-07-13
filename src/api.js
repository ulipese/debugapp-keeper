import axios from "axios";

const callApi = (path, token) => {
  return axios.create({
    baseURL: `https://debugapp-keeper-api.herokuapp.com/${path}`,
    headers: {
      "content-type": "application/json",
      "x-access-token": `${token}`,
    },
  });
};

export default callApi;
