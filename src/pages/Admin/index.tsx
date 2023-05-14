import React, { useMemo } from "react";

import {  ChartOptions } from 'chart.js';
import { Bar as BarChart } from 'react-chartjs-2';

import Card from "./components/Card";
import Container from "./components/Container";
import useGetAllUser from "../../hooks/user/useGetAllUser";
import { getMonth } from "../../utils/date.util";


const options: ChartOptions<'bar'> = {
  scales: {
    y: {
      ticks: {
        stepSize: 1,
      },
    },
  },
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

const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export default function Admin() {
  const { data: user } = useGetAllUser();

  const dataSet = useMemo(() => {
    let arr: any = [];

    labels.forEach((element, i) => {
      const getDataPerMonth = user.filter(
        (val, idx) => getMonth(val.dateCreated) == i
      );

      arr.push(getDataPerMonth.length);
    });

    return {
      labels,
      datasets: [
        {
          label: "Register User Per Month",
          data: arr,
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
      ],
    };
  }, [user]);
  console.log(dataSet);
  return (
    <div>
      <Container>
        <div className=" m-auto w-3/4 mt-16">
          <h1 className=" text-2xl font-bold text-primary">Dashboard</h1>
          <div className=" h-5" />
          <Card>
            <p>Dasboard</p>
            <BarChart  options={options} data={dataSet} />;
          </Card>
        </div>
      </Container>
    </div>
  );
}
