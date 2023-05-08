import { useCallback, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { PageContainer, PaymentList, Button } from "../../../../../components";
import useGetTransactionById from "../../../../../hooks/salvageOrder/useGetTransactionById";
import { ItemTransactionStatus } from "../../../../../types/ItemTransactionStatus.enum";
import { getTransactionIcon } from "../../../../../utils/Icons.utils";
import { dateFormat } from "../../../../../utils/date.util";
import OrderItem from "../../RefubrishOrders/OrderItem";
import useRefubrishOrderDetails from "../../../../../hooks/RefubrishOrder/useRefubrishOrderDetails";
import useGetPaymentRefubrish from "../../../../../hooks/RefubrishOrder/useGetPaymentRefubrish";
import useGetRefubrishOrderItems from "../../../../../hooks/RefubrishOrder/useGetRefubrishOrderItems";
import { convertMoney } from "../../../../../utils/money.utils";
import { BASE_URL } from "../../../../../constant/config";
import Table from "../../../../../components/Table";

export default function RefubrishTransactionDetails() {
  const { id } = useParams();
  const { data } = useRefubrishOrderDetails({ trans_id: id ? id : "" });
  const { data: payment, sendRequest: handlepayment } =
    useGetPaymentRefubrish();
  const { data: item } = useGetRefubrishOrderItems({
    refubrishorder_id: id ?? "",
  });

  useEffect(() => {
    handlepayment(data.ref_id);
  }, [data]);
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

  const transactions = [
    ItemTransactionStatus.PENDING,
    ItemTransactionStatus.ACCEPTED,
    ItemTransactionStatus.DELIVERED,
    ItemTransactionStatus.SUCCESS,
  ];

  console.log(data);
  const thisIndex = transactions.indexOf(data?.refubrishorder_status);

  const displayPending = useCallback(
    (index: number) => {
      if (thisIndex >= index) {
        return (
          <div className=" flex">
            <p className="bg-green-500 text-4xl w-fit p-2 rounded-full text-white ">
              {getTransactionIcon(ItemTransactionStatus.PENDING)}
            </p>
            <div className=" flex items-start mx-5 flex-col justify-center">
              <p>
                {thisIndex === index
                  ? `Your order is currently pending `
                  : "Your order is has been accepted\n"}
              </p>
              <span className=" text-xs">
                {dateFormat(data?.salvageOrder_updateAt)}
              </span>
            </div>
          </div>
        );
      }

      return (
        <div className=" flex">
          <p className="bg-slate-500 text-4xl w-fit p-2 rounded-full text-white ">
            {getTransactionIcon(ItemTransactionStatus.PENDING)}
          </p>
          <div className=" flex  justify-center items-center mx-5">
            <p>Current Your item is Pending</p>
          </div>
        </div>
      );
    },
    [data?.refubrishorder_status, thisIndex]
  );

  const displayAcceptLine = useCallback(
    (index: number) => {
      if (thisIndex >= index) {
        return (
          <div className=" w-12 flex h-20 justify-center">
            <div className=" border-r-2 h-full border-green-500" />
          </div>
        );
      }

      return (
        <div className=" w-12 flex h-20 justify-center">
          <div className=" border-r-2 h-full border-slate-500" />
        </div>
      );
    },
    [thisIndex, data?.refubrishorder_status]
  );

  const displayAccepted = useCallback(
    (index: number) => {
      if (thisIndex >= index) {
        return (
          <div className=" flex">
            <p className=" text-4xl bg-green-600 w-fit p-2 rounded-full text-white">
              {getTransactionIcon(ItemTransactionStatus.ACCEPTED)}
            </p>
            <div className=" flex  justify-center items-start mx-5 flex-col">
              <p>
                Your item has already been accepted waiting for seller to
                deliver your item.
              </p>
              <span className=" text-xs">
                {dateFormat(data?.salvageOrder_updateAt)}
              </span>
            </div>
          </div>
        );
      }

      return (
        <div className=" flex">
          <p className=" text-4xl bg-slate-600 w-fit p-2 rounded-full text-white">
            {getTransactionIcon(ItemTransactionStatus.ACCEPTED)}
          </p>
          <div className=" flex  justify-center items-center mx-5"></div>
        </div>
      );
    },
    [thisIndex, data?.refubrishorder_status]
  );

  const displayDelivered = useCallback(
    (index: number) => {
      if (thisIndex >= index) {
        return (
          <div className=" flex">
            <p className=" text-4xl bg-green-600 w-fit p-2 rounded-full text-white">
              {getTransactionIcon(ItemTransactionStatus.DELIVERED)}
            </p>
            <div className=" flex  justify-center items-start mx-5 flex-col">
              <p>Your Item is current on delivery</p>
              <span className=" text-xs">
                {dateFormat(data?.salvageOrder_updateAt)}
              </span>
            </div>
          </div>
        );
      }

      return (
        <div className=" flex">
          <p className=" text-4xl bg-slate-600 w-fit p-2 rounded-full text-white">
            {getTransactionIcon(ItemTransactionStatus.DELIVERED)}
          </p>
          <div className=" flex  justify-center items-center mx-5"></div>
        </div>
      );
    },
    [thisIndex, data?.salvageorder_status]
  );

  const displaySuccess = useCallback(
    (index: number) => {
      if (thisIndex >= index) {
        return (
          <div className=" flex">
            <p className=" text-4xl bg-green-600 w-fit p-2 rounded-full text-white">
              {getTransactionIcon(ItemTransactionStatus.SUCCESS)}
            </p>
            <div className=" flex  justify-center items-center mx-5">
              <p>Item Received!</p>
            </div>
          </div>
        );
      }

      return (
        <div className=" flex">
          <p className=" text-4xl bg-slate-600 w-fit p-2 rounded-full text-white">
            {getTransactionIcon(ItemTransactionStatus.SUCCESS)}
          </p>
          <div className=" flex  justify-center items-center mx-5"></div>
        </div>
      );
    },
    [thisIndex, data?.salvageorder_status]
  );

  return (
    <PageContainer>
      <div className=" m-auto w-3/4">
        <h1 className=" font-bold">Track Order</h1>
        <div className=" h-5" />
        <div className=" bg-white p-4 shadow-lg mb-10 flex flex-col md:flex-row-reverse lg:flex-row-reverse ">
          <div className=" md:flex-1 lg:flex-1">
            <h1 className=" font-bold">Transaction Status</h1>
            <div className=" h-5" />
            {displayPending(0)}
            <div className=" h-3" />
            {displayAcceptLine(1)}
            <div className=" h-3" />
            {displayAccepted(1)}
            <div className=" h-3" />
            {displayAcceptLine(2)}
            <div className=" h-3" />
            {displayDelivered(2)}
            <div className=" h-3" />
            {displayAcceptLine(3)}
            <div className=" h-3" />
            {displaySuccess(3)}
          </div>
          <div className=" h-5" />
          <div className=" flex flex-col item-center justify-center w-full md:flex-1 lg:flex-1">
            <div>
              <h1 className=" font-bold">Order item</h1>
              <Table header={["", "", "Qty", "Price", "Total"]}>
                {displayData}
              </Table>
              <p className=" my-2">Reciever Name: {data?.r_recievername}</p>
              <p className=" my-2">Mobile Number: {data?.r_mobileNumber}</p>
              <p className=" my-2">
                Shipping Address: {data?.r_shippingAddress}
              </p>
              <p className=" my-2">Amount : PHP {data?.total_amount}</p>
              <p className=" my-2">
                {data?.courier} : {data?.courierRef}
              </p>
              <Table header={["Ref ID", "Amount", "Sender", "Reciever"]}>
                {displayPayment}
              </Table>
              <div className=" h-4" />
              {data?.salvageorder_status === ItemTransactionStatus.PENDING && (
                <Button backgroundColor="bg-red-500">Cancel Order</Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
