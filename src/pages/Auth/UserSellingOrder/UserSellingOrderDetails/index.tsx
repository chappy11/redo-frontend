import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { Button, ImageView, PageContainer } from "../../../../components";
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
          Deliver Ordered
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
          <div className=" flex justify-center">
            <ImageView pic1={data?.pic1} pic2={data?.pic2} pic3={data?.pic3} />
          </div>
          <h1 className=" font-bold">{data?.deviceName}</h1>
          <p className=" my-2">Transaction No. : {data?.ref_id}</p>
          <p className=" my-2">Brand : {data?.deviceBrand}</p>
          <p className=" my-2">Reciever Name: {data?.salvage_recievername}</p>
          <p className=" my-2">Mobile Number: {data?.salvage_recieverMobile}</p>
          <p className=" my-2">
            Shipping Address: {data?.salvage_shippingAddress}
          </p>
          <p className=" my-2">Amount : PHP {data?.salvage_amount}</p>
          <p className=" mt-2">Description:</p>
          <p className=" text-sm">{data?.deviceDescription}</p>
          <div className=" h-4" />
          {displayButton}
        </div>
      </div>
    </PageContainer>
  );
}

export default UserSellingOrderDetails;
