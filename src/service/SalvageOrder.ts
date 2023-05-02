import axios from "axios";

const headers = {
  "Content-Type": "text/plain",
};

export const checkoutSalvageOrder = async (payload: any) => {
  const resp = await axios.post("salvage_order/insert", payload, { headers });

  return resp;
};

export const getRepairerTransactions = async (user_id: any) => {
  const resp = await axios.get("salvage_order/transactions/" + user_id);

  return resp;
};

export const getTransactionById = async (trans_id: string) => {
  const resp = await axios.get("salvage_order/transaction/" + trans_id);

  return resp;
};

export const getAllOrdersForSeller = async (user_id: string) => {
  const resp = await axios.get("salvage_order/orders/" + user_id);

  return resp;
};

export const getSuccessTransactions = async (user_id: string) => {
  const resp = await axios.get("salvage_order/successtransactions/" + user_id);

  return resp;
};

export const updateStatus = async (payload: any) => {
  const resp = await axios.post("salvage_order/updatestatus", payload, {
    headers: { "Content-Type": "text/plain" },
  });

  return resp;
};

export const getOrderItems = async (id: string) => {
  const resp = await axios.get("salvage_order/item/" + id);

  return resp;
};

export const getpayment = async (ref_id: string) => {
  const resp = await axios.get("salvage_order/payment/" + ref_id);

  return resp;
};
