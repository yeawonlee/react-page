import React from "react";
import PieChart, {
  Series,
  HoverStyle,
  Legend,
  Label,
  Connector,
} from "devextreme-react/pie-chart";
import DoughnutChart from "./DoughnutChart";
import BarChart from "./BarChart";

const ChartTest = () => {

  return (
    <div className="flex-container">
      <DoughnutChart/>
      <BarChart/>
    </div>
  );
};

export default ChartTest;
