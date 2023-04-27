import React, { useCallback, useEffect, useMemo, useState } from "react";
import useGetRefubrishOrderItems from "../../../../../hooks/RefubrishOrder/useGetRefubrishOrderItems";
import Table from "../../../../../components/Table";
import { BASE_URL } from "../../../../../constant/config";
import { convertMoney } from "../../../../../utils/money.utils";
import { getItems } from "../../../../../service/RefubrishOrder";

type Props = {
  id: string;
};
export default function OrderItem(props: Props) {
  const [data, setData] = useState<any[]>([]);

  const sendRequest = useCallback(async () => {
    try {
      if (!props.id) {
        return;
      }
      console.log("gg");

      const resp = await getItems(props.id);

      setData(resp.data.data);
    } catch (error) {
      console.log(error);
    }
  }, [props.id]);

  useEffect(() => {
    sendRequest();
  }, [data]);

  const getTotal = (quantity: string, price: string) => {
    return parseInt(quantity) * parseFloat(price);
  };    
  const displayData = useMemo(() => {
    return data.map((val, i) => (
      <tr>
        <td>
          <img src={BASE_URL + val.rpic1} alt="phone" className=" w-20 h-24" />
        </td>
        <td className=" ">
          <div>{val.rdevice_name}</div>({val.rdeviceBrand})
        </td>
        <td>{val.order_quantity}pcs</td>
        <td>{convertMoney(val.salvage_price)}</td>
        <td>
          {convertMoney(
            getTotal(val.order_quantity, val.selling_price).toString()
          )}
        </td>
      </tr>
    ));
  }, [data, props.id]);
  return (
    <Table header={["", "", "Qty", "Price", "Total"]}>{displayData}</Table>
  );
}
