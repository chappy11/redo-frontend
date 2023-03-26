import axios from "axios";
import { AdditionalInfoPayload } from "../types/UserServiceType.type";

const headers = {
  "Content-Type": "multipart/form-data",
};

const applyShop = async (shopData: any): Promise<any> => {
  const response = await axios.post("repair_shop/insert", shopData, {
    headers,
  });

  return response;
};

const getShop = async (user_id: string) => {
  const response = await axios.get("repair_shop/shop/" + user_id);

  return response;
};

export { applyShop, getShop };
