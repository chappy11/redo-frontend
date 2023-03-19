import { useCallback, useEffect, useState } from "react";
import { getTransactionById } from "../../service/SalvageOrder";
import useAlertOptions from "../useAlertOptions";

type Props = {
  trans_id: string;
};

export default function useGetTransactionById(props: Props) {
  const [data, setData] = useState<any>(null);
  const { alertError } = useAlertOptions();
  const sendRequest = useCallback(async () => {
    try {
      const resp = await getTransactionById(props.trans_id);

      if (resp.data.status === "0") {
        alertError();
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
    sendRequest,
  };
}
