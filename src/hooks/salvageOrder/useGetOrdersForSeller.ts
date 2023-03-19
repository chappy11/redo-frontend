import { useCallback, useEffect, useState } from "react";
import { getAllOrdersForSeller } from "../../service/SalvageOrder";
import { getUserFromStorage } from "../../utils/storage.utils";

export default function useGetOrdersForSellers() {
  const [data, setData] = useState<any[]>([]);

  const sendRequest = useCallback(async () => {
    try {
      const user = await getUserFromStorage();
      const resp = await getAllOrdersForSeller(user?.user_id);

      setData(resp.data.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    sendRequest();
  }, []);

  console.log("GG", data);
  return {
    data,
    sendRequest,
  };
}
