import axios from "axios";

const baseUrl = "/api/blogs";
let token = null;
const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};
const create = async (data) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const res = await axios.post(baseUrl, data, config);
  return res.data;
};

const update = async (id, blogObj) => {
  const res = await axios.put(`${baseUrl}/${id}`, blogObj);
  return res.data;
};

const del = async (id) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  await axios.delete(`${baseUrl}/${id}`, config);
};

export default { getAll, create, setToken, update, del };
