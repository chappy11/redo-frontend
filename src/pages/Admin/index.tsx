import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

import Card from "./components/Card";
import Container from "./components/Container";

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

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: [21, 12, 23, 324, 435, 234, 234, 23],
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: [21, 12, 23, 324, 435, 234, 234, 23],
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

export default function Admin() {
  return (
    <div>
      <Container>
        <div className=" m-auto w-3/4 mt-16">
          <h1 className=" text-2xl font-bold text-primary">Dashboard</h1>
          <div className=" h-5" />
          <Card>
            <p>Dasboard</p>
            <Bar options={options} data={data} />;
          </Card>
        </div>
      </Container>
    </div>
  );
}
