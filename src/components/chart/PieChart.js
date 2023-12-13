import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";

import { Pie } from "react-chartjs-2";
import { Box } from "@mui/material";
Chart.register(CategoryScale);
const PieChart = ({ share, total, labelShare, labelTotal }) => {
  const style = {
    height: "200px !important",
    width: "200px  !important",
  };
  const data = {
    labels: [labelShare, labelTotal],
    datasets: [
      {
        label: "Time logged",
        data: [share, total],
        backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
        hoverOffset: 4,
        borderWidth: 2,
      },
    ],
  };
  return (
    <Box sx={style}>
      <Pie data={data} style={style} />
    </Box>
  );
};

export default PieChart;
