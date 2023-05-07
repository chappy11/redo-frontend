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

const getpendingshop = async () => {
  const resp = await axios.get("user/pending");

  return resp;
};

const approved = async (user_id: string) => {
  const resp = await axios.post("user/approved/" + user_id);

  return resp;
};

const emailVerification = async (payload: any) => {
  const headers = {
    "Content-Type": "text/plain",
  };
  const resp = await axios.post("email/sendEmail", payload, { headers });

  return resp;
};

const changePassword = async (payload: any) => {
  const headers = {
    "Content-Type": "text/plain",
  };

  const resp = await axios.post("user/changepass", payload, { headers });

  return resp;
};

const updateUser = async (payload: any) => {
  const headers = {
    "Content-Type": "multipart/form-data",
  };

  const resp = await axios.post("user/updateuser", payload, { headers });

  return resp;
};

const updatestatus = async (payload: any) => {
  const headers = {
    "Content-Type": "text/plain",
  };

  const resp = await axios.post("user/updatestatus", payload, { headers });

  return resp;
};

const getUserByShop = async (user_id:string) => {
  const resp = await axios.get('user/getusershop/'+user_id);

  return resp;
}

export {
  login,
  register,
  getUserData,
  getUsersByStatus,
  allUser,
  getpendingshop,
  approved,
  emailVerification,
  changePassword,
  updateUser,
  updatestatus,
  getUserByShop
};
