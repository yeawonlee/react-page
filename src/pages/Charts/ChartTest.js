import React from "react";
import PieChart, {
  Series,
  HoverStyle,
  Legend,
  Label,
  Connector,
} from "devextreme-react/pie-chart";
import DoughnutChart from "./DoughnutChart";
import DiscreteDataChart from "./DiscreteDataChart";
import BarChart from "./BarChart";
import SplineChart from "./SplineChart";
import "./Charts.css";

const ChartTest = () => {
  return (
    <>
      <h1>Charts</h1>
      <div className="flex-container">
        <DoughnutChart />
        <DiscreteDataChart />
        <BarChart />
        <SplineChart />
      </div>
    </>
  );
};

export default ChartTest;
