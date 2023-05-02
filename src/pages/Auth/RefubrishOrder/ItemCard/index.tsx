import React, { useMemo } from "react";
import { Button } from "../../../../components";
import { BASE_URL } from "../../../../constant/config";
import { RoutesPath } from "../../../../types/RoutesPath.enum";
import { dateFormat } from "../../../../utils/date.util";
import { convertMoney } from "../../../../utils/money.utils";
import {
  ItemTransactionStatus,
  StatusColor,
} from "../../../../types/ItemTransactionStatus.enum";

type Props = {
  order: any;
  handleClick: () => void;
};

export default function ItemCard(props: Props) {
  const order = props.order;
  const color = useMemo(() => {
    if (order.refubrishorder_status === ItemTransactionStatus.ACCEPTED) {
      return StatusColor.ACCEPTED;
    }

    if (order.refubrishorder_status === ItemTransactionStatus.PENDING) {
      return StatusColor.PENDING;
    }
    if (order.refubrishorder_status === ItemTransactionStatus.DELIVERED) {
      return StatusColor.DELIVERED;
    }

    if (order.refubrishorder_status === ItemTransactionStatus.SUCCESS) {
      return StatusColor.SUCCESS;
    }

    if (order.refubrishorder_status === ItemTransactionStatus.CANCELED) {
      return StatusColor.CANCELED;
    }
  }, [order.refubrishorder_status]);

  console.log("Color", color);
  return (
    <div className=" bg-white flex shadow-lg rounded-md my-5">
      <img
        src={BASE_URL + order.item.rpic1}
        alt="Item"
        className=" h-44 w-40"
      />
      <div className=" px-5 py-2 w-full">
        <p className=" font-semibold">{order.ref_id}</p>
        <p>{dateFormat(order.sellingTransactionDate)}</p>
        <div className=" flex w-full">
          <div className=" flex-1  ">
            <p className=" font-bold text-secondary mt-2">
              PHP {convertMoney(order.total_amount)}
            </p>
            <p className={`${color}`}>Status:{order.refubrishorder_status}</p>
          </div>

          <Button onClick={props.handleClick}>View Details</Button>
        </div>
      </div>
    </div>
  );
}
