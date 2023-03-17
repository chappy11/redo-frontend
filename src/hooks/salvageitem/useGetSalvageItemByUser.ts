import { useCallback, useEffect, useState } from "react";
import { getSalvageItemByUser } from "../../service/SalvageItem";
import { UserInfo } from "../../types/User.type";
import { getUserFromStorage } from "../../utils/storage.utils";
import useAlertOptions from "../useAlertOptions";

export default function useGetSalvageItemByUser() {
  const [data, setData] = useState<any[]>([]);
  const { alertError } = useAlertOptions();

  const sendRequest = useCallback(async () => {
    try {
      const user: UserInfo = await getUserFromStorage();
      if (!user) {
        alertError("User not found");
      }

      const resp = await getSalvageItemByUser(user?.user_id);

      if (resp.data.status === "0") {
        return;
      }

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
    sendRequest,
  };
}
