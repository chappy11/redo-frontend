import { useCallback, useEffect, useState } from "react";
import { getRepairerTransactions } from "../../service/SalvageOrder";
import { getUserFromStorage } from "../../utils/storage.utils";
import useAlertOptions from "../useAlertOptions";

export default function useGetSalvageOrderByBuyerId() {
  const [data, setData] = useState<any[]>([]);
  const { alertError } = useAlertOptions();

  const sendRequest = useCallback(async () => {
    try {
      const user = await getUserFromStorage();
      const resp = await getRepairerTransactions(user?.user_id);

      setData(resp.data.data);
    } catch (error) {
      alertError();
    }
  }, []);

  useEffect(() => {
    sendRequest();
  }, []);

  return {
    data,
  };
}
