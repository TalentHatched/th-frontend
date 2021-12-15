import axios from "axios";

const axiosWithAuth = () => {
  const token = localStorage.getItem("token");
  return axios.create({
    //baseURL: "https://testing-th.herokuapp.com/",
    //baseURL:"https://dev-th.herokuapp.com/",
    baseURL: "https://testing-th.herokuapp.com/",
    headers: {
      Authorization: token,
    },
  });
};

export default axiosWithAuth;
