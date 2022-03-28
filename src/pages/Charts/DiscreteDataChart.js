import React, { Fragment, useState } from "react";
import { SelectBox } from "devextreme-react/select-box";
import {
  PolarChart,
  CommonSeriesSettings,
  Series,
  Margin,
} from "devextreme-react/polar-chart";
import { types, dataSource } from "./DiscreteDataChart_data";

/**
 * [ Polar and Radar Charts ] > Discrete Data (https://js.devexpress.com/Demos/WidgetsGallery/Demo/Charts/DiscreteData/React/Light/)
 */

const DiscreteDataChart = () => {

  const [currentType, setCurrentType] = useState(types[0]);

  const handleChange = (e) => {
      setCurrentType(e.value);
  }

  return (
    <section>
      <h1>Discrete Data Chart</h1>
      <Fragment>
        <div className="long-title-dd-chart">
          <h3>Average temperature in London</h3>
        </div>
        <div>
          <PolarChart 
            id="chart-demo"
            dataSource={dataSource}
        >
            <CommonSeriesSettings type={currentType}/>
            <Series 
                valueField="day"
                name="Day"
                color="#ba4d51"
            />
            <Series
                valueField="night"
                name="Night"
                color="#5f8b95"
            />
            <Margin
                top={50}
                bottom={50}
                left={100}
            />
          </PolarChart>
          <div className="center">
            <div>Series Type</div>&nbsp;&nbsp;
            <SelectBox 
                width={200}
                dataSource={types}
                value={currentType}
                onValueChanged={handleChange}
            />
          </div>
        </div>
      </Fragment>
    </section>
  );
};

export default DiscreteDataChart;
