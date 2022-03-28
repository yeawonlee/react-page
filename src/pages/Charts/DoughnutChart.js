import React from "react";
import PieChart, {
  Series,
  HoverStyle,
  Legend,
  Label,
  Connector,
} from "devextreme-react/pie-chart";
import "./Charts.css";
import { data } from "./DoughnutChart_data";
import CenterTemplate from "./CenterTemplate";

/**
 * [ Doughnut Chart ]
 * - Custom Label in the Center (https://js.devexpress.com/Demos/WidgetsGallery/Demo/Charts/DoughnutWithCustomLabelInCenter/React/Light/)
 * - Doughnut Selection (https://js.devexpress.com/Demos/WidgetsGallery/Demo/Charts/DoughnutSelection/React/Light/)
*/

const countries = Array.from(new Set(data.map((item) => item.country)));

const DoughnutChart = () => {
  const customizeLabel = (e) => {
    return `${e.argumentText}\n${e.valueText}`;
  };

  const poinClickHandler = (arg) => {
    arg.target.select();
  };

  const pies = countries.map((country) => (
    <PieChart
      id="pie-chart"
      key={country}
      dataSource={data.filter((i) => i.country === country)}
      resolveLabelOverlapping="shift"
      sizeGroup="piesGroup"
      innerRadius={0.65}
      centerRender={CenterTemplate}
      type="doughnut"
      onPointClick={poinClickHandler}
      /*width='800'*/
    >
      
      <Series argumentField="commodity" valueField="total">
        <HoverStyle color="#ffd700" />
        <Label
          visible={true}
          format="fixedPoint"
          customizeText={customizeLabel}
          backgroundColor="none"
        >
          <Connector visible={true}></Connector>
        </Label>
      </Series>
      <Legend
        /*margin={-100}*/
        horizontalAlignment="right"
        verticalAlignment="top"
      ></Legend>
    </PieChart>
  ));

  return (
    <section>
      <h1>Doughnut Chart</h1>
      <div>
        <div className="long-title">
          <h3>Energy Production (GWh, 2016)</h3>
        </div>
        <div className="pies-container">{pies}</div>
      </div>
    </section>
  );
};

export default DoughnutChart;