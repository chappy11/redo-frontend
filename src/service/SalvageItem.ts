import axios from "axios";

const headers = {
  "Content-Type": "multipart/form-data",
};
export const createSalvage = async (payload: any) => {
  const resp = await axios.post("salvage_item/insert", payload, { headers });

  return resp;
};

export const getSalvageItemByUser = async (userId: string) => {
  const resp = await axios.get(`salvage_item/salvageitem/${userId}`);

  return resp;
};

export const getSalvageItemById = async (salvageItemId: string) => {
  const resp = await axios.get(`salvage_item/salvageitemid/${salvageItemId}`);

  return resp;
};

export const getAllSalvageItem = async () => {
  const resp = await axios.get("salvage_item/salvageitems");

  return resp;
};

export const updateSalvage = async (payload: any) => {
  const resp = await axios.post("salvage_item/updateItems", payload, {
    headers,
  });

  return resp;
};

export const removeSalvage = async (salvageItem_id: string) => {
  const resp = await axios.get(`salvage_item/remove/${salvageItem_id}`);

  return resp;
};
