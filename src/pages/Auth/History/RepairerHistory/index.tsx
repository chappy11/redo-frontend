import React, { useMemo } from "react";
import { PageContainer, Tabular } from "../../../../components";
import useGetAllSuccessTransaction from "../../../../hooks/RefubrishOrder/useGetAllSuccessTransaction";
import ItemCard from "../../RefubrishOrder/ItemCard";
import { RoutesPath } from "../../../../types/RoutesPath.enum";
import { convertMoney } from "../../../../utils/money.utils";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { MONTHS } from "../../../../constant/months";
import { getMonth } from "../../../../utils/date.util";
import { Bar } from "react-chartjs-2";
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



  return (
    <PageContainer>
      <div className=" mx-5 md:w-1/2 lg:w-1/2 md:m-auto lg:m-auto">
        
        <div className=" bg-primary p-4 shadow-lg flex">
          <div className=" flex-1">
            <h1 className=" text-white font-bold">History</h1>
          </div>
          <h1 className=" text-white font-bold">
            Total Amount: {convertMoney(getTotal)}
          </h1>
        </div>
        <div className=" bg-white shadow-lg my-5 p-4">
        <Bar options={options} data={dataSet} className=" w-full" />
        </div>
        <div className=" bg-white shadow-lg my-5 p-4">
        <Tabular 
              keys={['ref_id','seller','total_amount','date']}
              header={['Ref No','Fullname','Amount','Date','Action']} 
              data={data}
              onClick={(id)=>handleClick(id)}
              id={'refubrishorder_id'}
            />
            <p className=" text-right font-bold">Total Amount: {convertMoney(getTotal)}</p>
        </div>
      </div>
    </PageContainer>
  );
}
