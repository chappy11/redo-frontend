import { useCallback, useEffect, useState } from "react";
import useGetFromStorage from "../useGetFromStorage";
import { getSalvageCart } from "../../service/SalvageCart";

export default function useGetSalvageCart() {
  const [data, setData] = useState<any[]>([]);
  const [refetch, setRefetch] = useState<boolean>(false);
  const { data: user } = useGetFromStorage();

  const sendRequest = useCallback(async () => {
    try {
      if (!user) {
        return;
      }

      const resp = await getSalvageCart(user?.user_id);
      const items = resp.data.data;
      let temp: any[] = [];
      const tempunique = items.filter(
        (item: any, pos: number, self: any) =>
          self.findIndex((v: any) => v.seller_id === item.seller_id) === pos
      );

      tempunique.forEach((element: any) => {
        const payload = {
          seller_id: element.seller_id,
          fullname: element.fullname,
          items: items.filter(
            (val: any) => val.seller_id === element.seller_id
          ),
        };

        temp.push(payload);
      });

      setData(temp);
    } catch (error) {
      console.log(error);
    }
  }, [user]);

  useEffect(() => {
    sendRequest();
  }, [user, refetch]);

  return { data, setRefetch };
}
