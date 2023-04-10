import axios from "axios";

const headers = {
  "Content-Type": "text/plain",
};

export const salvageAddToCart = async (payload: any) => {
  const resp = await axios.post("salvage_cart/insert", payload, { headers });

  return resp;
};

export const getSalvageCart = async (user_id: string) => {
  const resp = await axios.get("salvage_cart/carts/" + user_id);

  return resp;
};

export const salvageUpdateStatus = async (payload: any) => {
  const resp = await axios.post("salvage_cart/updatestatus", payload, {
    headers,
  });

  return resp;
};

export const updateQuantity = async (payload: any) => {
  const resp = await axios.post("salvage_cart/updatequantity", payload, {
    headers,
  });

  return resp;
};

export const getSalvageActiveCart = async (
  sellerId: string,
  buyerId: string
) => {
  const resp = await axios.get(`salvage_cart/getactive/${sellerId}/${buyerId}`);

  return resp;
};
