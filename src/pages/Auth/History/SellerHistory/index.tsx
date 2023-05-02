import React, { useMemo } from "react";
import { PageContainer } from "../../../../components";
import useGetAllSuccessTransactions from "../../../../hooks/salvageOrder/useGetAllSuccessTransactions";
import ItemCard from "../../UserSellingOrder/components/ItemCard";
import { convertMoney } from "../../../../utils/money.utils";

export default function SellerHistory() {
  const { data } = useGetAllSuccessTransactions();

  const display = useMemo(() => {
    return data.map((val, i) => (
      <ItemCard
        id={val.salvageorder_id}
        name={val.fullname}
        ref_id={val.ref_id}
        brand={val.deviceBrand}
        amount={val.order_totalAmount}
        status={val.salvageorder_status}
      />
    ));
  }, [data]);

  const getTotal = useMemo(() => {
    return data.reduce((x, y) => x + parseFloat(y.order_totalAmount), 0);
  }, [data]);
  return (
    <PageContainer>
      <div className=" w-1/2 m-auto">
        <div className=" bg-primary w-full p-4 flex">
          <div className=" flex flex-1">
            <h1 className=" text-white font-bold">Transaction History</h1>
          </div>
          <div className=" flex w-full flex-1 justify-end">
            <h1 className=" text-white font-bold ">
              Total Amount: {convertMoney(getTotal)}
            </h1>
          </div>
        </div>

        {display}
      </div>
    </PageContainer>
  );
}
