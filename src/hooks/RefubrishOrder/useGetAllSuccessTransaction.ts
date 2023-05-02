import { useCallback, useEffect, useState } from "react";
import { getSuccessOrder } from "../../service/RefubrishOrder";
import { getUserFromStorage } from "../../utils/storage.utils";

export default function useGetAllSuccessTransaction() {
  const [data, setData] = useState<any[]>([]);

  const sendRequest = useCallback(async () => {
    try {
      const user = await getUserFromStorage();
      const resp = await getSuccessOrder(user.user_id);

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
