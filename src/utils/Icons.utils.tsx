import { ItemTransactionStatus } from "../types/ItemTransactionStatus.enum";
import { MdPendingActions, MdCancel } from "react-icons/md";
import { BsFillPersonCheckFill, BsCheckLg } from "react-icons/bs";
import { TbTruckDelivery } from "react-icons/tb";
export function getTransactionIcon(status: ItemTransactionStatus) {
  if (status === ItemTransactionStatus.PENDING) {
    return <MdPendingActions />;
  }

  if (status === ItemTransactionStatus.ACCEPTED) {
    return <BsFillPersonCheckFill />;
  }

  if (status === ItemTransactionStatus.DELIVERED) {
    return <TbTruckDelivery />;
  }

  if (status === ItemTransactionStatus.SUCCESS) {
    return <BsCheckLg />;
  }

  if (status === ItemTransactionStatus.CANCELED) {
    return <MdCancel />;
  }
}
