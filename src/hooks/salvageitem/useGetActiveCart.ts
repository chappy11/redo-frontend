import { useCallback, useEffect, useState } from "react";
import useGetFromStorage from "../useGetFromStorage";
import { getSalvageActiveCart } from "../../service/SalvageCart";

type Props = {
  seller_id: string;
};

export default function useGetActiveCart(props: Props) {
  const [data, setData] = useState<any[]>([]);
  const { data: user } = useGetFromStorage();

  const sendRequest = useCallback(async () => {
    try {
      if (!user) {
        return;
      }

      const resp = await getSalvageActiveCart(props.seller_id, user.user_id);

      setData(resp.data.data);
    } catch (error) {
      console.log(error);
    }
  }, [user, props.seller_id]);

  useEffect(() => {
    sendRequest();
  }, [user, props.seller_id]);

  return {
    data,
  };
}
