import React, { useMemo } from 'react'
import Container from '../components/Container'
import useGetAllSuccessRefurbrishOrder from '../../../hooks/useGetAllSuccessRefurbrishOrder';
import {  ChartOptions } from 'chart.js';
import { Bar as BarChart } from 'react-chartjs-2';
import { MONTHS } from '../../../constant/months';
import { getMonth } from '../../../utils/date.util';
import Card from '../components/Card';
import Table from '../../../components/Table';
import { convertMoney } from '../../../utils/money.utils';


const options: ChartOptions<'bar'> = {
  // scales: {
  //   y: {
  //     ticks: {
  //       stepSize: 1,
  //     },
  //   },
  // },
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Refurbish Success Transaction Per Month",
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
            let total = 0;
            getDataPerMonth.forEach((val,x)=>{
              total += parseFloat(val.total_amount);
            })
            arr.push(total);
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

    const total = useMemo(()=>{
      let total = 0;
      transactions.forEach((val,i)=>{
        total+=parseFloat(val.total_amount);
      })

      return convertMoney(total.toString());
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
            <BarChart  options={options} data={dataSet} />;
            <div className=' my-5'/>
            <Table header={header} >{displayData}</Table>
            <p className=' text-end font-bold mt-5'>Total: {total}</p>
            </Card>
        </div>
    </Container>
  )
}
