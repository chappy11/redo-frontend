import axios from "axios";

const headers = {
  "Content-Type": "text/plain",
};

export const createFix = async (payload: any) => {
  const resp = axios.post("refubrish_fix/insert", payload, { headers });

  return resp;
};

export const getfix = async (id: string) => {
  const resp = axios.get("refubrish_fix/fix/" + id);

  return resp;
};

export const removeFix = async (id: string) => {
  const resp = axios.post("refubrish_fix/remove/" + id);

  return resp;
};
