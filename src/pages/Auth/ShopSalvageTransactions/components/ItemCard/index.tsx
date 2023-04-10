import { useMemo } from "react";
import { MdPendingActions } from "react-icons/md";
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
  amount: string;
  status: string;
  ref_id: string;
  name: string;
  noItems: string;
};

export default function ItemCard(props: Props) {
  const { pic1, amount, status, ref_id, name, noItems } = props;

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
    window.location.href = RoutesPath.SALVAGE_TRANSACTIONS_DETAILS + props.id;
  }
  return (
    <div
      className=" w-full bg-white shadow-lg flex p-4 my-3"
      onClick={handleClick}
    >
      <img src={BASE_URL + pic1} className=" w-40 h-44" alt="Item" />
      <div className=" px-5">
        <p className="  text-lg font-bold">Reference No.: {ref_id}</p>
        <div className=" h-3" />
        <p>
          <span className=" font-bold">Seller Name:</span> {name}
        </p>

        <p>
          <span className=" font-bold">No. Items :</span>
          {noItems}pcs
        </p>
        <div className=" h-4" />
        <p className=" font-bold text-lg text-red-500">PHP {amount}</p>
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
