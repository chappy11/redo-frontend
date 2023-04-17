import React, { useMemo } from "react";
import { PageContainer } from "../../../../components";
import useGetRefubrishSales from "../../../../hooks/RefubrishOrder/useGetRefubrishSales";
import ItemCard from "../ItemCard";
import { RoutesPath } from "../../../../types/RoutesPath.enum";

export default function RefubrishOrders() {
  const { data } = useGetRefubrishSales();

  function handleClick(id: string) {
    window.location.href = RoutesPath.REFUBRISH_ORDER + id;
  }
  const displayData = useMemo(() => {
    return data.map((val) => (
      <ItemCard
        order={val}
        handleClick={() => handleClick(val.refubrishorder_id)}
      />
    ));
  }, [data]);
  return (
    <PageContainer>
      <div className=" w-1/2 m-auto">
        <h1 className=" font-bold text-lg">Refurbrish Orders</h1>
        <div className=" h-5" />
        {displayData}
      </div>
    </PageContainer>
  );
}
