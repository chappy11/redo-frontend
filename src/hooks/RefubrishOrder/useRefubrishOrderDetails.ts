import React, { useCallback, useEffect, useState } from "react";
import { getById } from "../../service/RefubrishOrder";

type Payload = {
  trans_id: string;
};

export default function useRefubrishOrderDetails(props: Payload) {
  const [data, setData] = useState<any>({});
  const sendRequest = useCallback(async () => {
    try {
      if (!props.trans_id) {
        return;
      }

      const resp = await getById(props.trans_id);
      setData(resp.data.data);
    } catch (error) {
      console.log(error);
    }
  }, [props.trans_id]);

  useEffect(() => {
    sendRequest();
  }, [props.trans_id]);

  return {
    data,
    sendRequest,
  };
}
