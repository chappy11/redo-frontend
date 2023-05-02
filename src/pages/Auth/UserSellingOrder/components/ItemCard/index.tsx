import { useMemo } from "react";
import { BASE_URL } from "../../../../../constant/config";
import {
  ItemTransactionStatus,
  StatusColor,
} from "../../../../../types/ItemTransactionStatus.enum";
import { RoutesPath } from "../../../../../types/RoutesPath.enum";
import { getTransactionIcon } from "../../../../../utils/Icons.utils";
import { Button } from "../../../../../components";

type Props = {
  id: string;
  name: string;
  ref_id: string;
  brand: string;
  amount: string;
  status?: string;
};

export default function ItemCard(props: Props) {
  const { name, ref_id, brand, amount, status } = props;

  const color = useMemo(() => {
    if (status === ItemTransactionStatus.ACCEPTED) {
      return StatusColor.ACCEPTED;
    }

    if (status === ItemTransactionStatus.PENDING) {
      return StatusColor.PENDING;
    }
    if (status === ItemTransactionStatus.DELIVERED) {
      return StatusColor.DELIVERED;
    }

    if (status === ItemTransactionStatus.SUCCESS) {
      return StatusColor.SUCCESS;
    }

    if (status === ItemTransactionStatus.CANCELED) {
      return StatusColor.CANCELED;
    }
  }, [status]);
  function handleClick() {
    window.location.href =
      RoutesPath.USER_SELLING_TRANSACTION_DETAILS + props.id;
  }
  return (
    <div className=" flex w-full bg-white shadow-lg flex p-4 my-3">
      <div className="">
        <p className=" text-lg font-bold">Reference No.: {ref_id}</p>
        <div className=" h-3" />
        <h1 className=" ">
          <span className=" font-bold">Buyer Name : </span>
          {name}
        </h1>
        <p className=" text-sm">{brand}</p>
        <div className=" h-2" />
        <p className=" text-red-500 font-bold">PHP {amount}</p>
        <div className=" h-2" />
        <div className=" flex">
          <p className={` text-xl ${color}`}>
            {getTransactionIcon(status as ItemTransactionStatus)}{" "}
          </p>
          <div className=" w-3" />
          <p className={` text-sm ${color}`}>{status}</p>
        </div>
      </div>
      <div className=" flex justify-end items-center flex-1">
        <Button onClick={handleClick}>View Details</Button>
      </div>
    </div>
  );
}
