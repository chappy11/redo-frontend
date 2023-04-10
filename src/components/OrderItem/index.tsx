import React, { useCallback, useEffect, useMemo, useState } from "react";
import { getOrderItems } from "../../service/SalvageOrder";
import Table from "../Table";
import { BASE_URL } from "../../constant/config";
import { convertMoney } from "../../utils/money.utils";

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

      const resp = await getOrderItems(props.id);

      setData(resp.data.data);
    } catch (error) {
      console.log(error);
    }
  }, [props.id]);

  useEffect(() => {
    sendRequest();
  }, [props.id]);

  const getTotal = (quantity: string, price: string) => {
    return parseInt(quantity) * parseFloat(price);
  };
  const displayData = useMemo(() => {
    return data.map((val, i) => (
      <tr>
        <td>
          <img src={BASE_URL + val.pic1} alt="phone" className=" w-20 h-24" />
        </td>
        <td className=" ">
          <div>{val.deviceName}</div>({val.deviceBrand})
        </td>
        <td>{val.order_quantity}pcs</td>
        <td>{convertMoney(val.salvage_price)}</td>
        <td>
          {convertMoney(
            getTotal(val.order_quantity, val.salvage_price).toString()
          )}
        </td>
      </tr>
    ));
  }, [data]);
  return (
    <Table header={["", "", "Qty", "Price", "Total"]}>{displayData}</Table>
  );
}
