import axios from "axios";

const headers = {
  "Content-Type": "text/plain",
};
export const addtocart = async (payload: any) => {
  const resp = await axios.post("refubrish_cart/insert", payload, { headers });

  return resp;
};

export const updatestatus = async (payload: any) => {
  const resp = await axios.post("refubrish_cart/updatestatus", payload, {
    headers,
  });

  return resp;
};

export const updatequantity = async (payload: any) => {
  const resp = await axios.post("refubrish_cart/updatequantity", payload, {
    headers,
  });

  return resp;
};

export const cart = async (user_id: string) => {
  const resp = await axios.get("refubrish_cart/cart/" + user_id);

  return resp;
};

export const activeCart = async (user_id: string, seller_id: string) => {
  const resp = await axios.get(
    `refubrish_cart/getactive/${user_id}/${seller_id}`
  );

  return resp;
};

export const removeRefubrishItem = async (cart_id: string) => {
  const resp = await axios.get(`refubrish_cart/remove/${cart_id}`);

  return resp;
};
