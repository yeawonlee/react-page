import React from "react";
import {
  Chart,
  Series,
  CommonSeriesSettings,
  Legend,
  Export,
} from "devextreme-react/chart";
import "./Charts.css";
import { dataSource } from "./BarChart_data";

const BarChart = () => {
  return (
    <section>
      <h1>Bar Chart</h1>
      <Chart>
        <CommonSeriesSettings />
        <Series />
        <Series />
        <Series />
        <Legend />
        <Export />
      </Chart>
    </section>
  );
};

export default BarChart;
