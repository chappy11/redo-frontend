import React, { useMemo } from "react";
import { PageContainer } from "../../../../components";
import useGetAllSuccessTransactions from "../../../../hooks/salvageOrder/useGetAllSuccessTransactions";
import ItemCard from "../../UserSellingOrder/components/ItemCard";
import { convertMoney } from "../../../../utils/money.utils";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    elements,
  } from "chart.js";
import { MONTHS } from "../../../../constant/months";
import { getMonth } from "../../../../utils/date.util";


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
};
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

  console.log(data);

  const dataSet = useMemo(()=>{
    let arr: any[]  =[];

    MONTHS.forEach((elements,i)=>{
        const getDataPerMonth = data.filter((val,idx)=>getMonth(val.r_order_data) == i);

        arr.push(getDataPerMonth.length);
    })

    return {
        labels:MONTHS,
        datasets: [
            {
              label: "Success Salvage Item Order Per Month",
              data: arr,
              backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
          ],
    }
},[data])

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
        <div className=" bg-white shadow-lg my-5 p-4">
        <Bar options={options} data={dataSet} />
        </div>
        
        {display}
      </div>
    </PageContainer>
  );
}
