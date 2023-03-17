import { useCallback, useEffect, useState } from "react";
import { getSalvageItemById } from "../../service/SalvageItem";

type Props = {
  salvageItem_id: string;
};

export default function useGetSalvageItemById(props: Props) {
  const { salvageItem_id } = props;
  const [data, setData] = useState<any | null>(null);

  const sendRequest = useCallback(async () => {
    try {
      const resp = await getSalvageItemById(salvageItem_id);

      if (resp.data.status === 0) {
        return;
      }

      setData(resp.data.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    sendRequest();
  }, []);

  return {
    data,
  };
}
