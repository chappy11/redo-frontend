import axios from "axios";
import { UserInfo } from "../types/User.type";
import { LoginPayload, RegisterPayload } from "../types/UserServiceType.type";

const login = async (payload: LoginPayload) => {
  const headers = {
    "Content-Type": "text/plain",
  };
  const resp = await axios.post("user/login", payload, { headers });

  return resp;
};

const register = async (payload: RegisterPayload) => {
  const headers = {
    "Content-Type": "text/plain",
  };

  const data = await axios.post("user/register", payload, { headers });

  return data;
};

export { login, register };
