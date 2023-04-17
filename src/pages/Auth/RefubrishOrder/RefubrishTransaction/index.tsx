import React, { useMemo } from "react";
import { PageContainer } from "../../../../components";
import useGetRefubrishTransactions from "../../../../hooks/RefubrishOrder/useGetRefubrishTransactions";
import ItemCard from "../ItemCard";
import { RoutesPath } from "../../../../types/RoutesPath.enum";

export default function RefubrishTransaction() {
  const { data } = useGetRefubrishTransactions();
  function handleCLick(id: string) {
    window.location.href = RoutesPath.REFUBRISH_TRANSACTION + id;
  }
  const displayData = useMemo(() => {
    return data.map((val: any, i: number) => (
      <ItemCard
        order={val}
        handleClick={() => handleCLick(val.refubrishorder_id)}
      />
    ));
  }, [data]);
  return (
    <PageContainer>
      <div className=" m-auto w-1/2">
        <h1>My Order</h1>
        {displayData}
      </div>
    </PageContainer>
  );
}
