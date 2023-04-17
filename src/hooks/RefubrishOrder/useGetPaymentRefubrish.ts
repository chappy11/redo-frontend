import React, { useCallback, useEffect, useState } from "react";
import { getPayment } from "../../service/RefubrishOrder";

export default function useGetPaymentRefubrish() {
  const [data, setData] = useState<any[]>([]);

  const sendRequest = useCallback(async (ref_id: string) => {
    try {
      if (!ref_id) {
        return;
      }

      const resp = await getPayment(ref_id);

      setData(resp.data.data);
    } catch (error) {}
  }, []);

  return { data, sendRequest };
}
