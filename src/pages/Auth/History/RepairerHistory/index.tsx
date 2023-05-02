import React, { useMemo } from "react";
import { PageContainer } from "../../../../components";
import useGetAllSuccessTransaction from "../../../../hooks/RefubrishOrder/useGetAllSuccessTransaction";
import ItemCard from "../../RefubrishOrder/ItemCard";
import { RoutesPath } from "../../../../types/RoutesPath.enum";
import { convertMoney } from "../../../../utils/money.utils";

export default function RepairerHistory() {
  const { data } = useGetAllSuccessTransaction();

  function handleClick(id: string) {
    window.location.href = RoutesPath.REFUBRISH_ORDER + id;
  }

  const displayData = useMemo(() => {
    return data.map((val, i) => (
      <ItemCard
        order={val}
        handleClick={() => handleClick(val.refubrishorder_id)}
      />
    ));
  }, [data]);

  const getTotal = useMemo(() => {
    return data.reduce((x, y) => x + parseFloat(y.total_amount), 0);
  }, [data]);

  return (
    <PageContainer>
      <div className=" m-auto w-1/2">
        <div className=" bg-primary p-4 shadow-lg flex">
          <div className=" flex-1">
            <h1 className=" text-white font-bold">History</h1>
          </div>
          <h1 className=" text-white font-bold">
            Total Amount: {convertMoney(getTotal)}
          </h1>
        </div>
        {displayData}
      </div>
    </PageContainer>
  );
}
