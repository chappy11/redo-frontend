import axios from "axios";

export async function getRepubrishItem(user_id: string) {
  const resp = await axios.get("repubrishitem/items/" + user_id);

  return resp;
}

export async function getItem(id: string) {
  const resp = await axios.get("repubrishitem/item/" + id);

  return resp;
}
