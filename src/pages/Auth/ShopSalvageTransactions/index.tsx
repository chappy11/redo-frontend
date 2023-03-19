import { useMemo } from "react";
import { PageContainer } from "../../../components";
import useGetSalvageOrderByBuyerId from "../../../hooks/salvageOrder/useGetSalvageOrderByBuyerId";
import ItemCard from "./components/ItemCard";

export default function ShopSalvageTransactions() {
  const { data: transactions } = useGetSalvageOrderByBuyerId();

  const displayTransactions = useMemo(() => {
    return transactions.map((val, i) => (
      <ItemCard
        pic1={val.pic1}
        name={val.deviceName}
        ref_id={val.ref_id}
        brand={val.deviceBrand}
        amount={val.salvage_amount}
        status={val.salvageorder_status}
        id={val.salvageorder_id}
      />
    ));
  }, [transactions]);

  return (
    <PageContainer>
      <div className=" w-3/4 m-auto">
        <h1>Transactions</h1>
        <div className=" h-5" />
        {displayTransactions}
      </div>
    </PageContainer>
  );
}
