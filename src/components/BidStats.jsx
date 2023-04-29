import React from "react";
import { Col } from "react-bootstrap";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  Chart,
} from "chart.js";
import { Line } from "react-chartjs-2";

export const BidStats = () => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
  );
  Chart.defaults.color = "white";

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Bid Conversion",
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
  ];

  const data = {
    labels,
    datasets: [
      {
        fill: false,
        label: "17%",
        data: labels.map(() => Math.random().toFixed(2)),
        borderColor: "#2359FD",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <Col>
      <div id="earningChart" className="shadow w-100">
        <Line options={options} data={data} />
      </div>
    </Col>
  );
};
