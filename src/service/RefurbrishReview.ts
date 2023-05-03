import axios from "axios";

const headers = {
  "Content-Type": "text/plain",
};
export const createRefurbrishReview = async (payload: any) => {
  const resp = await axios.post("refurbrishitemreview/create", payload, {
    headers,
  });

  return resp;
};

export const getRefurbrishReview = async (id: string) => {
  const resp = await axios.get("refurbrishitemreview/getreview/" + id);

  return resp;
};
