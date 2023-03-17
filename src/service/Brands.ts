import axios from "axios";

export const getBrands = async () => {
  const resp = await axios.get("brand/brands");

  return resp;
};
