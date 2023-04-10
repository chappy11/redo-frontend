import { useMemo } from "react";
import { PageContainer } from "../../../components";
import useGetOrdersForSellers from "../../../hooks/salvageOrder/useGetOrdersForSeller";
import ItemCard from "./components/ItemCard";

export default function UserSellingOrder() {
  const { data, sendRequest } = useGetOrdersForSellers();

  const displayData = useMemo(() => {
    return data.map((val, i) => (
      <ItemCard
        id={val.salvageorder_id}
        pic1={val.pic1}
        name={val.fullname}
        ref_id={val.ref_id}
        brand={val.deviceBrand}
        amount={val.order_totalAmount}
        status={val.salvageorder_status}
      />
    ));
  }, [data]);

  return (
    <PageContainer>
      <div className=" w-3/4 m-auto">
        <h1>Orders</h1>
        <div className=" h-5" />
        {displayData}
      </div>
    </PageContainer>
  );
}
