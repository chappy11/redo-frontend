import { useCallback, useEffect, useState } from "react";
import { refubrishGetMyOrders } from "../../service/RefubrishOrder";
import useGetFromStorage from "../useGetFromStorage";

export default function useGetRefubrishTransactions() {
  const [data, setData] = useState<any[]>([]);
  const { data: account } = useGetFromStorage();
  const sendRequest = useCallback(async () => {
    try {
      if (!account) {
        return;
      }
      const resp = await refubrishGetMyOrders(account?.user_id);

      setData(resp.data.data);
    } catch (error) {
      console.log(error);
    }
  }, [account]);

  useEffect(() => {
    sendRequest();
  }, [account]);

  return { data };
}
