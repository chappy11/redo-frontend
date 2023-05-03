import axios from "axios";

const headers = {
  "Content-Type": "text/plain",
};

export const createSalvageReview = async (payload: any) => {
  const resp = await axios.post("salvageitemreview/create", payload, {
    headers,
  });

  return resp;
};

export const getSalvageItemReview = async (id: string) => {
  const resp = await axios.get("salvageitemreview/getreview/" + id);

  return resp;
};
