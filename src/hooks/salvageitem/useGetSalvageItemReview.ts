import React, { useCallback, useEffect, useMemo, useState } from "react";
import { getSalvageItemReview } from "../../service/SalvageReview";

type Props = {
  salvageitem_id: string;
};

export default function useGetSalvageItemReview(props: Props) {
  const [data, setData] = useState<any[]>([]);

  const sendRequest = useCallback(async (salvageItem_id: string) => {
    try {
      const resp = await getSalvageItemReview(salvageItem_id);

      setData(resp.data.data);
    } catch (error) {}
  }, []);

  useEffect(() => {
    sendRequest(props.salvageitem_id);
  }, [props.salvageitem_id]);

  return {
    data,
    sendRequest,
  };
}
