import axios from "axios";

const baseUrl = `/api/login`;

const login = async (userInfo) => {
  const res = await axios.post(baseUrl, userInfo);
  return res.data;
};

export default { login };
