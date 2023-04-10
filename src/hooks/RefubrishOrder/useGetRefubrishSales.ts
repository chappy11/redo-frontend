import React, { useCallback, useEffect, useState } from "react";
import useGetFromStorage from "../useGetFromStorage";
import { refubrishGetOrders } from "../../service/RefubrishOrder";

export default function useGetRefubrishSales() {
  const [data, setData] = useState<any[]>([]);
  const { data: user } = useGetFromStorage();
  const sendRequest = useCallback(async () => {
    try {
      if (!user) {
        return;
      }

      const res = await refubrishGetOrders(user?.user_id);

      setData(res.data.data);
    } catch (error) {}
  }, [user]);

  useEffect(() => {
    sendRequest();
  }, [user]);

  return { data };
}
