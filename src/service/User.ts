import axios from "axios";

import { LoginPayload, RegisterPayload } from "../types/UserServiceType.type";

const login = async (payload: LoginPayload) => {
  const headers = {
    "Content-Type": "text/plain",
  };
  const resp = await axios.post("user/login", payload, { headers });

  return resp;
};

const register = async (payload: RegisterPayload): Promise<any> => {
  const headers = {
    "Content-Type": "text/plain",
  };

  const data = await axios.post("user/register", payload, { headers });

  return data;
};

const getUserData = async (user_id: string) => {
  const resp = await axios.get("user/userinfo/" + user_id);

  return resp;
};

const getUsersByStatus = async (status: string) => {
  const resp = await axios.get("user/userstatus/" + status);

  return resp;
};

const allUser = async () => {
  const resp = await axios.get("user/users");

  return resp;
};
export { login, register, getUserData, getUsersByStatus, allUser };
