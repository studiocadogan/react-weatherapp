import React from "react";

import HumidityPieChart from "./HumidityPieChart";

export default class TodayHumidity extends React.Component {

    render() {

        const p=this.props;
        return (
            <div id="humidity" class="flex-col justify-around align-center">
                <span>Humidity</span>
                <HumidityPieChart humidityReading={p.humidityReading} />
                <span class="reading">{p.humidityReading}%</span>
            </div>
        );
    }
}