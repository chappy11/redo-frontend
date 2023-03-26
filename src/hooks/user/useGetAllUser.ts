import { useCallback, useEffect, useState } from "react";
import { allUser } from "../../service/User";
import { UserInfo } from "../../types/User.type";

export default function useGetAllUser() {
  const [data, setData] = useState<UserInfo[]>([]);

  const handleRequest = useCallback(async () => {
    try {
      const resp = await allUser();
      if (!resp) {
        return;
      }
      setData(resp.data.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    handleRequest();
  }, []);

  return {
    data,
    handleRequest,
  };
}
