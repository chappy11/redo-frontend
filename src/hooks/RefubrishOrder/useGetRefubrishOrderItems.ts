import React, { useCallback, useEffect, useState } from "react";
import { getItems } from "../../service/RefubrishOrder";

type Props = {
  refubrishorder_id: string;
};

export default function useGetRefubrishOrderItems(props: Props) {
  const [data, setData] = useState<any[]>([]);
  const { refubrishorder_id } = props;

  const sendRequest = useCallback(async () => {
    try {
      if (!refubrishorder_id) {
        return;
      }

      const resp = await getItems(refubrishorder_id);

      setData(resp.data.data);
    } catch (error) {
      console.log(error);
    }
  }, [refubrishorder_id]);

  useEffect(() => {
    sendRequest();
  }, []);

  return { data, sendRequest };
}
