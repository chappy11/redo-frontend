import axios from "axios";

const headers = {
  "Content-Type": "multipart/form-data",
};

export async function getRepubrishItem(user_id: string) {
  const resp = await axios.get("repubrishitem/items/" + user_id);

  return resp;
}

export async function createRepubrishItem(formdata: any) {
  const resp = await axios.post("repubrishitem/add", formdata, { headers });

  return resp;
}

export async function getItem(id: string) {
  const resp = await axios.get("repubrishitem/item/" + id);

  return resp;
}

export async function getAll() {
  const resp = await axios.get("repubrishitem/refubrish");

  return resp;
}

export async function updateRefurbrish(payload: any) {
  const resp = await axios.post("repubrishitem/update", payload, { headers });

  return resp;
}

export async function removeRefurbrish(itemId: string) {
  const resp = await axios.get(`repubrishitem/remove/${itemId}`);

  return resp;
}
