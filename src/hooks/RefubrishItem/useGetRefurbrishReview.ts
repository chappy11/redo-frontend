import React, { useCallback, useEffect, useState } from "react";
import { getRefurbrishReview } from "../../service/RefurbrishReview";

type Props = {
  refurbrishItem_id: string;
};

export default function useGetRefurbrishReview(props: Props) {
  const [data, setData] = useState<any[]>([]);

  const sendRequest = useCallback(async (id: string) => {
    try {
      const resp = await getRefurbrishReview(id);

      setData(resp.data.data);
    } catch (error) {}
  }, []);

  useEffect(() => {
    sendRequest(props.refurbrishItem_id);
  }, [props.refurbrishItem_id]);

  return {
    data,
    sendRequest,
  };
}
