import React, { Fragment, useState } from "react";
import "./Charts.css";
import {
    Chart,
    Series,
    ArgumentAxis,
    CommonSeriesSettings,
    CommonAxisSettings,
    Grid,
    Export,
    Legend,
    Margin,
    Tooltip,
    Label,
    Format,
} from 'devextreme-react/chart';
import { architectureSources, sharingStatisticsInfo } from './SplineChart_data';

/**
 * [ Line Chart ] > Spline (https://js.devexpress.com/Demos/WidgetsGallery/Demo/Charts/Spline/React/Light/)
 */

const SplineChart = () => {

  const [type, setType] = useState('spline');

  return (
    <section>
      <h1>Spline Chart</h1>
      <Fragment>
        <Chart
          palette="Violet"
          dataSource={sharingStatisticsInfo}
          title="Architecture Share Over Time (Count)"
        >
          <CommonSeriesSettings
            argumentField="year"
            type={type}
          />
          <CommonAxisSettings>
            <Grid visible={true}/>
          </CommonAxisSettings>
          {
            architectureSources.map((item) => <Series
              key={item.value}
              valueField={item.value}
              name={item.name}/>)
          }
          <Margin bottom={20}/>
          <ArgumentAxis
            allowDecimals={false}
            axisDivisionFactor={60}>
            <Label>
              <Format type="decimal"/>
            </Label>
          </ArgumentAxis>
          <Legend 
            verticalAlignment="top"
            horizontalAlignment="right"
          />
          <Export enabled={true}/>
          <Tooltip enable={true}/>
        </Chart>
      </Fragment>
    </section>
  );
};

export default SplineChart;