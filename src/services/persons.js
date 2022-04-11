import axios from "axios";
const baseURL = "http://localhost:3001/persons";

const getAll = () => {
  const request = axios.get(baseURL);
  return request.then((response) => response.data);
};

const create = (nameObject) => {
  const request = axios.post(baseURL, nameObject);
  return request.then((response) => response.data);
};

const deletePerson = (id) => {
  return axios.delete(`${baseURL}/${id}`);
};

const personsServices = { getAll, create, deletePerson };
export default personsServices;
