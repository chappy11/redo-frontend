import React, { useCallback, useEffect, useState } from "react";
import { getSuccessTransactions } from "../../service/SalvageOrder";
import { getUserFromStorage } from "../../utils/storage.utils";

export default function useGetAllSuccessTransactions() {
  const [data, setData] = useState<any[]>([]);

  const sendRequest = useCallback(async () => {
    try {
      const user = await getUserFromStorage();
      const resp = await getSuccessTransactions(user.user_id);

      setData(resp.data.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    sendRequest();
  }, []);

  return {
    data,
  };
}
