import { useCallback, useEffect, useMemo, useState } from "react";
import { PageContainer } from "../../../components";
import useGetFromStorage from "../../../hooks/useGetFromStorage";
import { sellingTransactions } from "../../../service/SellingTransaction";
import ItemCard from "./ItemCard";

export default function TransactionHistory() {
  const [data, setdata] = useState<any[]>([]);
  const { data: user } = useGetFromStorage();

  const getData = useCallback(async () => {
    try {
      if (!user) {
        return;
      }
      const resp = await sellingTransactions(user?.user_id);

      setdata(resp.data.data);
    } catch (error) {
      console.log(error);
    }
  }, [user]);

  useEffect(() => {
    getData();
  }, [user]);

  const displayTransactions = useMemo(() => {
    return data.map((val, i) => <ItemCard order={val} />);
  }, [data]);

  return (
    <PageContainer>
      <div className=" m-auto w-1/3">
        <h1>Transaction History</h1>
        <div className=" mt-10" />
        {displayTransactions}
      </div>
    </PageContainer>
  );
}
