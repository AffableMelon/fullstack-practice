import axios from "axios";

const baseUrl = "http://localhost:3005/api/login";

const login = async (creds) => {
  const resp = await axios.post(baseUrl, creds);
  return resp.data;
};

export default { login };
