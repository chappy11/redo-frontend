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

export const getById = async (id: string) => {
  const resp = await axios.get("refubrish_order/transaction/" + id);

  return resp;
};

export const getItems = async (id: string) => {
  const resp = await axios.get("refubrish_order/items/" + id);

  return resp;
};

export const getPayment = async (ref_id: string) => {
  const resp = await axios.get("refubrish_order/payment/" + ref_id);

  return resp;
};

export const updateOrderStatus = async (payload: any) => {
  const resp = await axios.post("refubrish_order/updatestatus", payload, {
    headers,
  });

  return resp;
};

export const getSuccessOrder = async (user_id: string) => {
  const resp = await axios.get("refubrish_order/success/" + user_id);

  return resp;
};

export const getAllSuccessRefurbrish = async () => {
  const resp = await axios.get("refubrish_order/allsuccess");

  return resp;
};
