import React from "react";
import { Button } from "../../../../components";
import { BASE_URL } from "../../../../constant/config";
import { RoutesPath } from "../../../../types/RoutesPath.enum";
import { dateFormat } from "../../../../utils/date.util";
import { convertMoney } from "../../../../utils/money.utils";

type Props = {
  order: any;
};

export default function ItemCard(props: Props) {
  const order = props.order;
  return (
    <div className=" bg-white flex shadow-lg rounded-md my-5">
      <img src={BASE_URL + order.pic1} alt="Item" className=" h-44 w-40" />
      <div className=" px-5 py-2 w-full">
        <p className=" font-semibold">{order.ref_id}</p>
        <p>{dateFormat(order.sellingTransactionDate)}</p>
        <div className=" flex w-full">
          <div className=" flex-1  ">
            <p className=" font-bold text-secondary mt-2">
              PHP {convertMoney(order.total_amount)}
            </p>
          </div>

          <Button
            onClick={() =>
              (window.location.href =
                RoutesPath.TRANSACTION_DETAILS + order.selling_transaction_id)
            }
          >
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
}
