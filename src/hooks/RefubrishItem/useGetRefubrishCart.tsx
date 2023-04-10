import { useCallback, useEffect, useState } from "react";
import { cart } from "../../service/RefubrishCart";
import useGetFromStorage from "../useGetFromStorage";

export default function useGetRefubrishCart() {
  const [data, setData] = useState<any[]>([]);
  const { data: user } = useGetFromStorage();
  const [refetch, setRefetch] = useState<boolean>(false);
  const sendRequest = useCallback(async () => {
    try {
      if (!user) {
        return;
      }

      const resp = await cart(user?.user_id);
      const items = resp.data.data;
      let temp: any[] = [];
      const uniqueByUserId = items.filter(
        (item: any, pos: number, self: any) =>
          self.findIndex((v: any) => v.seller_id === item.seller_id) === pos
      );

      uniqueByUserId.forEach((element: any, i: number) => {
        const payload = {
          seller_id: element.seller_id,
          shopName: element.shop_name,
          items: items.filter(
            (val: any) => val.seller_id === element.seller_id
          ),
        };

        temp.push(payload);
      });

      console.log("HH", temp);
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
