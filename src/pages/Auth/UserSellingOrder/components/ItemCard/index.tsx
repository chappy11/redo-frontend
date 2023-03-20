import { useMemo } from "react";
import { BASE_URL } from "../../../../../constant/config";
import {
  ItemTransactionStatus,
  StatusColor,
} from "../../../../../types/ItemTransactionStatus.enum";
import { RoutesPath } from "../../../../../types/RoutesPath.enum";
import { getTransactionIcon } from "../../../../../utils/Icons.utils";

type Props = {
  id: string;
  pic1: string;
  name: string;
  ref_id: string;
  brand: string;
  amount: string;
  status: string;
};

export default function ItemCard(props: Props) {
  const { pic1, name, id, ref_id, brand, amount, status } = props;
  console.log(id);
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

    if (status === ItemTransactionStatus.CANCELED) {
      return StatusColor.CANCELED;
    }
  }, [status]);

  function handleClick() {
    window.location.href =
      RoutesPath.USER_SELLING_TRANSACTION_DETAILS + props.id;
  }
  return (
    <div
      className=" w-full bg-white shadow-lg flex p-4 my-3"
      onClick={handleClick}
    >
      <img src={BASE_URL + pic1} className=" w-40 h-44" alt="Item" />
      <div className="">
        <p className=" text-sm ">Reference No.: {ref_id}</p>
        <div className=" h-3" />
        <h1 className=" font-bold">{name}</h1>
        <p className=" text-sm">{brand}</p>
        <div className=" h-2" />
        <p>PHP {amount}</p>
        <div className=" h-2" />
        <div className=" flex">
          <p className={` text-xl ${color}`}>
            {getTransactionIcon(status as ItemTransactionStatus)}{" "}
          </p>
          <div className=" w-3" />
          <p className={` text-sm ${color}`}>{status}</p>
        </div>
      </div>
    </div>
  );
}
