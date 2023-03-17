import { useCallback, useEffect, useState } from "react";
import { getAllSalvageItem } from "../../service/SalvageItem";

export default function useGetAllSalvageItems() {
  const [data, setData] = useState<any[]>([]);

  const sendRequest = useCallback(async () => {
    try {
      const resp = await getAllSalvageItem();

      if (resp.data.status === 0) {
        return;
      }

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
