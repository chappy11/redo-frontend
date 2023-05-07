import React, { useMemo } from 'react'
import Container from '../components/Container'
import useGetAllSuccessRefurbrishOrder from '../../../hooks/useGetAllSuccessRefurbrishOrder';
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
import { MONTHS } from '../../../constant/months';
import { getMonth } from '../../../utils/date.util';
import Card from '../components/Card';
import Table from '../../../components/Table';

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
  
  const header = ['REF_ID','Buyer','Seller','Total','Courier','Date'];
export default function RefurbrishReport() {
    const {data:transactions} = useGetAllSuccessRefurbrishOrder();

    const dataSet = useMemo(()=>{
        let arr: any[]  =[];

        MONTHS.forEach((elements,i)=>{
            const getDataPerMonth = transactions.filter((val,idx)=>getMonth(val.r_order_data) == i);

            arr.push(getDataPerMonth.length);
        })

        return {
            labels:MONTHS,
            datasets: [
                {
                  label: "Success Refurbrish Order Per Month",
                  data: arr,
                  backgroundColor: "rgba(255, 99, 132, 0.5)",
                },
              ],
        }
    },[transactions])

    const displayData = useMemo(()=>{
        return transactions.map((val,i)=>(
            <tr className=" border-b border-b-slate-400 text-primary">
            <td className=" py-5 text-secondary">{val.ref_id}</td>
            <td className=" text-secondary">{val.r_recievername}</td>
            <td className=" capitalize text-secondary">{val.fullname}</td>
            <td className=" capitalize text-secondary">{val.total_amount}</td>
            <td className=" capitalize text-secondary">{val.courier}</td>
            <td className=" capitalize text-secondary">{val.r_order_date}</td>         
          </tr>
        ))
    },[transactions])

    return (
    <Container>
        <div className=' m-auto w-3/4 mb-20'>
            <div className=' h-10'/>
            <Card>
            <h1>Refurbrish Success Transactions</h1>
            <Bar options={options} data={dataSet} />
            <div className=' my-5'/>
            <Table header={header} >{displayData}</Table>
            </Card>
        </div>
    </Container>
  )
}
