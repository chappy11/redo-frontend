import React, { useCallback, useEffect, useState } from "react";
import useGetFromStorage from "../useGetFromStorage";
import { activeCart } from "../../service/RefubrishCart";

type Props = {
  seller_id: string;
};
export default function useGetActiveRefubrishCart(props: Props) {
  const [data, setData] = useState<any[]>([]);
  const { data: user } = useGetFromStorage();

  const sendRequest = useCallback(async () => {
    try {
      if (!user) {
        return;
      }

      if (!props.seller_id) {
        return;
      }
      const resp = await activeCart(user?.user_id, props.seller_id);

      setData(resp.data.data);
    } catch (error) {
      console.log(error);
    }
  }, [props.seller_id, user]);

  useEffect(() => {
    sendRequest();
  }, [props.seller_id, user]);
  return { data };
}
