import { useCallback, useEffect, useState } from "react";
import { getAll } from "../../service/RepubrishItem";

export default function useGetAllRefubrishItem() {
  const [data, setData] = useState<any[]>([]);

  const sendRequest = useCallback(async () => {
    try {
      const resp = await getAll();

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
