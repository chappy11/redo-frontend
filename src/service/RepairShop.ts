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

export { applyShop };
