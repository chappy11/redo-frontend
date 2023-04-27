import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  ImageView,
  Modal,
  OrderItem,
  PageContainer,
  PaymentList,
  TextInput,
} from "../../../../components";
import useGetTransactionById from "../../../../hooks/salvageOrder/useGetTransactionById";
import useAlertOptions from "../../../../hooks/useAlertOptions";
import { updateStatus } from "../../../../service/SalvageOrder";
import {
  BtnColor,
  ItemTransactionStatus,
  StatusColor,
} from "../../../../types/ItemTransactionStatus.enum";

function UserSellingOrderDetails() {
  const { id } = useParams();
  const { data, sendRequest } = useGetTransactionById({
    trans_id: id ? id : "",
  });
  const { alertSuccess } = useAlertOptions();
  const [courierRef, setCourierRef] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
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
        setIsOpen(false);
        return;
      }
    } catch (e) {
      console.log(e);
    }
  }

  function handleOpenModal() {
    setIsOpen(true);
  }

  const displayButton = useMemo(() => {
    const status = data?.salvageorder_status;
    console.log("STATUS", status);

    if (status === ItemTransactionStatus.PENDING) {
      return (
        <Button
          backgroundColor={BtnColor.ACCEPTED}
          onClick={() => handleClick(ItemTransactionStatus.ACCEPTED)}
        >
          Accept Order
        </Button>
      );
    }

    if (status === ItemTransactionStatus.ACCEPTED) {
      return (
        <Button
          backgroundColor={BtnColor.DELIVERED}
          onClick={() => handleOpenModal()}
        >
          Ready For Delivery
        </Button>
      );
    }

    if (status === ItemTransactionStatus.DELIVERED) {
      return (
        <Button
          backgroundColor={BtnColor.SUCCESS}
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
        <Modal
          showModal={isOpen}
          setShowModal={setIsOpen}
          onConfirm={() => handleClick(ItemTransactionStatus.DELIVERED)}
          onCancel={() => setIsOpen(false)}
          header="Enter courier Reference"
        >
          <label>{data?.courier} Tracking NO</label>
          <TextInput
            type="text"
            onChange={(e) => setCourierRef(e.target.value)}
          />
        </Modal>
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
