import axios from "axios";
import { LoginPayload } from "../types/UserServiceType.type";

export const login = async (payload: LoginPayload) => {
  const headers = {
    "Content-Type": "text/plain",
  };
  const resp = await axios.post("/user/login", payload, { headers });

  return resp;
};
