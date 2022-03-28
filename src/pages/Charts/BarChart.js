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

/**
 * [ Bar Chart ] > Auto-Calculated Bar Width (https://js.devexpress.com/Demos/WidgetsGallery/Demo/Charts/AutoCalculatedBarWidth/React/Light/)
 */

const BarChart = () => {
  return (
    <section>
      <h1>Bar Chart</h1>
      <Chart
        id="chart"
        palette="Soft"
        title="Percent of Total EnergyProduction"
        dataSource={dataSource}
      >
        <CommonSeriesSettings
            argumentField="state"
            type="bar"
            ignoreEmptyPoints={true}
        />
        <Series valueField="oil" name="Oil Production"/>
        <Series valueField="gas" name="Gas Production"/>
        <Series valueField="coal" name="Coal Production"/>
        <Legend verticalAlignment="bottom" horizontalAlignment="center"/>
        <Export enabled={true}/>
      </Chart>
    </section>
  );
};

export default BarChart;
