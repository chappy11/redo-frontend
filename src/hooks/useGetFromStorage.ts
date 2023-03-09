import { useEffect, useState } from "react";
import { UserInfo } from "../types/User.type";
import { getUserFromStorage } from "../utils/storage.utils";

export default function useGetFromStorage() {
  const [data, setData] = useState<UserInfo>();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const resp = await getUserFromStorage();

    setData(resp);
  };

  return {
    data,
  };
}
