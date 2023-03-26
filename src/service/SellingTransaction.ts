import axios from "axios";

export async function sellingTransactions(user_id: string) {
  const resp = await axios.get("sellingtransactions/transactions/" + user_id);

  return resp;
}

export async function transaction(id: string) {
  const resp = await axios.get("sellingtransactions/transaction/" + id);

  return resp;
}
