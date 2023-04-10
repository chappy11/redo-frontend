import { useMemo } from "react";
import { PageContainer } from "../../../components";
import useGetSalvageOrderByBuyerId from "../../../hooks/salvageOrder/useGetSalvageOrderByBuyerId";
import ItemCard from "./components/ItemCard";

export default function ShopSalvageTransactions() {
  const { data: transactions } = useGetSalvageOrderByBuyerId();

  const displayTransactions = useMemo(() => {
    return transactions.map((val, i) => (
      <ItemCard
        pic1={val.item.pic1}
        amount={val.order_totalAmount}
        status={val.salvageorder_status}
        ref_id={val.ref_id}
        id={val.salvageorder_id}
        name={val.seller}
        noItems={val.no_items}
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
