import React from 'react';
import ChartistGraph from 'react-chartist';

export default class HumidityPieChart extends React.Component {


    render() {
        const currentHumidity=isNaN(this.props.humidityReading)?0:this.props.humidityReading;


        var data ={
            series: [currentHumidity,100-currentHumidity],
        };

        var options= {
            donut: true,
            donutWidth: 10,
            showLabel: false
        };

        var type = 'Pie';


        return (
            <div class="flex-col justify-center align-center">
                <ChartistGraph data={data} options={options} type={type} className="humidity-chart" />
            </div>
        )
    }
}