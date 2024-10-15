import React from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip
} from "chart.js";

import './styles/BarChart.css'

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement,Legend,Tooltip);

function BarChart(props) {

    const { searchedMovie } = props;

    const generateRandomLabels = (count) => {
        const labels = [];
        for (let i = 0; i < count; i++) {
            const randomValue = Math.floor(Math.random() * 10) + 1; // Generate random value from 1 to 10
            labels.push(randomValue);
        }
        labels.push(searchedMovie.vote_average);
        return labels;

      };
      
      // Number of labels to generate
      const labelCount = 4;
      
      // Generate random labels
      const randomLabels = generateRandomLabels(labelCount);
      console.log(randomLabels)
      console.log([...randomLabels,searchedMovie.vote_average])
      

  const data = {
    labels: ["2019", "2020", "2021" ,"2022","2023"], // X-axis labels
    datasets: [
      {
        label: searchedMovie.title, // Legend label
        data:randomLabels, // Y-axis values
        backgroundColor: "white",
        pointBorderColor: "aqua",
        borderColor: "white",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    plugins: {
      legend: true,
    },
    scales: {
      y: {
        min: 0,
        max: 10,
        title:{
            display:true,
            text: "Rating"
        }
      },
      x:{
        title:{
            display:true,
            text:"Year"
        }
      }
    },
  };

  return (
    <div className="grpahContainer">
      <h3> Graph Plot </h3>
        
      <div className="lineGraph">
        {/* BAR GRAPH
          <Bar data={data} /> */}
        <Line data={data} options={options}></Line>
      </div>
    </div>
  );
}
export default BarChart;
