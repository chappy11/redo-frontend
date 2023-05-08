import React, { useCallback, useEffect, useMemo, useState } from "react";
import { getpayment } from "../../service/SalvageOrder";
import Table from "../Table";

type Props = {
  ref_id: string;
};

export default function PaymentList(props: Props) {
  const [data, setData] = useState<any[]>([]);

  const sendRequest = useCallback(async () => {
    try {
      const resp = await getpayment(props.ref_id);
      setData(resp.data.data);
    } catch (error) {
      console.log(error);
    }
  }, [props.ref_id]);

  useEffect(() => {
    sendRequest();
  }, [props.ref_id]);

  const dipslayData = useMemo(() => {
    return data.map((val, i) => (
      <tr>
        <td className=" border-spacing-1">Ref NO.{val.paymentRefNo}</td>
        <td className=" border-spacing-1">{val.amount}</td>
        <td className=" border-spacing-1">{val.sender_mobileNumber}</td>
        <td className=" border-spacing-1">{val.reciever_mobileNumber}</td>
      </tr>
    ));
  }, [data]);

  return (
    <Table header={["Ref ID", "Amount", "Sender", "Receiver"]}>
      {dipslayData}
    </Table>
  );
}
