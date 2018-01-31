import React from "react";

export default class DailyWeather extends React.Component {

    render() {
        const d = this.props;

        
        return (
            <div id="day-1" class="day-slider-card">
                <span class="day-name">{d.day}</span>
                <img class="day-weather-icon" src={d.iconURL} />
                <span class="day-temp">{d.tempC}</span>
                <span class="day-weat" title={d.weatherDescription}>{d.weatherTitle}</span>
            </div>
        );

    }
}