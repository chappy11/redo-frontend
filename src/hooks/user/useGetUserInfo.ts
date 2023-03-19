import { useCallback, useEffect, useState } from "react";
import { getUserData } from "../../service/User";
import { UserInfo } from "../../types/User.type";
import useAlertOptions from "../useAlertOptions";

type Props = {
  user_id?: string;
};
export default function useGetUserInfo(props?: Props) {
  const [data, setData] = useState<UserInfo>();
  const { alertError } = useAlertOptions();

  const sendRequest = useCallback(async (user_id: string) => {
    try {
      if (!user_id) {
        return;
      }

      const resp = await getUserData(user_id);

      if (resp.data.status === 1) {
        console.log("RESP", resp);
        setData(resp.data.data);
      }
    } catch (error) {
      alertError();
    }
  }, []);

  return {
    data,
    sendRequest,
  };
}
