import React, { useCallback, useEffect, useState } from "react";
import { getUsersByStatus } from "../../service/User";
import { UserInfo } from "../../types/User.type";

type Params = {
  status: string;
};

export default function useGetUserByStatus(props: Params) {
  const { status } = props;
  const [data, setData] = useState<UserInfo[]>([]);

  const handleRequest = useCallback(async (status: string) => {
    try {
      const resp = await getUsersByStatus(status);
      setData(resp.data.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    handleRequest(status);
  }, []);

  return {
    data,
    handleRequest,
  };
}
