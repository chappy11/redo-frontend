import axios from "axios";

const headers = {
  "Content-Type": "text/plain",
};

export const createRefubrishOrder = async (payload: any) => {
  const resp = await axios.post("refubrish_order/insert", payload, { headers });

  return resp;
};

export const refubrishGetOrders = async (user_id: string) => {
  const resp = await axios.get("refubrish_order/sales/" + user_id);

  return resp;
};

export const refubrishGetMyOrders = async (user_id: string) => {
  const resp = await axios.get("refubrish_order/transactions/" + user_id);

  return resp;
};

export const refubrishstatus = async (payload: any) => {
  const resp = await axios.post("refubrish_order/updatestatus", payload, {
    headers,
  });

  return resp;
};
