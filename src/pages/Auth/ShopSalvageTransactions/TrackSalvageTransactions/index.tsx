import { useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  ImageView,
  OrderItem,
  PageContainer,
  PaymentList,
} from "../../../../components";
import useGetTransactionById from "../../../../hooks/salvageOrder/useGetTransactionById";
import { ItemTransactionStatus } from "../../../../types/ItemTransactionStatus.enum";
import { dateFormat } from "../../../../utils/date.util";
import { getTransactionIcon } from "../../../../utils/Icons.utils";
export default function TrackSalvageTransactions() {
  const { id } = useParams();
  const { data } = useGetTransactionById({ trans_id: id ? id : "" });
  const transactions = [
    ItemTransactionStatus.PENDING,
    ItemTransactionStatus.ACCEPTED,
    ItemTransactionStatus.DELIVERED,
    ItemTransactionStatus.SUCCESS,
  ];

  console.log(data);
  const thisIndex = transactions.indexOf(data?.salvageorder_status);

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
    [data?.salvageorder_status, thisIndex]
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
    [thisIndex, data?.salvageorder_status]
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
                Your item has been already accepted waiting for seller to
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
    [thisIndex, data?.salvageorder_status]
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

  const displayCourierRef = useMemo(() => {
    if(data?.courierRef === ''){
      return;
    }

    return ( 
    <p className=" my-2">
      Courier Ref: {data?.courierRef}
    </p>
    )
  }, [data?.courierRef])

  return (
    <PageContainer>
      <div className=" md:m-auto lg:m-auto mx-5  md:w-3/4 lg:w-3/4">
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
              <OrderItem id={data?.salvageorder_id} />
              <p className=" my-2">
                Receiver Name: {data?.salvage_recievername}
              </p>
              <p className=" my-2">
                Seller Name: {data?.fullname}
              </p>
              <p className=" my-2">
                Courier: {data?.courier}
              </p>
              {displayCourierRef}
              <p className=" my-2">
                Mobile Number: {data?.salvage_recieverMobile}
              </p>
              <p className=" my-2">
                Shipping Address: {data?.salvage_shippingAddress}
              </p>
              <p className=" my-2">Amount : PHP {data?.order_totalAmount}</p>
              <PaymentList ref_id={data?.ref_id} />
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
