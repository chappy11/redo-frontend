import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import useRefubrishOrderDetails from "../../../../../hooks/RefubrishOrder/useRefubrishOrderDetails";
import {
  Button,
  Modal,
  PageContainer,
  PaymentList,
  TextInput,
} from "../../../../../components";
import useAlertOptions from "../../../../../hooks/useAlertOptions";

import {
  BtnColor,
  ItemTransactionStatus,
  StatusColor,
} from "../../../../../types/ItemTransactionStatus.enum";

import useGetRefubrishOrderItems from "../../../../../hooks/RefubrishOrder/useGetRefubrishOrderItems";
import { BASE_URL } from "../../../../../constant/config";
import { convertMoney } from "../../../../../utils/money.utils";
import Table from "../../../../../components/Table";
import useGetPaymentRefubrish from "../../../../../hooks/RefubrishOrder/useGetPaymentRefubrish";
import { updateOrderStatus } from "../../../../../service/RefubrishOrder";

function UserSellingOrderDetails() {
  const { id } = useParams();
  const [courierRef, setCourierRef] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { data, sendRequest } = useRefubrishOrderDetails({
    trans_id: id ? id : "",
  });
  const { data: payment, sendRequest: handlepayment } =
    useGetPaymentRefubrish();

  const { data: item } = useGetRefubrishOrderItems({
    refubrishorder_id: id ?? "",
  });

  const { alertSuccess, alertWarning } = useAlertOptions();

  useEffect(() => {
    handlepayment(data.ref_id);
  }, [data]);

  async function handleClick(status: string) {
    try {
      if (!id) {
        return;
      }

      if (status === ItemTransactionStatus.DELIVERED) {
        if (!courierRef) {
          alertWarning("Please Input the " + data.courier + " tracking number");

          return;
        }
      }
      const payload = {
        id: id,
        status: status,
        courierRef,
      };
      const resp = await updateOrderStatus(payload);

      if (resp) {
        alertSuccess("Successfully Updated");
        setIsOpen(false);
        sendRequest();
        return;
      }
    } catch (e) {
      console.log(e);
    }
  }

  const displayButton = useMemo(() => {
    const status = data?.refubrishorder_status;
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
          onClick={() => setIsOpen(true)}
        >
          Order on Delivery
        </Button>
      );
    }

    if (status === ItemTransactionStatus.DELIVERED) {
      return (
        <Button
          backgroundColor={BtnColor.SUCCESS}
          onClick={() => handleClick(ItemTransactionStatus.SUCCESS)}
        >
          Order Delivered
        </Button>
      );
    }
  }, [data?.refubrishorder_status]);

  const getTotal = (quantity: string, price: string) => {
    return parseInt(quantity) * parseFloat(price);
  };
  const displayData = useMemo(() => {
    return item.map((val, i) => (
      <tr>
        <td>
          <img src={BASE_URL + val.rpic1} alt="phone" className=" w-20 h-24" />
        </td>
        <td className=" ">
          <div>{val.rdevice_name}</div>({val.rdeviceBrand})
        </td>
        <td>{val.order_quantity}pcs</td>
        <td>{convertMoney(val.selling_price)}</td>
        <td>
          {convertMoney(
            getTotal(val.order_quantity, val.selling_price).toString()
          )}
        </td>
      </tr>
    ));
  }, [data, item]);

  const displayPayment = useMemo(() => {
    return payment.map((val, i) => (
      <tr>
        <td className=" border-spacing-1">Ref NO.{val.paymentRefNo}</td>
        <td className=" border-spacing-1">{val.amount}</td>
        <td className=" border-spacing-1">{val.sender_mobileNumber}</td>
        <td className=" border-spacing-1">{val.reciever_mobileNumber}</td>
      </tr>
    ));
  }, [data, payment]);

  return (
    <PageContainer>
      <div className=" w-3/4 m-auto">
        <h1>Transaction Details</h1>
        <div className=" h-5" />

        <div className=" bg-white p-4">
          <Table header={["", "", "Qty", "Price", "Total"]}>
            {displayData}
          </Table>
          <h1 className=" font-bold">{data?.deviceName}</h1>
          <p className=" my-2">Transaction No. : {data?.ref_id}</p>
          <Modal
            showModal={isOpen}
            setShowModal={setIsOpen}
            onConfirm={() => handleClick(ItemTransactionStatus.DELIVERED)}
            onCancel={() => setIsOpen(false)}
            header="Enter courier Reference"
          >
            <label>{data.courier} Tracking NO</label>
            <TextInput
              type="text"
              onChange={(e) => setCourierRef(e.target.value)}
            />
          </Modal>
          <p className=" my-2">Reciever Name: {data?.r_recievername}</p>
          <p className=" my-2">Mobile Number: {data?.r_mobileNumber}</p>
          <p className=" my-2">Shipping Address: {data?.r_shippingAddress}</p>
          <p className=" my-2">Amount : PHP {data?.total_amount}</p>
          <div className=" flex justify-end mb-5">{displayButton}</div>

          <p className=" text-center text-red-500">
            <span className=" font-bold">Note: </span>
            Currently your money is in our hands. The system will automatically
            transafer to your account after you finish this transaction.
          </p>

          <div className=" h-4" />
          <Table header={["Ref ID", "Amount", "Sender", "Reciever"]}>
            {displayPayment}
          </Table>
        </div>
      </div>
    </PageContainer>
  );
}

export default UserSellingOrderDetails;
