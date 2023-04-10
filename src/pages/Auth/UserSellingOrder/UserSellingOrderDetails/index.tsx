import { useMemo } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  ImageView,
  OrderItem,
  PageContainer,
  PaymentList,
} from "../../../../components";
import useGetTransactionById from "../../../../hooks/salvageOrder/useGetTransactionById";
import useAlertOptions from "../../../../hooks/useAlertOptions";
import { updateStatus } from "../../../../service/SalvageOrder";
import {
  ItemTransactionStatus,
  StatusColor,
} from "../../../../types/ItemTransactionStatus.enum";

function UserSellingOrderDetails() {
  const { id } = useParams();
  const { data, sendRequest } = useGetTransactionById({
    trans_id: id ? id : "",
  });
  const { alertSuccess } = useAlertOptions();

  async function handleClick(status: string) {
    try {
      if (!id) {
        return;
      }
      const payload = {
        id: id,
        status: status,
      };
      const resp = await updateStatus(payload);

      if (resp) {
        alertSuccess("Successfully Updated");
        sendRequest();
        return;
      }
    } catch (e) {
      console.log(e);
    }
  }

  const displayButton = useMemo(() => {
    const status = data?.salvageorder_status;
    console.log("STATUS", status);

    if (status === ItemTransactionStatus.PENDING) {
      return (
        <Button
          backgroundColor={StatusColor.ACCEPTED}
          onClick={() => handleClick(ItemTransactionStatus.ACCEPTED)}
        >
          Accept Order
        </Button>
      );
    }

    if (status === ItemTransactionStatus.ACCEPTED) {
      return (
        <Button
          backgroundColor={StatusColor.DELIVERED}
          onClick={() => handleClick(ItemTransactionStatus.DELIVERED)}
        >
          Ready For Delivery
        </Button>
      );
    }

    if (status === ItemTransactionStatus.DELIVERED) {
      return (
        <Button
          backgroundColor={StatusColor.SUCCESS}
          onClick={() => handleClick(ItemTransactionStatus.SUCCESS)}
        >
          Deliver Ordered
        </Button>
      );
    }
  }, [data?.salvageorder_status]);

  return (
    <PageContainer>
      <div className=" w-3/4 m-auto">
        <h1>Transaction Details</h1>
        <div className=" h-5" />
        <div className=" bg-white p-4">
          <OrderItem id={data?.salvageorder_id} />
          <h1 className=" font-bold">{data?.deviceName}</h1>
          <p className=" my-2">Transaction No. : {data?.ref_id}</p>
          <p className=" my-2">Brand : {data?.deviceBrand}</p>
          <p className=" my-2">Reciever Name: {data?.salvage_recievername}</p>
          <p className=" my-2">Mobile Number: {data?.salvage_recieverMobile}</p>
          <p className=" my-2">
            Shipping Address: {data?.salvage_shippingAddress}
          </p>
          <p className=" my-2">Amount : PHP {data?.order_totalAmount}</p>
          <div className=" flex justify-end mb-5">{displayButton}</div>

          <p className=" text-center text-red-500">
            <span className=" font-bold">Note: </span>
            Currently your money is in our hands. The system will automatically
            transafer to your account after you finish this transaction.
          </p>
          <PaymentList ref_id={data?.ref_id} />
          <div className=" h-4" />
        </div>
      </div>
    </PageContainer>
  );
}

export default UserSellingOrderDetails;
